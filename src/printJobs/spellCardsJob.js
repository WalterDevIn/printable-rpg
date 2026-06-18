import { sampleSpells } from "../data/sampleSpells.js";
import { createMixedPrintDocument } from "../core/print/createMixedPrintDocument.js";
import { createSpellCardPrintRecords } from "../templates/spellCard/createSpellCardPrintRecords.js";
import { spellCardFlowRegions } from "../templates/spellCard/flowRegions.js";
import { createSpellCardTemplateContext } from "../templates/spellCard/resolveSpellCardTheme.js";
import { getSpellCardVariant } from "../templates/spellCard/variants.js";

export function createSpellCardsJob({ spells = sampleSpells, variantId } = {}) {
  const variant = getSpellCardVariant(variantId);
  const templateData = spells.map(createSpellCardTemplateContext);
  const printRecords = createSpellCardPrintRecords(templateData, spellCardFlowRegions, {
    baseVariantId: variant.id,
    continuationVariantId: variant.continuationVariantId,
  });
  const printDocument = createMixedPrintDocument({
    records: printRecords,
    resolveVariant: getSpellCardVariant,
  });

  return {
    id: "spell-cards",
    name: "Spell Cards",
    variantId: variant.id,
    variantLabel: variant.label,
    data: templateData,
    sourceData: spells,
    printRecords,
    manifest: variant.manifest,
    templateHtml: variant.templateHtml,
    templateStyles: variant.templateStyles,
    printDocument,
  };
}
