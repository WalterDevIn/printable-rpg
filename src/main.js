import { createPrintJobInspector } from "./app/createPrintJobInspector.js";
import { createSpellCardsJob } from "./printJobs/spellCardsJob.js";
import { renderPrintDocument } from "./render/renderPrintDocument.js";

const inspectorTarget = document.querySelector("#printJobInspector");
const previewTarget = document.querySelector("#printPreview");
const printButton = document.querySelector("#printButton");

const spellCardsJob = createSpellCardsJob();

renderPrintDocument(spellCardsJob.printDocument, previewTarget);
inspectorTarget.append(createPrintJobInspector(spellCardsJob));

printButton.addEventListener("click", () => {
  window.print();
});
