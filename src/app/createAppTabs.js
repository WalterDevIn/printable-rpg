function createTabButton(tab) {
  const button = document.createElement("button");
  button.className = "app-tab";
  button.type = "button";
  button.id = `${tab.id}Tab`;
  button.setAttribute("role", "tab");
  button.setAttribute("aria-controls", `${tab.id}Panel`);
  button.textContent = tab.label;
  return button;
}

function setActiveTab(tabs, activeId) {
  tabs.forEach((tab) => {
    const isActive = tab.id === activeId;
    tab.button.classList.toggle("app-tab--active", isActive);
    tab.button.setAttribute("aria-selected", String(isActive));
    tab.panel.hidden = !isActive;
  });
}

export function createAppTabs(tabDefinitions, defaultTabId = "preview") {
  const root = document.createElement("section");
  root.className = "app-tabs-shell";

  const tabList = document.createElement("div");
  tabList.className = "app-tabs";
  tabList.setAttribute("role", "tablist");
  tabList.setAttribute("aria-label", "Vistas del print job");

  const panels = document.createElement("div");
  panels.className = "app-tab-panels";

  const tabs = tabDefinitions.map((definition) => {
    const button = createTabButton(definition);
    const panel = document.createElement("section");
    panel.className = "app-tab-panel";
    panel.id = `${definition.id}Panel`;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", button.id);
    panel.append(definition.content);

    tabList.append(button);
    panels.append(panel);

    return {
      id: definition.id,
      button,
      panel,
    };
  });

  tabs.forEach((tab) => {
    tab.button.addEventListener("click", () => {
      setActiveTab(tabs, tab.id);
    });
  });

  setActiveTab(tabs, defaultTabId);
  root.append(tabList, panels);
  return root;
}
