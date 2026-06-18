export function createInputModeButton(currentMode = "JSON") {
  const button = document.createElement("button");
  button.className = "mode-button compact-action";
  button.type = "button";
  button.disabled = true;
  button.title = "Input mode selection is planned for a later phase.";
  button.textContent = `${currentMode} ▾`;
  return button;
}
