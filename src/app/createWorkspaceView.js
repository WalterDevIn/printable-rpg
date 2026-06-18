function createWorkspaceButton(view) {
  const button = document.createElement("button");
  button.className = "workspace-toggle workspace-toggle--active";
  button.type = "button";
  button.setAttribute("aria-pressed", "true");
  button.textContent = view.label;
  return button;
}

function createWorkspacePanel(view) {
  const panel = document.createElement("section");
  panel.className = "workspace-panel";
  panel.dataset.viewId = view.id;
  panel.setAttribute("aria-label", view.label);
  panel.append(view.content);
  return panel;
}

function setPanelVisible(button, panel, isVisible) {
  button.classList.toggle("workspace-toggle--active", isVisible);
  button.setAttribute("aria-pressed", String(isVisible));
  panel.hidden = !isVisible;
}

export function createWorkspaceView(viewDefinitions) {
  const root = document.createElement("section");
  root.className = "workspace-shell";

  const controls = document.createElement("div");
  controls.className = "workspace-controls";
  controls.setAttribute("aria-label", "Mostrar u ocultar vistas");

  const panels = document.createElement("div");
  panels.className = "workspace-panels";

  viewDefinitions.forEach((view) => {
    const button = createWorkspaceButton(view);
    const panel = createWorkspacePanel(view);

    button.addEventListener("click", () => {
      setPanelVisible(button, panel, panel.hidden);
    });

    controls.append(button);
    panels.append(panel);
  });

  root.append(controls, panels);
  return root;
}
