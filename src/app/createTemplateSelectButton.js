export function createTemplateSelectButton(label = "Spell Cards · Classic") {
  const button = document.createElement("button");
  button.className = "template-select-button compact-action";
  button.type = "button";
  button.disabled = true;
  button.title = "Template selection is planned for a later phase.";
  button.textContent = `${label} ▾`;
  return button;
}
