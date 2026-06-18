import { createOverflowSummary, createPrintDocumentSummary, formatJson } from "./formatInspectorValue.js";

function countBlocks(printDocument) {
  return printDocument.pages.reduce((total, page) => total + page.blocks.length, 0);
}

function createSummaryList(job, overflowReport) {
  const list = document.createElement("dl");
  list.className = "inspector-summary-list";

  const rows = [
    ["Job", job.name],
    ["Template", job.manifest.id],
    ["Mode", job.manifest.mode],
    ["Composer", job.manifest.pagination.composer],
    ["Data objects", job.data.length],
    ["Pages", job.printDocument.pages.length],
    ["Blocks", countBlocks(job.printDocument)],
    ["Overflow", overflowReport ? `${overflowReport.overflowingBlockCount}/${overflowReport.totalBlocks}` : "Not measured"],
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

function createCodePanel(title, value) {
  const details = document.createElement("details");
  details.className = "inspector-panel";

  const summary = document.createElement("summary");
  summary.textContent = title;

  const pre = document.createElement("pre");
  const code = document.createElement("code");
  code.textContent = value;
  pre.append(code);

  details.append(summary, pre);
  return details;
}

export function createPrintJobInspector(job, options = {}) {
  const { overflowReport = null } = options;
  const root = document.createElement("section");
  root.className = "print-job-inspector";
  root.setAttribute("aria-label", "Inspector del print job actual");

  const header = document.createElement("header");
  header.className = "inspector-header";

  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = "Inspector";

  const title = document.createElement("h2");
  title.textContent = "Print job actual";

  const note = document.createElement("p");
  note.className = "inspector-note";
  note.textContent = "Vista no editable de la data, plantilla y documento generado.";

  header.append(eyebrow, title, note);

  const panels = document.createElement("div");
  panels.className = "inspector-panels";
  panels.append(
    createCodePanel("Data", formatJson(job.data)),
    createCodePanel("Template HTML", job.templateHtml.trim()),
    createCodePanel("Manifest", formatJson(job.manifest)),
    createCodePanel("Template CSS", job.templateStyles.trim()),
    createCodePanel("PrintDocument summary", formatJson(createPrintDocumentSummary(job.printDocument))),
    createCodePanel("Overflow report", formatJson(createOverflowSummary(overflowReport))),
  );

  root.append(header, createSummaryList(job, overflowReport), panels);
  return root;
}
