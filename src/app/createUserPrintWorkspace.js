import { createInputModeButton } from "./createInputModeButton.js";
import { createTemplateSelectButton } from "./createTemplateSelectButton.js";

const MIN_INPUT_PERCENT = 24;
const MAX_INPUT_PERCENT = 68;
const DEFAULT_INPUT_PERCENT = 38;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createWorkspaceTopbar({ templateVariants, currentVariantId, onTemplateChange, onPrint }) {
  const topbar = document.createElement("header");
  topbar.className = "user-print-topbar";

  const leftGroup = document.createElement("div");
  leftGroup.className = "topbar-group topbar-group--input";

  const inputLabel = document.createElement("strong");
  inputLabel.className = "workspace-primary-label";
  inputLabel.textContent = "Input";

  leftGroup.append(
    inputLabel,
    createInputModeButton("JSON"),
    createTemplateSelectButton({
      variants: templateVariants,
      currentVariantId,
      onChange: onTemplateChange,
    }),
  );

  const rightGroup = document.createElement("div");
  rightGroup.className = "topbar-group topbar-group--preview";

  const previewLabel = document.createElement("strong");
  previewLabel.className = "workspace-primary-label";
  previewLabel.textContent = "Preview";

  const printButton = document.createElement("button");
  printButton.className = "print-button";
  printButton.type = "button";
  printButton.textContent = "Imprimir";
  printButton.addEventListener("click", onPrint);

  rightGroup.append(previewLabel, printButton);
  topbar.append(leftGroup, rightGroup);
  return topbar;
}

function createPanel(content, modifier) {
  const panel = document.createElement("section");
  panel.className = `user-workspace-panel ${modifier}`;
  panel.append(content);
  return panel;
}

function createSplitter(body) {
  const splitter = document.createElement("div");
  splitter.className = "workspace-splitter";
  splitter.setAttribute("role", "separator");
  splitter.setAttribute("aria-label", "Ajustar ancho de Input y Preview");
  splitter.setAttribute("aria-orientation", "vertical");
  splitter.tabIndex = 0;

  let isDragging = false;

  function setInputPercent(clientX) {
    const bounds = body.getBoundingClientRect();
    const rawPercent = ((clientX - bounds.left) / bounds.width) * 100;
    const inputPercent = clamp(rawPercent, MIN_INPUT_PERCENT, MAX_INPUT_PERCENT);
    body.style.setProperty("--input-panel-width", `${inputPercent}%`);
  }

  function stopDragging() {
    isDragging = false;
    document.body.classList.remove("is-resizing-workspace");
  }

  splitter.addEventListener("pointerdown", (event) => {
    isDragging = true;
    splitter.setPointerCapture(event.pointerId);
    document.body.classList.add("is-resizing-workspace");
    setInputPercent(event.clientX);
  });

  splitter.addEventListener("pointermove", (event) => {
    if (!isDragging) {
      return;
    }

    setInputPercent(event.clientX);
  });

  splitter.addEventListener("pointerup", stopDragging);
  splitter.addEventListener("pointercancel", stopDragging);

  splitter.addEventListener("keydown", (event) => {
    const currentValue = Number.parseFloat(body.style.getPropertyValue("--input-panel-width")) || DEFAULT_INPUT_PERCENT;
    const step = event.shiftKey ? 8 : 3;

    if (event.key === "ArrowLeft") {
      body.style.setProperty("--input-panel-width", `${clamp(currentValue - step, MIN_INPUT_PERCENT, MAX_INPUT_PERCENT)}%`);
      event.preventDefault();
    }

    if (event.key === "ArrowRight") {
      body.style.setProperty("--input-panel-width", `${clamp(currentValue + step, MIN_INPUT_PERCENT, MAX_INPUT_PERCENT)}%`);
      event.preventDefault();
    }
  });

  return splitter;
}

export function createUserPrintWorkspace({
  inputView,
  previewView,
  templateVariants,
  currentVariantId,
  onTemplateChange,
  onPrint,
}) {
  const root = document.createElement("section");
  root.className = "user-print-workspace";

  const body = document.createElement("div");
  body.className = "user-print-body";
  body.style.setProperty("--input-panel-width", `${DEFAULT_INPUT_PERCENT}%`);

  body.append(createPanel(inputView, "user-workspace-panel--input"));
  body.append(createSplitter(body));
  body.append(createPanel(previewView, "user-workspace-panel--preview"));

  root.append(
    createWorkspaceTopbar({
      templateVariants,
      currentVariantId,
      onTemplateChange,
      onPrint,
    }),
    body,
  );
  return root;
}
