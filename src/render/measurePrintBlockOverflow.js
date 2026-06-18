function getOverflowMetrics(element) {
  const verticalOverflowPx = Math.max(0, element.scrollHeight - element.clientHeight);
  const horizontalOverflowPx = Math.max(0, element.scrollWidth - element.clientWidth);

  return {
    verticalOverflowPx,
    horizontalOverflowPx,
    hasOverflow: verticalOverflowPx > 0 || horizontalOverflowPx > 0,
  };
}

function measureBlockElement(blockElement) {
  const contentElement = blockElement.firstElementChild ?? blockElement;
  const blockMetrics = getOverflowMetrics(blockElement);
  const contentMetrics = getOverflowMetrics(contentElement);
  const verticalOverflowPx = Math.max(blockMetrics.verticalOverflowPx, contentMetrics.verticalOverflowPx);
  const horizontalOverflowPx = Math.max(blockMetrics.horizontalOverflowPx, contentMetrics.horizontalOverflowPx);
  const hasOverflow = verticalOverflowPx > 0 || horizontalOverflowPx > 0;

  blockElement.dataset.overflow = String(hasOverflow);
  blockElement.classList.toggle("print-block--overflow", hasOverflow);

  return {
    blockId: blockElement.dataset.blockId,
    templateId: blockElement.dataset.templateId,
    pageNumber: Number(blockElement.dataset.pageNumber),
    hasOverflow,
    verticalOverflowPx,
    horizontalOverflowPx,
  };
}

export function measurePrintBlockOverflow(previewTarget) {
  const blocks = Array.from(previewTarget.querySelectorAll(".print-block"));
  const blockReports = blocks.map(measureBlockElement);
  const overflowingBlocks = blockReports.filter((block) => block.hasOverflow);

  return {
    totalBlocks: blockReports.length,
    overflowingBlockCount: overflowingBlocks.length,
    hasOverflow: overflowingBlocks.length > 0,
    overflowingBlocks,
    blocks: blockReports,
  };
}
