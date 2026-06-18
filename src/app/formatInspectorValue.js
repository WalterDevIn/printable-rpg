export function formatJson(value) {
  return JSON.stringify(value, null, 2);
}

export function createPrintDocumentSummary(printDocument) {
  const pages = printDocument.pages.map((page) => ({
    number: page.number,
    blockCount: page.blocks.length,
    blocks: page.blocks.map((block) => ({
      id: block.id,
      templateId: block.templateId,
      variantId: block.variantId,
      blockRole: block.role,
      widthMm: block.widthMm,
      heightMm: block.heightMm,
      xMm: block.xMm,
      yMm: block.yMm,
    })),
  }));

  return {
    page: printDocument.page,
    variants: printDocument.variants ?? [],
    pageCount: printDocument.pages.length,
    blockCount: printDocument.pages.reduce((total, page) => total + page.blocks.length, 0),
    pages,
  };
}

export function createOverflowSummary(overflowReport) {
  if (!overflowReport) {
    return {
      measured: false,
    };
  }

  return {
    measured: true,
    totalBlocks: overflowReport.totalBlocks,
    overflowingBlockCount: overflowReport.overflowingBlockCount,
    hasOverflow: overflowReport.hasOverflow,
    overflowingBlocks: overflowReport.overflowingBlocks.map((block) => ({
      pageNumber: block.pageNumber,
      blockId: block.blockId,
      templateId: block.templateId,
      verticalOverflowPx: block.verticalOverflowPx,
      horizontalOverflowPx: block.horizontalOverflowPx,
    })),
  };
}

export function createOverflowPolicySummary(overflowPolicyReport) {
  if (!overflowPolicyReport) {
    return {
      evaluated: false,
    };
  }

  return {
    evaluated: true,
    strategy: overflowPolicyReport.strategy,
    status: overflowPolicyReport.status,
    message: overflowPolicyReport.message,
    measured: overflowPolicyReport.measured,
    totalBlocks: overflowPolicyReport.totalBlocks,
    overflowingBlockCount: overflowPolicyReport.overflowingBlockCount,
    hasOverflow: overflowPolicyReport.hasOverflow,
    overflowingBlocks: overflowPolicyReport.overflowingBlocks,
  };
}

export function createFlowRegionsSummary(flowRegionsReport) {
  if (!flowRegionsReport) {
    return {
      evaluated: false,
    };
  }

  return {
    evaluated: true,
    templateFamily: flowRegionsReport.templateFamily,
    estimated: flowRegionsReport.estimated,
    usesDomMeasurement: flowRegionsReport.usesDomMeasurement,
    regions: flowRegionsReport.regions,
    summary: flowRegionsReport.summary,
    records: flowRegionsReport.records,
  };
}

function countValues(records, key) {
  const counts = {};

  records.forEach((record) => {
    const value = record[key] ?? "unknown";
    counts[value] = (counts[value] ?? 0) + 1;
  });

  return counts;
}

export function createPrintRecordsSummary(records = []) {
  return {
    totalRecords: records.length,
    variantCounts: countValues(records, "variantId"),
    recordRoleCounts: countValues(records, "role"),
    records: records.map((record) => ({
      id: record.id,
      sourceIndex: record.sourceIndex,
      recordRole: record.role,
      variantId: record.variantId,
      partIndex: record.partIndex,
      totalParts: record.totalParts,
      name: record.data?.name,
      descriptionLength: String(record.data?.description ?? "").length,
    })),
  };
}
