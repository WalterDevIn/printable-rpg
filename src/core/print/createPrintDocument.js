import { assertTemplateManifest } from "../template/assertTemplateManifest.js";
import { A4_PORTRAIT } from "../layout/pageSizes.js";
import { createPrintBlocks } from "./createPrintBlocks.js";
import { composePages } from "./composePages.js";

export function createPrintDocument({ data, manifest, templateHtml, templateStyles }) {
  assertTemplateManifest(manifest);

  const page = manifest.page ?? A4_PORTRAIT;
  const blocks = createPrintBlocks({ data, manifest, templateHtml });
  const pages = composePages(blocks, {
    page,
    composer: manifest.pagination.composer,
    marginMm: manifest.pagination?.marginMm,
    gapMm: manifest.pagination?.gapMm,
  });

  return {
    page,
    templateStyles,
    pages,
  };
}
