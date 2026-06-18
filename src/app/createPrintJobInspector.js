import { createPreviewInfoView } from "./createPreviewInfoView.js";

export function createPrintJobInspector(job, options = {}) {
  return createPreviewInfoView(job, options);
}
