import { sampleSpells } from "../data/sampleSpells.js";
import { createPrintDocument } from "../core/print/createPrintDocument.js";
import { createSpellCardTemplateContext } from "../templates/spellCard/resolveSpellCardTheme.js";
import { getSpellCardVariant } from "../templates/spellCard/variants.js";

export function createSpellCardsJob({ variantId = "classic" } = {}) {
  const variant = getSpellCardVariant(variantId);
  const templateData = sampleSpells.map(createSpellCardTemplateContext);
  const printDocument = createPrintDocument({
    data: templateData,
    manifest: variant.manifest,
    templateHtml: variant.templateHtml,
    templateStyles: variant.templateStyles,
  });

  return {
    id: "spell-cards",
    name: "Spell Cards",
    variantId: variant.id,
    variantLabel: variant.label,
    data: templateData,
    manifest: variant.manifest,
    templateHtml: variant.templateHtml,
    templateStyles: variant.templateStyles,
    printDocument,
  };
}
