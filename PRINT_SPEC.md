# Print Specification

This document defines how Printable RPG should think about physical output.

The print system is domain-agnostic. It does not know about spells, NPCs, character sheets, or random tables. It only knows about pages, millimeters, blocks, margins, gaps, and placement rules.

## Main output target

The first output target is browser printing.

Default page:

```text
A4 portrait: 210 mm x 297 mm
```

The engine works in millimeters.

CSS print rules should preserve physical size as accurately as the browser allows.

## PrintDocument

A PrintDocument is the abstract result of a PrintJob.

It contains:

- page size;
- page orientation;
- pages;
- positioned print blocks;
- document-level styles;
- template styles used by blocks.

Conceptual shape:

```js
{
  page: {
    size: "A4",
    widthMm: 210,
    heightMm: 297,
    orientation: "portrait",
  },
  pages: [
    {
      number: 1,
      blocks: [
        { id: "block-1", xMm: 10, yMm: 10, widthMm: 100, heightMm: 140 },
      ],
    },
  ],
}
```

## PrintBlock

A PrintBlock is a physical piece to be placed on a page.

It contains:

- rendered HTML;
- template id;
- width in mm;
- height in mm;
- stackability flag;
- keep-together flag;
- optional breakability rules;
- optional continuation metadata.

The PageComposer should only rely on physical metadata, not domain meaning.

## Page composition modes

### grid-pack

Used for same-size repeatable blocks, especially cards.

The composer places as many blocks as possible per A4 page using declared margins and gaps.

Cards are not required to use the internal 5 mm grid.

### vertical-stack

Used for variable-size blocks printed sequentially.

Examples:

- NPC blocks;
- DM stackblocks;
- compact rules references;
- stackable random tables.

The composer places blocks top to bottom and creates a new page when the next block does not fit.

### full-page

Used when a template owns a full page.

Examples:

- random-table sheet;
- full reference page;
- map page.

### multi-page-document

Used when a single data object generates several pages.

Examples:

- character sheet;
- campaign dossier;
- adventure packet.

## Margins and gaps

Margins and gaps are part of a PrintJob or template manifest.

Example:

```js
pagination: {
  marginMm: 5,
  gapMm: 5,
}
```

Cards may use their own physical dimensions and gaps.

5 mm grid families should prefer margins and gaps in 5 mm or 2.5 mm increments.

## Grid policy

The engine never requires all templates to snap to 5 mm.

The 5 mm grid applies internally to these template families:

- character sheets;
- DM stackblocks;
- NPC blocks;
- random tables;
- table-facing reference blocks.

Cards may ignore the grid and keep their existing designs.

## Overflow and measurement

Overflow is a template behavior, not a page-composer behavior.

The first implementation may ignore advanced overflow and use `clip`.

Later implementations may use browser measurement:

- render a block offscreen;
- compare available content area against actual content size;
- decide whether the content fits;
- apply the template's overflow strategy.

Overflow strategies are defined in `TEMPLATE_SPEC.md`.

## Safe breaking

Some blocks may be breakable.

Examples:

- a random table can break between rows;
- a rule explanation can break between paragraphs;
- a list can break between list items.

Some blocks should not break.

Examples:

- compact NPC block;
- small statblock;
- card metadata header;
- title section.

The print engine should respect `keepTogether` where possible.

## Browser rendering

The renderer turns a PrintDocument into DOM.

It should:

- create one `.print-page` per page;
- position blocks using millimeter units;
- inject or reference template styles;
- apply `@media print` rules;
- hide app controls during print;
- preserve page size with `@page`.

## Non-goals for first implementation

The first print foundation should not include:

- PDF export;
- server-side rendering;
- drag-and-drop layout editing;
- sophisticated bin packing;
- perfect text splitting;
- duplex-print support;
- crop marks and bleed unless needed by existing card templates.

## First foundation target

The first useful print slice is:

```text
array of spell objects -> fixed card blocks -> grid-packed A4 pages -> browser print
```

This validates the core pipeline without requiring the whole product.
