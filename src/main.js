import { createDataView } from "./app/createDataView.js";
import { formatJson } from "./app/formatInspectorValue.js";
import { parseSpellJsonInput } from "./app/parseSpellJsonInput.js";
import { createPrintOutputView } from "./app/createPrintOutputView.js";
import { createUserPrintWorkspace } from "./app/createUserPrintWorkspace.js";
import { sampleSpells } from "./data/sampleSpells.js";
import { createSpellCardsJob } from "./printJobs/spellCardsJob.js";
import { measurePrintBlockOverflow } from "./render/measurePrintBlockOverflow.js";
import { renderPrintDocument } from "./render/renderPrintDocument.js";
import { selectableSpellCardVariants } from "./templates/spellCard/variants.js";

const appViewsTarget = document.querySelector("#appViews");
const previewTarget = document.querySelector("#printPreview");

let currentSpells = sampleSpells;
let currentJob = createSpellCardsJob({ spells: currentSpells });

function renderCurrentJob() {
  previewTarget.replaceChildren();
  renderPrintDocument(currentJob.printDocument, previewTarget);
  measurePrintBlockOverflow(previewTarget);
}

function setSpells(spells) {
  currentSpells = spells;
  currentJob = createSpellCardsJob({ spells: currentSpells, variantId: currentJob.variantId });
  renderCurrentJob();
}

function setTemplateVariant(variantId) {
  currentJob = createSpellCardsJob({ spells: currentSpells, variantId });
  renderCurrentJob();
}

function applyJsonInput(rawValue) {
  try {
    const spells = parseSpellJsonInput(rawValue);
    setSpells(spells);
    return { ok: true, message: String(spells.length) + " conjuro(s) aplicados." };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

function resetJsonInput() {
  setSpells(sampleSpells);
  return {
    ok: true,
    message: "Datos de ejemplo restaurados.",
    value: formatJson(sampleSpells),
  };
}

renderCurrentJob();

appViewsTarget.append(
  createUserPrintWorkspace({
    inputView: createDataView({
      initialSpells: sampleSpells,
      onApply: applyJsonInput,
      onReset: resetJsonInput,
    }),
    previewView: createPrintOutputView(previewTarget),
    templateVariants: selectableSpellCardVariants,
    currentVariantId: currentJob.variantId,
    onTemplateChange: setTemplateVariant,
    onPrint: () => window.print(),
  }),
);
