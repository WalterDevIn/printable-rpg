function createTemplateStyleElement(styles) {
  const style = document.createElement("style");
  style.dataset.templateStyles = "true";
  style.textContent = styles;
  return style;
}

function createBlockElement(block, page) {
  const element = document.createElement("section");
  element.className = "print-block";
  element.dataset.blockId = block.id;
  element.dataset.templateId = block.templateId;
  element.dataset.pageNumber = String(page.number);
  element.style.left = `${block.xMm}mm`;
  element.style.top = `${block.yMm}mm`;
  element.style.width = `${block.widthMm}mm`;
  element.style.height = `${block.heightMm}mm`;
  element.innerHTML = block.html;
  return element;
}

function createPageElement(page) {
  const element = document.createElement("section");
  element.className = "print-page";
  element.dataset.pageNumber = String(page.number);
  element.style.width = `${page.widthMm}mm`;
  element.style.height = `${page.heightMm}mm`;

  page.blocks.forEach((block) => {
    element.append(createBlockElement(block, page));
  });

  return element;
}

export function renderPrintDocument(printDocument, target) {
  target.innerHTML = "";
  document.querySelectorAll("style[data-template-styles]").forEach((style) => style.remove());
  document.head.append(createTemplateStyleElement(printDocument.templateStyles));

  printDocument.pages.forEach((page) => {
    target.append(createPageElement(page));
  });
}
