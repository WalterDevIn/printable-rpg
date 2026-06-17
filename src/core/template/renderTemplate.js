import { resolvePath } from "./resolvePath.js";

const TEMPLATE_VARIABLE_PATTERN = /{{\s*([\w.]+)\s*}}/g;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function renderTemplate(templateHtml, data) {
  return templateHtml.replace(TEMPLATE_VARIABLE_PATTERN, (_, path) => {
    const value = resolvePath(data, path);
    return escapeHtml(value);
  });
}
