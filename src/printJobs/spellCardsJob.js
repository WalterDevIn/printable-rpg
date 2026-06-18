import { sampleSpells } from "../data/sampleSpells.js";
import { createPrintDocument } from "../core/print/createPrintDocument.js";
import { spellCardManifest } from "../templates/spellCard/manifest.js";
import { createSpellCardTemplateContext } from "../templates/spellCard/resolveSpellCardTheme.js";
import { spellCardTemplate } from "../templates/spellCard/template.js";
import { spellCardStyles } from "../templates/spellCard/styles.js";

export function createSpellCardsJob() {
  const templateData = sampleSpells.map(createSpellCardTemplateContext);
  const printDocument = createPrintDocument({
    data: templateData,
    manifest: spellCardManifest,
    templateHtml: spellCardTemplate,
    templateStyles: spellCardStyles,
  });

  return {
    id: "spell-cards",
    name: "Spell Cards",
    data: templateData,
    manifest: spellCardManifest,
    templateHtml: spellCardTemplate,
    templateStyles: spellCardStyles,
    printDocument,
  };
}
