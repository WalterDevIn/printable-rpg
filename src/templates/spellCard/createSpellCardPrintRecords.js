function getFlowRegion(flowRegions) {
  return flowRegions.flow[0];
}

function splitTextAtLimit(text, limit) {
  if (text.length <= limit) {
    return [text, ""];
  }

  const slice = text.slice(0, limit + 1);
  const splitIndex = slice.lastIndexOf(" ") > 0 ? slice.lastIndexOf(" ") : limit;
  const head = text.slice(0, splitIndex).trim();
  const tail = text.slice(splitIndex).trim();

  return [head, tail];
}

function splitFlowText(text, headLimit, continuationLimit) {
  const [head, remainingText] = splitTextAtLimit(text, headLimit);
  const continuations = [];
  let remaining = remainingText;

  while (remaining.length > 0) {
    const [part, nextRemaining] = splitTextAtLimit(remaining, continuationLimit);
    continuations.push(part);
    remaining = nextRemaining;
  }

  return [head, ...continuations];
}

function createRecordId(sourceIndex, role, partIndex) {
  return `spell-${sourceIndex + 1}-${role}-${partIndex + 1}`;
}

function createRecord({ sourceIndex, role, variantId, data, partIndex, totalParts }) {
  return {
    id: createRecordId(sourceIndex, role, partIndex),
    sourceIndex,
    role,
    variantId,
    partIndex,
    totalParts,
    data,
  };
}

function createSingleRecord(record, sourceIndex, baseVariantId) {
  return createRecord({
    sourceIndex,
    role: "single",
    variantId: baseVariantId,
    data: record,
    partIndex: 0,
    totalParts: 1,
  });
}

function createFlowRecords(record, sourceIndex, flowRegion, baseVariantId) {
  const originalText = String(record[flowRegion.field] ?? "");
  const parts = splitFlowText(
    originalText,
    flowRegion.estimatedCapacity.head,
    flowRegion.estimatedCapacity.continuation,
  );
  const totalParts = parts.length;

  return parts.map((part, partIndex) => {
    const role = partIndex === 0 ? "head" : "continuation";
    const variantId = partIndex === 0 ? baseVariantId : flowRegion.continuationVariantId;

    return createRecord({
      sourceIndex,
      role,
      variantId,
      data: {
        ...record,
        [flowRegion.field]: part,
      },
      partIndex,
      totalParts,
    });
  });
}

export function createSpellCardPrintRecords(records, flowRegions, options = {}) {
  const { baseVariantId = "classic" } = options;
  const flowRegion = getFlowRegion(flowRegions);

  return records.flatMap((record, sourceIndex) => {
    const fieldValue = String(record[flowRegion.field] ?? "");

    if (fieldValue.length <= flowRegion.estimatedCapacity.head) {
      return [createSingleRecord(record, sourceIndex, baseVariantId)];
    }

    return createFlowRecords(record, sourceIndex, flowRegion, baseVariantId);
  });
}
