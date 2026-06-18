import { A4_PORTRAIT } from "../layout/pageSizes.js";
import { assertTemplateManifest } from "../template/assertTemplateManifest.js";
import { composePages } from "./composePages.js";
import { createMixedPrintBlocks } from "./createMixedPrintBlocks.js";

function collectVariants(records, resolveVariant) {
  const variantsById = new Map();

  records.forEach((record) => {
    if (!variantsById.has(record.variantId)) {
      const variant = resolveVariant(record.variantId);
      assertTemplateManifest(variant.manifest);
      variantsById.set(record.variantId, variant);
    }
  });

  return Array.from(variantsById.values());
}

function assertCompatibleVariant(baseManifest, variant) {
  const manifest = variant.manifest;
  const sameSize =
    manifest.size.widthMm === baseManifest.size.widthMm && manifest.size.heightMm === baseManifest.size.heightMm;
  const sameComposer = manifest.pagination.composer === baseManifest.pagination.composer;

  if (!sameSize || !sameComposer) {
    throw new Error(`Mixed print variant is incompatible: ${variant.id}`);
  }
}

function combineTemplateStyles(variants) {
  return variants.map((variant) => variant.templateStyles).join("\n");
}

export function createMixedPrintDocument({ records, resolveVariant }) {
  const variants = collectVariants(records, resolveVariant);
  const baseVariant = variants[0];
  const baseManifest = baseVariant.manifest;

  variants.forEach((variant) => assertCompatibleVariant(baseManifest, variant));

  const page = baseManifest.page ?? A4_PORTRAIT;
  const blocks = createMixedPrintBlocks({ records, resolveVariant });
  const pages = composePages(blocks, {
    page,
    composer: baseManifest.pagination.composer,
    marginMm: baseManifest.pagination?.marginMm,
    gapMm: baseManifest.pagination?.gapMm,
  });

  return {
    page,
    templateStyles: combineTemplateStyles(variants),
    variants: variants.map((variant) => ({
      id: variant.id,
      label: variant.label,
      templateId: variant.manifest.id,
    })),
    pages,
  };
}
