import { createInputModeButton } from "./createInputModeButton.js";
import { createTemplateSelectButton } from "./createTemplateSelectButton.js";

function createWorkspaceTopbar({ templateLabel, onPrint }) {
  const topbar = document.createElement("header");
  topbar.className = "user-print-topbar";

  const leftGroup = document.createElement("div");
  leftGroup.className = "topbar-group topbar-group--input";

  const inputLabel = document.createElement("strong");
  inputLabel.className = "workspace-primary-label";
  inputLabel.textContent = "Input";

  leftGroup.append(inputLabel, createInputModeButton("JSON"), createTemplateSelectButton(templateLabel));

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

function createPanel(title, content, modifier) {
  const panel = document.createElement("section");
  panel.className = `user-workspace-panel ${modifier}`;

  const heading = document.createElement("h2");
  heading.className = "panel-title";
  heading.textContent = title;

  panel.append(heading, content);
  return panel;
}

export function createUserPrintWorkspace({ inputView, previewView, templateLabel, onPrint }) {
  const root = document.createElement("section");
  root.className = "user-print-workspace";

  const body = document.createElement("div");
  body.className = "user-print-body";
  body.append(createPanel("Input", inputView, "user-workspace-panel--input"));
  body.append(createPanel("Preview", previewView, "user-workspace-panel--preview"));

  root.append(createWorkspaceTopbar({ templateLabel, onPrint }), body);
  return root;
}
