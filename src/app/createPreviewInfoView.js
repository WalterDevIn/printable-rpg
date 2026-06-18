import { createOverflowSummary, createPrintDocumentSummary, formatJson } from "./formatInspectorValue.js";

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

function createPreviewSummary(job, overflowReport) {
  const list = document.createElement("dl");
  list.className = "view-summary-list";

  const rows = [
    ["Pages", job.printDocument.pages.length],
    ["Blocks", job.printDocument.pages.reduce((total, page) => total + page.blocks.length, 0)],
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

export function createPreviewInfoView(job, options = {}) {
  const { overflowReport = null } = options;
  const root = document.createElement("div");
  root.className = "preview-info-view";

  const header = document.createElement("header");
  header.className = "view-header";

  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = "Preview";

  const title = document.createElement("h2");
  title.textContent = "Previa imprimible";

  const note = document.createElement("p");
  note.className = "view-note";
  note.textContent = "La preview A4 se renderiza debajo. Esta vista resume el documento generado y su diagnóstico de overflow.";

  header.append(eyebrow, title, note);
  root.append(
    header,
    createPreviewSummary(job, overflowReport),
    createCodePanel("PrintDocument summary", formatJson(createPrintDocumentSummary(job.printDocument))),
    createCodePanel("Overflow report", formatJson(createOverflowSummary(overflowReport))),
  );

  return root;
}
