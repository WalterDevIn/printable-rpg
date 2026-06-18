import { A4_PORTRAIT } from "../layout/pageSizes.js";

function getGridCapacity({ page, blockWidthMm, blockHeightMm, marginMm, gapMm }) {
  const usableWidthMm = page.widthMm - marginMm * 2;
  const usableHeightMm = page.heightMm - marginMm * 2;

  const columns = Math.max(1, Math.floor((usableWidthMm + gapMm) / (blockWidthMm + gapMm)));
  const rows = Math.max(1, Math.floor((usableHeightMm + gapMm) / (blockHeightMm + gapMm)));

  return {
    columns,
    rows,
    blocksPerPage: columns * rows,
  };
}

export function composeFixedGridPages(blocks, pagination = {}) {
  const page = pagination.page ?? A4_PORTRAIT;
  const marginMm = pagination.marginMm ?? 10;
  const gapMm = pagination.gapMm ?? 5;
  const firstBlock = blocks[0];

  if (!firstBlock) {
    return [];
  }

  const { columns, blocksPerPage } = getGridCapacity({
    page,
    blockWidthMm: firstBlock.widthMm,
    blockHeightMm: firstBlock.heightMm,
    marginMm,
    gapMm,
  });

  return blocks.reduce((pages, block, index) => {
    const pageIndex = Math.floor(index / blocksPerPage);
    const positionInPage = index % blocksPerPage;
    const column = positionInPage % columns;
    const row = Math.floor(positionInPage / columns);

    if (!pages[pageIndex]) {
      pages[pageIndex] = {
        number: pageIndex + 1,
        widthMm: page.widthMm,
        heightMm: page.heightMm,
        blocks: [],
      };
    }

    pages[pageIndex].blocks.push({
      ...block,
      xMm: marginMm + column * (block.widthMm + gapMm),
      yMm: marginMm + row * (block.heightMm + gapMm),
    });

    return pages;
  }, []);
}
