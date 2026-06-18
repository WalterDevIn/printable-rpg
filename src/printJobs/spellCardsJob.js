import { sampleSpells } from "../data/sampleSpells.js";
import { createPrintDocument } from "../core/print/createPrintDocument.js";
import { spellCardManifest } from "../templates/spellCard/manifest.js";
import { spellCardTemplate } from "../templates/spellCard/template.js";
import { spellCardStyles } from "../templates/spellCard/styles.js";

export function createSpellCardsJob() {
  const printDocument = createPrintDocument({
    data: sampleSpells,
    manifest: spellCardManifest,
    templateHtml: spellCardTemplate,
    templateStyles: spellCardStyles,
  });

  return {
    id: "spell-cards",
    name: "Spell Cards",
    data: sampleSpells,
    manifest: spellCardManifest,
    templateHtml: spellCardTemplate,
    templateStyles: spellCardStyles,
    printDocument,
  };
}
