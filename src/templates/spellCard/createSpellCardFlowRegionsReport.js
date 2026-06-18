function getFlowFieldValue(record, field) {
  const value = record?.[field];
  return typeof value === "string" ? value : "";
}

function estimateContinuationCount(length, headCapacity, continuationCapacity) {
  const overflowLength = Math.max(0, length - headCapacity);

  if (overflowLength === 0) {
    return 0;
  }

  return Math.ceil(overflowLength / continuationCapacity);
}

function createRecordReport(record, sourceIndex, flowRegion) {
  const fieldValue = getFlowFieldValue(record, flowRegion.field);
  const estimatedLength = fieldValue.length;
  const headCapacity = flowRegion.estimatedCapacity.head;
  const continuationCapacity = flowRegion.estimatedCapacity.continuation;
  const estimatedContinuationCount = estimateContinuationCount(estimatedLength, headCapacity, continuationCapacity);
  const isCandidate = estimatedContinuationCount > 0;

  return {
    sourceIndex,
    name: record.name ?? `Record ${sourceIndex}`,
    status: isCandidate ? "flow-candidate" : "single",
    reason: isCandidate
      ? `${flowRegion.field} exceeds estimated head capacity.`
      : `${flowRegion.field} fits estimated head capacity.`,
    flowRegionId: flowRegion.id,
    field: flowRegion.field,
    splitBy: flowRegion.splitBy,
    estimatedLength,
    estimatedCapacityUnit: flowRegion.estimatedCapacity.unit,
    headCapacity,
    continuationCapacity,
    continuationVariantId: flowRegion.continuationVariantId,
    estimatedContinuationCount,
    recommendedChain: isCandidate
      ? ["classic", ...Array.from({ length: estimatedContinuationCount }, () => flowRegion.continuationVariantId)]
      : ["classic"],
  };
}

export function createSpellCardFlowRegionsReport(records, flowRegions) {
  const flowRegion = flowRegions.flow[0];
  const recordReports = records.map((record, sourceIndex) => createRecordReport(record, sourceIndex, flowRegion));
  const flowCandidateCount = recordReports.filter((record) => record.status === "flow-candidate").length;

  return {
    templateFamily: flowRegions.templateFamily,
    estimated: true,
    usesDomMeasurement: false,
    regions: {
      fixed: flowRegions.fixed,
      flow: flowRegions.flow,
      tail: flowRegions.tail,
      decoration: flowRegions.decoration,
    },
    summary: {
      totalRecords: recordReports.length,
      singleCount: recordReports.length - flowCandidateCount,
      flowCandidateCount,
    },
    records: recordReports,
  };
}
