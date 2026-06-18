import { renderTemplate } from "../template/renderTemplate.js";

function createBlockFromRecord(record, variant, index) {
  const manifest = variant.manifest;

  return {
    id: record.id ?? `${manifest.id}-${index + 1}`,
    templateId: manifest.id,
    variantId: variant.id,
    family: manifest.family,
    mode: manifest.mode,
    widthMm: manifest.size.widthMm,
    heightMm: manifest.size.heightMm,
    html: renderTemplate(variant.templateHtml, record.data),
    data: record.data,
    sourceIndex: record.sourceIndex,
    role: record.role,
  };
}

export function createMixedPrintBlocks({ records, resolveVariant }) {
  return records.map((record, index) => {
    const variant = resolveVariant(record.variantId);
    return createBlockFromRecord(record, variant, index);
  });
}
