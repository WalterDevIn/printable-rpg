import { createDataView } from "./app/createDataView.js";
import { createDiagnosticsView } from "./app/createDiagnosticsView.js";
import { createPrintOutputView } from "./app/createPrintOutputView.js";
import { createTemplateView } from "./app/createTemplateView.js";
import { createWorkspaceView } from "./app/createWorkspaceView.js";
import { createSpellCardsJob } from "./printJobs/spellCardsJob.js";
import { measurePrintBlockOverflow } from "./render/measurePrintBlockOverflow.js";
import { renderPrintDocument } from "./render/renderPrintDocument.js";

const appViewsTarget = document.querySelector("#appViews");
const previewTarget = document.querySelector("#printPreview");
const printButton = document.querySelector("#printButton");

const spellCardsJob = createSpellCardsJob();

renderPrintDocument(spellCardsJob.printDocument, previewTarget);
const overflowReport = measurePrintBlockOverflow(previewTarget);

appViewsTarget.append(
  createWorkspaceView([
    {
      id: "data",
      label: "Data",
      content: createDataView(spellCardsJob),
    },
    {
      id: "template",
      label: "Template",
      content: createTemplateView(spellCardsJob),
    },
    {
      id: "diagnostics",
      label: "Diagnostics",
      content: createDiagnosticsView(spellCardsJob, { overflowReport }),
    },
    {
      id: "print-output",
      label: "Print Output",
      content: createPrintOutputView(previewTarget),
    },
  ]),
);

printButton.addEventListener("click", () => {
  window.print();
});
