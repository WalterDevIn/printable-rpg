function createButton(label, className) {
  const button = document.createElement("button");
  button.className = `input-action ${className}`;
  button.type = "button";
  button.textContent = label;
  return button;
}

export function createJsonInputView(options) {
  const { initialValue, onApply, onReset } = options;
  const root = document.createElement("div");
  root.className = "json-input-view";

  const textarea = document.createElement("textarea");
  textarea.className = "json-input-editor";
  textarea.value = initialValue;
  textarea.setAttribute("aria-label", "JSON de conjuros");

  const actions = document.createElement("div");
  actions.className = "json-input-actions";

  const applyButton = createButton("Aplicar datos", "input-action--primary");
  const resetButton = createButton("Restaurar ejemplo", "input-action--secondary");

  const status = document.createElement("p");
  status.className = "json-input-status";
  status.textContent = "Listo.";
  status.dataset.state = "ok";

  function setStatus(result) {
    status.textContent = result.message;
    status.dataset.state = result.ok ? "ok" : "error";
  }

  applyButton.addEventListener("click", () => {
    setStatus(onApply(textarea.value));
  });

  resetButton.addEventListener("click", () => {
    const result = onReset();
    textarea.value = result.value;
    setStatus(result);
  });

  actions.append(applyButton, resetButton);
  root.append(textarea, actions, status);
  return root;
}
