# Printable RPG

Printable RPG is a frontend-first tool for generating printable tabletop RPG material from structured data and reusable physical templates.

The current pipeline is:

```text
DataPack -> Template -> PrintRecord -> PrintBlock -> PageComposer -> PrintDocument -> Browser Print
```

## Current app

The current app is a minimal user print workspace for spell cards.

The main user-facing flow is:

```text
Input -> Preview -> Print
```

The template is selected, then stays out of the user's main workspace. Template code, manifest, CSS, and technical diagnostics are not shown in the primary user flow.

The compact top bar contains:

- an Input label;
- a disabled input-mode selector placeholder, currently `JSON`;
- a disabled template selector placeholder, currently the active spell-card template;
- a Preview label;
- an `Imprimir` button.

The main screen has two zones:

- Input: editable JSON array for spell data;
- Preview: generated A4 print output.

The Input panel allows the user to edit or paste JSON, apply it to regenerate the preview, and restore the example data.

It renders spell data through reusable card template variants, creates fixed-size physical PrintBlocks, arranges them into A4 pages, supports browser printing, and exposes the printable result without requiring the user to inspect template internals.

Phase 3.5 introduced explicit JSON input for the current spell-card template family. It does not implement other input modes, template selection behavior, persistence, file loading, natural-language parsing, image input, or Template Studio.

The app is frontend-only: HTML, CSS, and JavaScript ESM.

It has no build step and no dependencies.

Open `index.html` in the browser.

## Current implemented slice

Implemented tasks:

```text
foundation/template-print-pipeline-v1
foundation/print-core-boundaries-v1
foundation/print-job-inspector-v1
foundation/card-template-tokens-v1
foundation/card-template-variants-v1
foundation/card-overflow-detection-v1
foundation/flow-card-template-v1
foundation/three-view-app-shell-v1
foundation/four-view-resizable-workspace-v1
foundation/card-overflow-policy-v1
foundation/template-flow-regions-v1
foundation/mixed-card-print-document-v1
foundation/phase-3-closeout-v1
foundation/user-print-workspace-redesign-v1
foundation/explicit-data-input-v1
```

Current behavior:

- loads example spell objects from `src/data/sampleSpells.js`;
- shows those objects as editable JSON in the Input panel;
- validates pasted JSON before regenerating the preview;
- keeps the previous preview when JSON parsing or validation fails;
- restores example data on demand;
- enriches spell-card template data with theme tokens derived from `school`;
- selects a spell-card base variant from code;
- creates PrintRecords before creating PrintBlocks;
- renders each PrintRecord with its selected variant;
- creates mixed spell-card PrintDocuments when estimated data length requires continuation;
- arranges cards automatically into A4 pages with the explicit `grid-pack` composer;
- renders a browser print output;
- measures rendered PrintBlocks for visual overflow;
- keeps overflow measurement diagnostic-only;
- shows a compact user-facing Input/Preview workspace;
- Preview contains the real A4 output used for printing;
- provides an `Imprimir` button using `window.print()`;
- hides input controls and non-print UI in print mode.

## JSON input contract

The current input mode expects an array of spell objects:

```json
[
  {
    "name": "Fire Bolt",
    "level": "Cantrip",
    "school": "Evocation",
    "castingTime": "1 action",
    "range": "120 feet",
    "components": "V, S",
    "duration": "Instantaneous",
    "description": "You hurl a mote of fire..."
  }
]
```

Required fields:

- `name`
- `level`
- `school`
- `castingTime`
- `range`
- `components`
- `duration`
- `description`

The current validator requires a non-empty array. Each item must be an object and must contain all required fields with non-empty values.

## Main directories

```text
src/app/
  user print workspace, JSON input view, input validation, input/preview views, selector placeholders, and technical utilities

src/data/
  sample content objects

src/core/layout/
  physical page sizes

src/core/template/
  placeholder rendering utilities and template manifest validation

src/core/print/
  print blocks, mixed print blocks, page composition dispatch, fixed-grid composition, and print document creation

src/templates/
  reusable physical templates, local variants, template-specific theme logic, spell-card flow region model, and spell-card PrintRecord creation

src/printJobs/
  concrete print requests and traceable job objects

src/render/
  browser DOM rendering and rendered overflow measurement for print documents
```

## User workspace direction

The main user workspace is not a template editor.

The user should:

```text
choose input mode -> choose template -> provide data -> preview output -> print
```

The template should be selected, not inspected, during normal printing.

Template editing belongs in a future Template Studio, not in the main print workflow.

Current selector buttons are non-functional placeholders:

- `JSON` input mode;
- current spell-card template selector.

They prepare the UI for later input modes and template selection without implementing those features yet.

## Template and print model

The first template family is `spellCard`.

Its variants define physical card size and A4 pagination rules.

The A4 page size is centralized in `src/core/layout/pageSizes.js`.

The current page composition strategy is explicitly `grid-pack`, implemented by `composeFixedGridPages`. Future composers, such as vertical stack composition, should be added as separate strategies instead of expanding fixed-grid logic.

Cards are not required to follow the internal 5 mm grid. Character sheets, DM stackblocks, NPC blocks, and random tables should use the 5 mm grid internally in later phases.

## Mixed spell-card documents

Spell cards use PrintRecords as an intermediate step:

```text
data -> spell-card PrintRecords -> mixed PrintBlocks -> PrintDocument
```

Description splitting is estimated from data only. It does not use DOM measurement and does not split tables or rows.

## Overflow detection and policy diagnostics

Overflow detection is browser-side and diagnostic.

The current flow is:

```text
render PrintDocument -> measure rendered PrintBlocks -> evaluate manifest overflow strategy
```

Overflow policy diagnostics do not resolve overflow. They do not implement shrink, blank-extra, DOM-measured continuation, automatic flow continuation by measurement, or print blocking.

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

Recommended next step:

```text
foundation/input-validation-reporting-v1
```

Possible objective:

Improve validation messages and add a compact structured input status without exposing template internals.

Do not add character sheets, stackblocks, random tables, backend, or a visual template editor until separately scoped.
