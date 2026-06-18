import { formatJson } from "./formatInspectorValue.js";

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

function createTemplateSummary(job) {
  const list = document.createElement("dl");
  list.className = "view-summary-list";

  const rows = [
    ["Variant", job.variantId ?? "default"],
    ["Label", job.variantLabel ?? job.name],
    ["Template", job.manifest.id],
    ["Mode", job.manifest.mode],
    ["Composer", job.manifest.pagination.composer],
    ["Overflow strategy", job.manifest.overflow?.strategy ?? "none"],
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

export function createTemplateView(job) {
  const root = document.createElement("div");
  root.className = "template-view";

  const header = document.createElement("header");
  header.className = "view-header";

  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = "Template";

  const title = document.createElement("h2");
  title.textContent = "Plantilla activa";

  const note = document.createElement("p");
  note.className = "view-note";
  note.textContent = "Vista no editable del manifest, HTML y CSS usados para generar la preview.";

  header.append(eyebrow, title, note);
  root.append(
    header,
    createTemplateSummary(job),
    createCodePanel("Manifest", formatJson(job.manifest)),
    createCodePanel("Template HTML", job.templateHtml.trim()),
    createCodePanel("Template CSS", job.templateStyles.trim()),
  );

  return root;
}
