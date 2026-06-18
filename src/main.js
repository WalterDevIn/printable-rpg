import { createAppTabs } from "./app/createAppTabs.js";
import { createDataView } from "./app/createDataView.js";
import { createPreviewInfoView } from "./app/createPreviewInfoView.js";
import { createTemplateView } from "./app/createTemplateView.js";
import { createSpellCardsJob } from "./printJobs/spellCardsJob.js";
import { measurePrintBlockOverflow } from "./render/measurePrintBlockOverflow.js";
import { renderPrintDocument } from "./render/renderPrintDocument.js";

const appViewsTarget = document.querySelector("#appViews");
const previewInfoTarget = document.createElement("div");
const previewTarget = document.querySelector("#printPreview");
const printButton = document.querySelector("#printButton");

const spellCardsJob = createSpellCardsJob();

renderPrintDocument(spellCardsJob.printDocument, previewTarget);
const overflowReport = measurePrintBlockOverflow(previewTarget);

previewInfoTarget.append(createPreviewInfoView(spellCardsJob, { overflowReport }));

appViewsTarget.append(
  createAppTabs(
    [
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
        id: "preview",
        label: "Preview",
        content: previewInfoTarget,
      },
    ],
    "preview",
  ),
);

printButton.addEventListener("click", () => {
  window.print();
});
