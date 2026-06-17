export const spellCardManifest = {
  id: "spellCard",
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

  page: {
    size: "A4",
    orientation: "portrait",
    widthMm: 210,
    heightMm: 297,
  },

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
