export function createTemplateSelectButton(options = {}) {
  const { variants = [], currentVariantId, onChange } = options;
  const select = document.createElement("select");
  select.className = "template-select-button compact-action";
  select.title = "Seleccionar plantilla de carta";

  variants.forEach((variant) => {
    const option = document.createElement("option");
    option.value = variant.id;
    option.textContent = variant.label;
    option.selected = variant.id === currentVariantId;
    select.append(option);
  });

  select.addEventListener("change", () => {
    onChange?.(select.value);
  });

  return select;
}
