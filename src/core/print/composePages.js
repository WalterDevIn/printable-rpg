import { composeFixedGridPages } from "./composeFixedGridPages.js";

export function composePages(blocks, pagination = {}) {
  const composer = pagination.composer;

  if (composer === "grid-pack") {
    return composeFixedGridPages(blocks, pagination);
  }

  throw new Error(`Unsupported page composer: ${composer}`);
}
