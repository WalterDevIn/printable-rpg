import { A4_PORTRAIT } from "../../../core/layout/pageSizes.js";

export const compactSpellCardManifest = {
  id: "spellCardCompact",
  family: "card",
  input: "Spell",
  mode: "repeatable-fixed",

  size: {
    widthMm: 63,
    heightMm: 88,
  },

  layout: {
    unit: "mm",
    gridMm: null,
  },

  page: A4_PORTRAIT,

  pagination: {
    stackable: true,
    composer: "grid-pack",
    allowRotate: false,
    marginMm: 10,
    gapMm: 5,
  },

  overflow: {
    strategy: "clip",
  },
};
