export function createPrintOutputView(previewElement) {
  const root = document.createElement("div");
  root.className = "print-output-view";

  const outputFrame = document.createElement("div");
  outputFrame.className = "print-output-frame";
  outputFrame.append(previewElement);

  root.append(outputFrame);
  return root;
}
