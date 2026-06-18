const IMPLEMENTED_STRATEGIES = new Set(["clip", "fail"]);
const RESERVED_STRATEGIES = new Set(["shrink", "blank-extra", "continuation-card"]);

function normalizeStrategy(strategy) {
  return String(strategy ?? "")
    .trim()
    .toLowerCase();
}

function createBaseReport(strategy, overflowReport) {
  return {
    strategy: strategy || null,
    measured: Boolean(overflowReport),
    totalBlocks: overflowReport?.totalBlocks ?? 0,
    overflowingBlockCount: overflowReport?.overflowingBlockCount ?? 0,
    hasOverflow: Boolean(overflowReport?.hasOverflow),
  };
}

function createBlockRefs(overflowReport) {
  return (overflowReport?.overflowingBlocks ?? []).map((block) => ({
    pageNumber: block.pageNumber,
    blockId: block.blockId,
    templateId: block.templateId,
    verticalOverflowPx: block.verticalOverflowPx,
    horizontalOverflowPx: block.horizontalOverflowPx,
  }));
}

export function evaluateOverflowPolicy(manifest, overflowReport) {
  const strategy = normalizeStrategy(manifest?.overflow?.strategy);
  const baseReport = createBaseReport(strategy, overflowReport);
  const overflowingBlocks = createBlockRefs(overflowReport);

  if (!overflowReport) {
    return {
      ...baseReport,
      status: "unresolved",
      message: "Overflow has not been measured yet.",
      overflowingBlocks,
    };
  }

  if (!strategy) {
    return {
      ...baseReport,
      status: overflowReport.hasOverflow ? "unresolved" : "ok",
      message: overflowReport.hasOverflow
        ? "Overflow was detected, but the manifest does not declare an overflow strategy."
        : "No overflow detected. The manifest does not declare an overflow strategy.",
      overflowingBlocks,
    };
  }

  if (strategy === "fail") {
    return {
      ...baseReport,
      status: overflowReport.hasOverflow ? "error" : "ok",
      message: overflowReport.hasOverflow
        ? `${overflowReport.overflowingBlockCount} block(s) overflow and strategy is fail.`
        : "No overflow detected. Strategy fail is satisfied.",
      overflowingBlocks,
    };
  }

  if (strategy === "clip") {
    return {
      ...baseReport,
      status: overflowReport.hasOverflow ? "warning" : "ok",
      message: overflowReport.hasOverflow
        ? `${overflowReport.overflowingBlockCount} block(s) overflow and strategy is clip. Content may be visually clipped.`
        : "No overflow detected. Strategy clip is satisfied.",
      overflowingBlocks,
    };
  }

  if (RESERVED_STRATEGIES.has(strategy)) {
    return {
      ...baseReport,
      status: overflowReport.hasOverflow ? "unresolved" : "ok",
      message: overflowReport.hasOverflow
        ? `Strategy ${strategy} is recognized but not implemented yet.`
        : `No overflow detected. Reserved strategy ${strategy} does not need resolution.`,
      overflowingBlocks,
    };
  }

  if (!IMPLEMENTED_STRATEGIES.has(strategy)) {
    return {
      ...baseReport,
      status: "unresolved",
      message: `Unknown overflow strategy: ${strategy}.`,
      overflowingBlocks,
    };
  }

  return {
    ...baseReport,
    status: "unresolved",
    message: `Unhandled overflow policy strategy: ${strategy}.`,
    overflowingBlocks,
  };
}
