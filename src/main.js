import { createSpellCardsJob } from "./printJobs/spellCardsJob.js";
import { renderPrintDocument } from "./render/renderPrintDocument.js";

const previewTarget = document.querySelector("#printPreview");
const printButton = document.querySelector("#printButton");

const printDocument = createSpellCardsJob();

renderPrintDocument(printDocument, previewTarget);

printButton.addEventListener("click", () => {
  window.print();
});
