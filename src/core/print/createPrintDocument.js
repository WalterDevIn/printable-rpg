import { createPrintBlocks } from "./createPrintBlocks.js";
import { composePages } from "./composePages.js";

const A4_PORTRAIT = {
  size: "A4",
  orientation: "portrait",
  widthMm: 210,
  heightMm: 297,
};

export function createPrintDocument({ data, manifest, templateHtml, templateStyles }) {
  const blocks = createPrintBlocks({ data, manifest, templateHtml });
  const pages = composePages(blocks, {
    page: manifest.page ?? A4_PORTRAIT,
    marginMm: manifest.pagination?.marginMm,
    gapMm: manifest.pagination?.gapMm,
  });

  return {
    page: manifest.page ?? A4_PORTRAIT,
    templateStyles,
    pages,
  };
}
