function applyStyles(element, styles) {
  Object.assign(element.style, styles);
}

function createButton(label, variant) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;

  applyStyles(button, {
    border: variant === "primary" ? "1px solid #805119" : "1px solid #4c4032",
    borderRadius: "999px",
    padding: "7px 11px",
    color: "#f4ead8",
    background: variant === "primary" ? "linear-gradient(180deg, #704c20, #4b351b)" : "rgba(36, 31, 26, 0.95)",
    fontSize: "0.86rem",
    lineHeight: "1",
  });

  return button;
}

function setStatus(status, result) {
  status.textContent = result.message;
  status.dataset.state = result.ok ? "ok" : "error";
  status.style.color = result.ok ? "#8fbe79" : "#d95f45";
}

export function createJsonInputView(options) {
  const { initialValue, onApply, onReset } = options;
  const root = document.createElement("div");
  root.className = "json-input-view";

  applyStyles(root, {
    display: "grid",
    gridTemplateRows: "minmax(0, 1fr) auto auto",
    height: "100%",
    minHeight: "0",
    background: "rgba(12, 10, 8, 0.42)",
  });

  const textarea = document.createElement("textarea");
  textarea.className = "json-input-editor";
  textarea.value = initialValue;
  textarea.setAttribute("aria-label", "JSON de conjuros");

  applyStyles(textarea, {
    width: "100%",
    height: "100%",
    minHeight: "0",
    resize: "none",
    padding: "10px",
    overflow: "auto",
    border: "0",
    outline: "none",
    color: "#f9f0df",
    background: "transparent",
    fontFamily: "Courier New, monospace",
    fontSize: "0.78rem",
    lineHeight: "1.45",
  });

  const actions = document.createElement("div");
  actions.className = "json-input-actions";
  applyStyles(actions, {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    padding: "8px",
    borderTop: "1px solid #4c4032",
    background: "rgba(23, 20, 17, 0.72)",
  });

  const applyButton = createButton("Aplicar datos", "primary");
  const resetButton = createButton("Restaurar ejemplo", "secondary");

  const status = document.createElement("p");
  status.className = "json-input-status";
  status.textContent = "Listo.";
  status.dataset.state = "ok";
  applyStyles(status, {
    minHeight: "30px",
    margin: "0",
    padding: "7px 10px",
    borderTop: "1px solid #4c4032",
    color: "#8fbe79",
    fontSize: "0.82rem",
  });

  applyButton.addEventListener("click", () => {
    setStatus(status, onApply(textarea.value));
  });

  resetButton.addEventListener("click", () => {
    const result = onReset();
    textarea.value = result.value;
    setStatus(status, result);
  });

  actions.append(applyButton, resetButton);
  root.append(textarea, actions, status);
  return root;
}
