const MM_TO_PX = 3;
const GRID_MM = 5;
const HALF_GRID_MM = GRID_MM / 2;
const PAPER_WIDTH_MM = 210;
const PAPER_HEIGHT_MM = 297;

const blockTypeLabels = {
  centeredText: "Texto centrado",
  commonText: "Texto común",
  dividerLine: "Línea divisoria",
  square: "Cuadrado",
  gridSquare: "Cuadrado con grilla",
};

const templates = {
  centeredText: {
    type: "centeredText",
    name: "Texto centrado",
    width: 80,
    height: 20,
    text: "Título centrado",
    fontSize: 5,
    textColor: "#2d2115",
    gridColor: "#b8aa91",
    borderEnabled: true,
    orientation: "horizontal",
  },
  commonText: {
    type: "commonText",
    name: "Texto común",
    width: 70,
    height: 45,
    text: "Cada línea ocupa 5 mm. El texto se quiebra según el ancho del elemento.",
    fontSize: 3.2,
    textColor: "#2d2115",
    gridColor: "#b8aa91",
    borderEnabled: true,
    orientation: "horizontal",
  },
  dividerLine: {
    type: "dividerLine",
    name: "Línea divisoria",
    width: 70,
    height: 0.5,
    text: "",
    fontSize: 3,
    textColor: "#2d2115",
    gridColor: "#b8aa91",
    borderEnabled: false,
    orientation: "horizontal",
  },
  square: {
    type: "square",
    name: "Cuadrado",
    width: 35,
    height: 35,
    text: "",
    fontSize: 3.2,
    textColor: "#2d2115",
    gridColor: "#b8aa91",
    borderEnabled: true,
    orientation: "horizontal",
  },
  gridSquare: {
    type: "gridSquare",
    name: "Cuadrado con grilla",
    width: 50,
    height: 50,
    text: "",
    fontSize: 3,
    textColor: "#2d2115",
    gridColor: "#9a8d79",
    borderEnabled: true,
    orientation: "horizontal",
  },
};

let blocks = [
  {
    id: crypto.randomUUID(),
    ...templates.centeredText,
    name: "Título de hoja",
    x: 10,
    y: 10,
    width: 90,
    height: 20,
    text: "Oráculo de viaje",
  },
  {
    id: crypto.randomUUID(),
    ...templates.commonText,
    name: "Notas",
    x: 10,
    y: 35,
    width: 80,
    height: 40,
    text: "1. Definí contexto.\n2. Tirada.\n3. Anotá consecuencia.",
  },
];

let selectedBlockId = blocks[0].id;
let zoom = 1;
let dragState = null;
let isPaperGridVisible = true;

const paper = document.querySelector("#paper");
const blockList = document.querySelector("#blockList");
const inspectorForm = document.querySelector("#inspectorForm");
const emptyInspectorMessage = document.querySelector("#emptyInspectorMessage");
const zoomOutput = document.querySelector("#zoomOutput");
const paperGridToggle = document.querySelector("#paperGridToggle");

const inputs = {
  name: document.querySelector("#blockNameInput"),
  x: document.querySelector("#blockXInput"),
  y: document.querySelector("#blockYInput"),
  width: document.querySelector("#blockWidthInput"),
  height: document.querySelector("#blockHeightInput"),
  fontSize: document.querySelector("#fontSizeInput"),
  textColor: document.querySelector("#textColorInput"),
  text: document.querySelector("#blockTextInput"),
  orientation: document.querySelector("#orientationInput"),
  gridColor: document.querySelector("#gridColorInput"),
  borderEnabled: document.querySelector("#borderEnabledInput"),
};

function mmToPx(value) {
  return value * MM_TO_PX;
}

function pxToMm(value) {
  return value / MM_TO_PX;
}

function snapMm(value, unit = GRID_MM) {
  return Math.round(value / unit) * unit;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getSelectedBlock() {
  return blocks.find((block) => block.id === selectedBlockId) ?? null;
}

function getSnapUnit(block) {
  return block.type === "dividerLine" ? HALF_GRID_MM : GRID_MM;
}

function normalizeBlock(block) {
  const snapUnit = getSnapUnit(block);
  const minimumWidth = block.type === "dividerLine" && block.orientation === "vertical" ? 0.5 : GRID_MM;
  const minimumHeight = block.type === "dividerLine" && block.orientation === "horizontal" ? 0.5 : GRID_MM;
  const next = { ...block };

  next.width = clamp(snapMm(Number(next.width) || minimumWidth, snapUnit), minimumWidth, PAPER_WIDTH_MM);
  next.height = clamp(snapMm(Number(next.height) || minimumHeight, snapUnit), minimumHeight, PAPER_HEIGHT_MM);

  if (next.type === "dividerLine" && next.orientation === "horizontal") {
    next.height = 0.5;
  }

  if (next.type === "dividerLine" && next.orientation === "vertical") {
    next.width = 0.5;
  }

  next.x = clamp(snapMm(Number(next.x) || 0, snapUnit), 0, PAPER_WIDTH_MM - next.width);
  next.y = clamp(snapMm(Number(next.y) || 0, snapUnit), 0, PAPER_HEIGHT_MM - next.height);
  next.fontSize = clamp(Number(next.fontSize) || 3, 1, 20);
  next.textColor = next.textColor || "#2d2115";
  next.gridColor = next.gridColor || "#9a8d79";
  next.borderEnabled = next.borderEnabled !== false;
  next.orientation = next.orientation || "horizontal";
  next.text = next.text ?? "";

  return next;
}

function updateBlock(id, patch) {
  blocks = blocks.map((block) => {
    if (block.id !== id) return block;
    return normalizeBlock({ ...block, ...patch });
  });

  render();
}

function createBlock(templateName) {
  const template = templates[templateName] ?? templates.commonText;
  const offset = blocks.length * GRID_MM;
  const block = normalizeBlock({
    id: crypto.randomUUID(),
    ...template,
    x: clamp(10 + offset, 0, PAPER_WIDTH_MM - template.width),
    y: clamp(10 + offset, 0, PAPER_HEIGHT_MM - template.height),
  });

  blocks = [...blocks, block];
  selectedBlockId = block.id;
  render();
}

function selectBlock(id) {
  selectedBlockId = id;
  render();
}

function deleteSelectedBlock() {
  if (!selectedBlockId) return;
  blocks = blocks.filter((block) => block.id !== selectedBlockId);
  selectedBlockId = blocks.at(-1)?.id ?? null;
  render();
}

function duplicateSelectedBlock() {
  const block = getSelectedBlock();
  if (!block) return;

  const copy = normalizeBlock({
    ...block,
    id: crypto.randomUUID(),
    name: `${block.name} copia`,
    x: clamp(block.x + GRID_MM, 0, PAPER_WIDTH_MM - block.width),
    y: clamp(block.y + GRID_MM, 0, PAPER_HEIGHT_MM - block.height),
  });

  blocks = [...blocks, copy];
  selectedBlockId = copy.id;
  render();
}

function renderBlockList() {
  blockList.innerHTML = "";

  blocks.forEach((block) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = block.id === selectedBlockId ? "is-selected" : "";
    button.innerHTML = `<span>▸ ${block.name}</span><small>${blockTypeLabels[block.type]} · ${block.width}×${block.height} mm</small>`;
    button.addEventListener("click", () => selectBlock(block.id));
    item.append(button);
    blockList.append(item);
  });
}

function renderPaper() {
  paper.innerHTML = "";
  paper.style.transform = `scale(${zoom})`;
  paper.classList.toggle("paper-grid-hidden", !isPaperGridVisible);

  blocks.forEach((block) => {
    const element = document.createElement("article");
    element.className = `block block-${block.type}${block.id === selectedBlockId ? " is-selected" : ""}`;
    element.style.left = `${mmToPx(block.x)}px`;
    element.style.top = `${mmToPx(block.y)}px`;
    element.style.width = `${mmToPx(block.width)}px`;
    element.style.height = `${mmToPx(block.height)}px`;
    element.style.color = block.textColor;
    element.style.setProperty("--text-color", block.textColor);
    element.style.setProperty("--grid-color", block.gridColor);
    element.dataset.blockId = block.id;

    if (!block.borderEnabled) {
      element.classList.add("no-border");
    }

    const header = document.createElement("div");
    header.className = "block-header";
    header.textContent = block.name;
    header.addEventListener("pointerdown", (event) => startDrag(event, block.id));

    const content = document.createElement("div");
    content.className = "block-content";
    content.textContent = block.text;
    content.style.fontSize = `${mmToPx(block.fontSize)}px`;

    const resizeHandle = document.createElement("div");
    resizeHandle.className = "resize-handle";
    resizeHandle.addEventListener("pointerdown", (event) => startResize(event, block.id));

    element.addEventListener("pointerdown", () => selectBlock(block.id));
    element.append(header, content, resizeHandle);
    paper.append(element);
  });
}

function renderInspector() {
  const block = getSelectedBlock();

  if (!block) {
    inspectorForm.classList.remove("is-visible");
    emptyInspectorMessage.style.display = "block";
    return;
  }

  inspectorForm.classList.add("is-visible");
  emptyInspectorMessage.style.display = "none";
  inputs.name.value = block.name;
  inputs.x.value = block.x;
  inputs.y.value = block.y;
  inputs.width.value = block.width;
  inputs.height.value = block.height;
  inputs.fontSize.value = block.fontSize;
  inputs.textColor.value = block.textColor;
  inputs.text.value = block.text;
  inputs.orientation.value = block.orientation;
  inputs.gridColor.value = block.gridColor;
  inputs.borderEnabled.value = String(block.borderEnabled);

  inputs.text.closest("label").hidden = block.type === "dividerLine" || block.type === "gridSquare";
  inputs.orientation.closest("label").hidden = block.type !== "dividerLine";
  inputs.gridColor.closest("label").hidden = block.type !== "gridSquare";
  inputs.borderEnabled.closest("label").hidden = block.type !== "gridSquare" && block.type !== "square";
  inputs.fontSize.closest("label").hidden = block.type === "dividerLine" || block.type === "gridSquare";
  inputs.textColor.closest("label").hidden = block.type === "gridSquare";
}

function renderZoom() {
  zoomOutput.value = `${Math.round(zoom * 100)}%`;
}

function render() {
  renderBlockList();
  renderPaper();
  renderInspector();
  renderZoom();
}

function getPaperPoint(event) {
  const rect = paper.getBoundingClientRect();
  return {
    x: pxToMm((event.clientX - rect.left) / zoom),
    y: pxToMm((event.clientY - rect.top) / zoom),
  };
}

function startDrag(event, blockId) {
  event.preventDefault();
  event.stopPropagation();

  const block = blocks.find((candidate) => candidate.id === blockId);
  if (!block) return;

  const point = getPaperPoint(event);
  dragState = {
    type: "move",
    blockId,
    pointerId: event.pointerId,
    offsetX: point.x - block.x,
    offsetY: point.y - block.y,
  };

  event.currentTarget.setPointerCapture(event.pointerId);
}

function startResize(event, blockId) {
  event.preventDefault();
  event.stopPropagation();

  dragState = {
    type: "resize",
    blockId,
    pointerId: event.pointerId,
  };

  event.currentTarget.setPointerCapture(event.pointerId);
}

function updateDrag(event) {
  if (!dragState) return;

  const block = blocks.find((candidate) => candidate.id === dragState.blockId);
  if (!block) return;

  const point = getPaperPoint(event);

  if (dragState.type === "move") {
    updateBlock(block.id, {
      x: point.x - dragState.offsetX,
      y: point.y - dragState.offsetY,
    });
    return;
  }

  updateBlock(block.id, {
    width: point.x - block.x,
    height: point.y - block.y,
  });
}

function stopDrag() {
  dragState = null;
}

function setZoom(nextZoom) {
  zoom = clamp(nextZoom, 0.5, 1.5);
  render();
}

function parseInputValue(key, value) {
  if (key === "name" || key === "text" || key === "textColor" || key === "gridColor" || key === "orientation") {
    return value;
  }

  if (key === "borderEnabled") {
    return value === "true";
  }

  return Number(value);
}

function bindEvents() {
  document.querySelectorAll("[data-template]").forEach((button) => {
    button.addEventListener("click", () => createBlock(button.dataset.template));
  });

  Object.entries(inputs).forEach(([key, input]) => {
    input.addEventListener("input", () => {
      const block = getSelectedBlock();
      if (!block) return;

      updateBlock(block.id, {
        [key]: parseInputValue(key, input.value),
      });
    });
  });

  document.querySelector("#deleteBlockButton").addEventListener("click", deleteSelectedBlock);
  document.querySelector("#duplicateBlockButton").addEventListener("click", duplicateSelectedBlock);
  document.querySelector("#clearSheetButton").addEventListener("click", () => {
    blocks = [];
    selectedBlockId = null;
    render();
  });

  paperGridToggle.addEventListener("change", () => {
    isPaperGridVisible = paperGridToggle.checked;
    render();
  });

  document.querySelector("#zoomOutButton").addEventListener("click", () => setZoom(zoom - 0.1));
  document.querySelector("#zoomInButton").addEventListener("click", () => setZoom(zoom + 0.1));
  document.querySelector("#resetZoomButton").addEventListener("click", () => setZoom(1));

  window.addEventListener("pointermove", updateDrag);
  window.addEventListener("pointerup", stopDrag);
  window.addEventListener("pointercancel", stopDrag);
}

bindEvents();
render();
