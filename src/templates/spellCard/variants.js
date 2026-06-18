import { classicSpellCardManifest } from "./classic/manifest.js";
import { classicSpellCardTemplate } from "./classic/template.js";
import { classicSpellCardStyles } from "./classic/styles.js";
import { compactSpellCardManifest } from "./compact/manifest.js";
import { compactSpellCardTemplate } from "./compact/template.js";
import { compactSpellCardStyles } from "./compact/styles.js";

export const DEFAULT_SPELL_CARD_VARIANT_ID = "classic";

export const spellCardVariants = {
  classic: {
    id: "classic",
    label: "Classic spell card",
    manifest: classicSpellCardManifest,
    templateHtml: classicSpellCardTemplate,
    templateStyles: classicSpellCardStyles,
  },
  compact: {
    id: "compact",
    label: "Compact spell card",
    manifest: compactSpellCardManifest,
    templateHtml: compactSpellCardTemplate,
    templateStyles: compactSpellCardStyles,
  },
};

export function getSpellCardVariant(variantId = DEFAULT_SPELL_CARD_VARIANT_ID) {
  const variant = spellCardVariants[variantId];

  if (!variant) {
    throw new Error(`Unknown spell card variant: ${variantId}`);
  }

  return variant;
}
