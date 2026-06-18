export function createPrintOutputView(previewElement) {
  const root = document.createElement("div");
  root.className = "print-output-view";

  const header = document.createElement("header");
  header.className = "view-header";

  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = "Print Output";

  const title = document.createElement("h2");
  title.textContent = "Salida imprimible";

  const note = document.createElement("p");
  note.className = "view-note";
  note.textContent = "Vista real de las páginas A4 que se envían al navegador para impresión.";

  const outputFrame = document.createElement("div");
  outputFrame.className = "print-output-frame";
  outputFrame.append(previewElement);

  header.append(eyebrow, title, note);
  root.append(header, outputFrame);
  return root;
}
