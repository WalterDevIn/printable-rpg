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
      widthMm: block.widthMm,
      heightMm: block.heightMm,
      xMm: block.xMm,
      yMm: block.yMm,
    })),
  }));

  return {
    page: printDocument.page,
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
