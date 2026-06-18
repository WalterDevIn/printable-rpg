import { A4_PORTRAIT } from "../../../core/layout/pageSizes.js";

export const ornateFlowSpellCardManifest = {
  id: "spellCardOrnateFlow",
  family: "card",
  input: "Spell",
  mode: "repeatable-flow",

  size: {
    widthMm: 90,
    heightMm: 140,
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
    strategy: "fail",
  },
};
