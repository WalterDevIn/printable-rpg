import { classicSpellCardManifest } from "./classic/manifest.js";
import { classicSpellCardTemplate } from "./classic/template.js";
import { classicSpellCardStyles } from "./classic/styles.js";
import { compactSpellCardManifest } from "./compact/manifest.js";
import { compactSpellCardTemplate } from "./compact/template.js";
import { compactSpellCardStyles } from "./compact/styles.js";
import { flowSpellCardManifest } from "./flow/manifest.js";
import { flowSpellCardTemplate } from "./flow/template.js";
import { flowSpellCardStyles } from "./flow/styles.js";
import { ornateSpellCardManifest } from "./ornate/manifest.js";
import { ornateSpellCardTemplate } from "./ornate/template.js";
import { ornateSpellCardStyles } from "./ornate/styles.js";
import { ornateFlowSpellCardManifest } from "./ornateFlow/manifest.js";
import { ornateFlowSpellCardTemplate } from "./ornateFlow/template.js";
import { ornateFlowSpellCardStyles } from "./ornateFlow/styles.js";

export const DEFAULT_SPELL_CARD_VARIANT_ID = "ornate";

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
  flow: {
    id: "flow",
    label: "Flow spell card",
    manifest: flowSpellCardManifest,
    templateHtml: flowSpellCardTemplate,
    templateStyles: flowSpellCardStyles,
  },
  ornate: {
    id: "ornate",
    label: "Ornate spell card",
    continuationVariantId: "ornate-flow",
    manifest: ornateSpellCardManifest,
    templateHtml: ornateSpellCardTemplate,
    templateStyles: ornateSpellCardStyles,
  },
  "ornate-flow": {
    id: "ornate-flow",
    label: "Ornate flow spell card",
    manifest: ornateFlowSpellCardManifest,
    templateHtml: ornateFlowSpellCardTemplate,
    templateStyles: `${ornateSpellCardStyles}\n${ornateFlowSpellCardStyles}`,
  },
};

export const selectableSpellCardVariants = [
  spellCardVariants.ornate,
  spellCardVariants.classic,
  spellCardVariants.compact,
  spellCardVariants.flow,
];

export function getSpellCardVariant(variantId = DEFAULT_SPELL_CARD_VARIANT_ID) {
  const variant = spellCardVariants[variantId];

  if (!variant) {
    throw new Error(`Unknown spell card variant: ${variantId}`);
  }

  return variant;
}
