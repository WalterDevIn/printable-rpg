const MM_TO_PX = 3;
const GRID_MM = 5;
const PAPER_WIDTH_MM = 210;
const PAPER_HEIGHT_MM = 297;

const templates = {
  heading: {
    name: "Título",
    width: 80,
    height: 20,
    text: "Título de sección",
  },
  text: {
    name: "Texto",
    width: 70,
    height: 45,
    text: "Bloque de texto.\nEscribí el contenido acá.",
  },
  table: {
    name: "Tabla",
    width: 90,
    height: 60,
    text: "d6  Resultado\n1   ...\n2   ...\n3   ...",
  },
  stat: {
    name: "Stat block",
    width: 80,
    height: 55,
    text: "Nombre\nCA 12 · PG 9\nAtaque: +4, 1d6+2\nRasgo: ...",
  },
};

let blocks = [
  {
    id: crypto.randomUUID(),
    name: "Oráculo",
    x: 10,
    y: 10,
    width: 90,
    height: 50,
    text: "Pregunta cerrada\n1-6 No\n7-12 Quizá\n13-20 Sí",
  },
];

let selectedBlockId = blocks[0].id;
let zoom = 1;
let dragState = null;

const paper = document.querySelector("#paper");
const blockList = document.querySelector("#blockList");
const inspectorForm = document.querySelector("#inspectorForm");
const emptyInspectorMessage = document.querySelector("#emptyInspectorMessage");
const zoomOutput = document.querySelector("#zoomOutput");

const inputs = {
  name: document.querySelector("#blockNameInput"),
  x: document.querySelector("#blockXInput"),
  y: document.querySelector("#blockYInput"),
  width: document.querySelector("#blockWidthInput"),
  height: document.querySelector("#blockHeightInput"),
  text: document.querySelector("#blockTextInput"),
};

function mmToPx(value) {
  return value * MM_TO_PX;
}

function pxToMm(value) {
  return value / MM_TO_PX;
}

function snapMm(value) {
  return Math.round(value / GRID_MM) * GRID_MM;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getSelectedBlock() {
  return blocks.find((block) => block.id === selectedBlockId) ?? null;
}

function updateBlock(id, patch) {
  blocks = blocks.map((block) => {
    if (block.id !== id) return block;

    const next = { ...block, ...patch };
    next.width = clamp(snapMm(Number(next.width) || GRID_MM), GRID_MM, PAPER_WIDTH_MM);
    next.height = clamp(snapMm(Number(next.height) || GRID_MM), GRID_MM, PAPER_HEIGHT_MM);
    next.x = clamp(snapMm(Number(next.x) || 0), 0, PAPER_WIDTH_MM - next.width);
    next.y = clamp(snapMm(Number(next.y) || 0), 0, PAPER_HEIGHT_MM - next.height);
    return next;
  });

  render();
}

function createBlock(templateName) {
  const template = templates[templateName] ?? templates.text;
  const offset = blocks.length * GRID_MM;
  const block = {
    id: crypto.randomUUID(),
    name: template.name,
    x: clamp(10 + offset, 0, PAPER_WIDTH_MM - template.width),
    y: clamp(10 + offset, 0, PAPER_HEIGHT_MM - template.height),
    width: template.width,
    height: template.height,
    text: template.text,
  };

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

  const copy = {
    ...block,
    id: crypto.randomUUID(),
    name: `${block.name} copia`,
    x: clamp(block.x + GRID_MM, 0, PAPER_WIDTH_MM - block.width),
    y: clamp(block.y + GRID_MM, 0, PAPER_HEIGHT_MM - block.height),
  };

  blocks = [...blocks, copy];
  selectedBlockId = copy.id;
  render();
}

function renderBlockList() {
  blockList.innerHTML = "";

  blocks.forEach((block, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = block.id === selectedBlockId ? "is-selected" : "";
    button.innerHTML = `<span>▸ ${block.name}</span><small>${block.width}×${block.height} mm</small>`;
    button.addEventListener("click", () => selectBlock(block.id));
    item.append(button);
    blockList.append(item);
  });
}

function renderPaper() {
  paper.innerHTML = "";
  paper.style.transform = `scale(${zoom})`;

  blocks.forEach((block) => {
    const element = document.createElement("article");
    element.className = `block${block.id === selectedBlockId ? " is-selected" : ""}`;
    element.style.left = `${mmToPx(block.x)}px`;
    element.style.top = `${mmToPx(block.y)}px`;
    element.style.width = `${mmToPx(block.width)}px`;
    element.style.height = `${mmToPx(block.height)}px`;
    element.dataset.blockId = block.id;

    const header = document.createElement("div");
    header.className = "block-header";
    header.textContent = block.name;
    header.addEventListener("pointerdown", (event) => startDrag(event, block.id));

    const content = document.createElement("div");
    content.className = "block-content";
    content.textContent = block.text;

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
  inputs.text.value = block.text;
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

function bindEvents() {
  document.querySelectorAll("[data-template]").forEach((button) => {
    button.addEventListener("click", () => createBlock(button.dataset.template));
  });

  Object.entries(inputs).forEach(([key, input]) => {
    input.addEventListener("input", () => {
      const block = getSelectedBlock();
      if (!block) return;

      updateBlock(block.id, {
        [key]: key === "name" || key === "text" ? input.value : Number(input.value),
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

  document.querySelector("#zoomOutButton").addEventListener("click", () => setZoom(zoom - 0.1));
  document.querySelector("#zoomInButton").addEventListener("click", () => setZoom(zoom + 0.1));
  document.querySelector("#resetZoomButton").addEventListener("click", () => setZoom(1));

  window.addEventListener("pointermove", updateDrag);
  window.addEventListener("pointerup", stopDrag);
  window.addEventListener("pointercancel", stopDrag);
}

bindEvents();
render();
