import { renderTemplate } from "../template/renderTemplate.js";

export function createPrintBlocks({ data, manifest, templateHtml }) {
  return data.map((item, index) => ({
    id: `${manifest.id}-${index + 1}`,
    templateId: manifest.id,
    family: manifest.family,
    mode: manifest.mode,
    widthMm: manifest.size.widthMm,
    heightMm: manifest.size.heightMm,
    html: renderTemplate(templateHtml, item),
    data: item,
  }));
}
