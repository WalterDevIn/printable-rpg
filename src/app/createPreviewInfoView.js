import {
  createFlowRegionsSummary,
  createOverflowPolicySummary,
  createOverflowSummary,
  createPrintDocumentSummary,
  formatJson,
} from "./formatInspectorValue.js";

function createCodePanel(title, value) {
  const section = document.createElement("section");
  section.className = "view-panel";

  const heading = document.createElement("h2");
  heading.textContent = title;

  const pre = document.createElement("pre");
  const code = document.createElement("code");
  code.textContent = value;
  pre.append(code);

  section.append(heading, pre);
  return section;
}

function createPreviewSummary(job, overflowReport, overflowPolicyReport, flowRegionsReport) {
  const list = document.createElement("dl");
  list.className = "view-summary-list";

  const rows = [
    ["Pages", job.printDocument.pages.length],
    ["Blocks", job.printDocument.pages.reduce((total, page) => total + page.blocks.length, 0)],
    ["Overflow", overflowReport ? `${overflowReport.overflowingBlockCount}/${overflowReport.totalBlocks}` : "Not measured"],
    ["Policy", overflowPolicyReport ? overflowPolicyReport.status : "Not evaluated"],
    ["Strategy", overflowPolicyReport?.strategy ?? "none"],
    ["Region candidates", flowRegionsReport ? flowRegionsReport.summary.flowCandidateCount : "Not evaluated"],
    ["Page", `${job.printDocument.page.size} ${job.printDocument.page.orientation} · ${job.printDocument.page.widthMm}×${job.printDocument.page.heightMm} mm`],
    ["Block size", `${job.manifest.size.widthMm}×${job.manifest.size.heightMm} mm`],
  ];

  rows.forEach(([label, value]) => {
    const wrapper = document.createElement("div");
    const term = document.createElement("dt");
    const description = document.createElement("dd");

    term.textContent = label;
    description.textContent = value;

    wrapper.append(term, description);
    list.append(wrapper);
  });

  return list;
}

export function createPreviewInfoView(job, options = {}) {
  const { overflowReport = null, overflowPolicyReport = null, flowRegionsReport = null } = options;
  const root = document.createElement("div");
  root.className = "preview-info-view";

  const header = document.createElement("header");
  header.className = "view-header";

  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = "Diagnostics";

  const title = document.createElement("h2");
  title.textContent = "Diagnóstico imprimible";

  const note = document.createElement("p");
  note.className = "view-note";
  note.textContent = "Resumen no editable del documento generado, overflow medido, política declarada y regiones.";

  header.append(eyebrow, title, note);
  root.append(
    header,
    createPreviewSummary(job, overflowReport, overflowPolicyReport, flowRegionsReport),
    createCodePanel("PrintDocument summary", formatJson(createPrintDocumentSummary(job.printDocument))),
    createCodePanel("Overflow report", formatJson(createOverflowSummary(overflowReport))),
    createCodePanel("Overflow policy report", formatJson(createOverflowPolicySummary(overflowPolicyReport))),
    createCodePanel("Flow regions report", formatJson(createFlowRegionsSummary(flowRegionsReport))),
  );

  return root;
}
