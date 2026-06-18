# Printable RPG

Printable RPG is a frontend-first tool for generating printable tabletop RPG material from structured data and reusable physical templates.

The current pipeline is:

```text
DataPack -> Template -> PrintBlock -> PageComposer -> PrintDocument -> Browser Print
```

## Current app

The current app is a minimal print-preview implementation for spell cards.

It renders sample spell data through a reusable card template, creates fixed-size physical PrintBlocks, arranges them into A4 pages, and supports browser printing.

The app is frontend-only: HTML, CSS, and JavaScript ESM.

It has no build step and no dependencies.

Open `index.html` in the browser.

## Current implemented slice

Implemented tasks:

```text
foundation/template-print-pipeline-v1
foundation/print-core-boundaries-v1
```

Current behavior:

- loads sample spell objects from `src/data/sampleSpells.js`;
- renders each spell with a template using placeholder variables;
- validates the template manifest before creating print blocks;
- creates fixed-size spell-card PrintBlocks from template manifest dimensions;
- arranges cards automatically into A4 pages with the explicit `grid-pack` composer;
- creates additional A4 pages when needed;
- renders a browser preview;
- provides an `Imprimir` button using `window.print()`;
- hides controls in print mode and prints only the pages.

## Main directories

```text
src/data/
  sample content objects

src/core/layout/
  physical page sizes

src/core/template/
  placeholder rendering utilities and template manifest validation

src/core/print/
  print blocks, page composition dispatch, fixed-grid composition, and print document creation

src/templates/
  reusable physical templates

src/printJobs/
  concrete print requests

src/render/
  browser DOM rendering for print documents
```

## Template and print model

The first template is `spellCard`.

Its manifest defines physical card size and A4 pagination rules.

The A4 page size is centralized in `src/core/layout/pageSizes.js`.

The current page composition strategy is explicitly `grid-pack`, implemented by `composeFixedGridPages`. Future composers, such as vertical stack composition, should be added as separate strategies instead of expanding fixed-grid logic.

Cards are not required to follow the internal 5 mm grid. Character sheets, DM stackblocks, NPC blocks, and random tables should use the 5 mm grid internally in later phases.

## Documentation

Read these files before implementation work:

- `PROJECT_VISION.md`
- `ARCHITECTURE.md`
- `TEMPLATE_SPEC.md`
- `PRINT_SPEC.md`
- `ROADMAP.md`
- `PROJECT_STATE.md`
- `TWO_STEP_AI_DEVELOPMENT.md`

## Development method

Use the two-step AI workflow:

1. Scope.
2. Implementation.

Implementation tasks should use explicit contracts with allowed files, forbidden files, non-goals, and acceptance criteria.

See `TWO_STEP_AI_DEVELOPMENT.md`.

## Next likely work

Recommended next phase:

```text
foundation/print-job-inspector-v1
```

Possible objective:

Show the current data, template HTML, manifest, template CSS, page count, block count, and PrintDocument summary without adding editing or input features.

Do not add overflow, character sheets, stackblocks, random tables, backend, or a visual editor until separately scoped.
