import { createDataView } from "./app/createDataView.js";
import { createPrintOutputView } from "./app/createPrintOutputView.js";
import { createUserPrintWorkspace } from "./app/createUserPrintWorkspace.js";
import { createSpellCardsJob } from "./printJobs/spellCardsJob.js";
import { measurePrintBlockOverflow } from "./render/measurePrintBlockOverflow.js";
import { renderPrintDocument } from "./render/renderPrintDocument.js";

const appViewsTarget = document.querySelector("#appViews");
const previewTarget = document.querySelector("#printPreview");

const spellCardsJob = createSpellCardsJob();

renderPrintDocument(spellCardsJob.printDocument, previewTarget);
measurePrintBlockOverflow(previewTarget);

appViewsTarget.append(
  createUserPrintWorkspace({
    inputView: createDataView(spellCardsJob),
    previewView: createPrintOutputView(previewTarget),
    templateLabel: `${spellCardsJob.name} · ${spellCardsJob.variantLabel}`,
    onPrint: () => window.print(),
  }),
);
