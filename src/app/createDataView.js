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

export function createDataView(job) {
  const root = document.createElement("div");
  root.className = "data-view";

  const header = document.createElement("header");
  header.className = "view-header";

  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = "Data";

  const title = document.createElement("h2");
  title.textContent = "DataPack actual";

  const note = document.createElement("p");
  note.className = "view-note";
  note.textContent = "Vista no editable de la data enriquecida que alimenta el print job.";

  header.append(eyebrow, title, note);
  root.append(header, createCodePanel("Data", formatJson(job.data)));
  return root;
}
