import { formatJson } from "./formatInspectorValue.js";

function createCodePanel(title, value) {
  const section = document.createElement("section");
  section.className = "input-data-panel";

  const heading = document.createElement("h3");
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
  root.className = "data-view input-view";

  const note = document.createElement("p");
  note.className = "view-note";
  note.textContent = "Vista temporal no editable. En la siguiente fase este panel recibirá datos del usuario.";

  root.append(note, createCodePanel("Current JSON input", formatJson(job.data)));
  return root;
}
