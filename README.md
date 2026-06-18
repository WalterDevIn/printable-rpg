# Printable RPG

Printable RPG is a frontend-first tool for generating printable tabletop RPG material from structured data and reusable physical templates.

The current pipeline is:

```text
DataPack -> Template -> PrintRecord -> PrintBlock -> PageComposer -> PrintDocument -> Browser Print
```

## Current app

The current app is a minimal read-only workspace implementation for spell cards with four simultaneous views: Data, Template, Diagnostics, and Print Output.

It renders sample spell data through reusable card template variants, creates fixed-size physical PrintBlocks, arranges them into A4 pages, supports browser printing, and exposes the inputs that feed the generated output.

Spell cards receive semantic visual tokens derived from their spell school. The mapping lives inside the `spellCard` template area, not in the generic print core.

Spell cards also support code-selected template variants. The default variant is `classic`; additional fixed-size `compact` and `flow` variants exist for denser and long-text-oriented layout experiments.

Phase 3 is closed. It established the overflow and flow foundation: overflow detection, overflow policy diagnostics, flow regions, PrintRecords, and mixed spell-card PrintDocuments.

Rendered PrintBlocks are measured in the browser for overflow after the preview is rendered. The report is diagnostic only: it does not shrink, split, continue, or otherwise resolve content by measurement.

The declared overflow strategy is evaluated diagnostically against the measured overflow report. This produces an Overflow policy report; it does not block printing or resolve overflow.

Spell-card flow regions are modeled locally and reported diagnostically. Flow candidates generate PrintRecords and a mixed PrintDocument with `classic` head records and `flow` continuation records by data estimate.

Continuation is estimated from source data. It is not DOM-measured and is not layout-perfect.

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
```

Current behavior:

- loads sample spell objects from `src/data/sampleSpells.js`;
- enriches spell-card template data with theme tokens derived from `school`;
- selects a spell-card base variant from code;
- uses `classic` as the default spell-card base variant;
- provides fixed-size `compact` and `flow` spell-card variants;
- creates PrintRecords before creating PrintBlocks;
- single records generate one `classic` PrintRecord;
- flow-candidate records generate a `classic` head PrintRecord and one or more `flow` continuation PrintRecords;
- renders each PrintRecord with its selected variant;
- applies visual tokens through CSS custom properties;
- validates mixed variants before creating the mixed PrintDocument;
- creates fixed-size spell-card PrintBlocks from each record variant manifest;
- arranges cards automatically into A4 pages with the explicit `grid-pack` composer;
- creates additional A4 pages when needed;
- renders a browser print output;
- measures rendered PrintBlocks for visual overflow;
- evaluates the declared overflow strategy against the measured overflow report;
- evaluates spell-card flow regions by data estimate, not DOM measurement;
- separates read-only inspection into Data, Template, Diagnostics, and Print Output views;
- Data shows source data and generated PrintRecords;
- Template shows variant metadata, manifest, template HTML, and template CSS;
- Diagnostics shows PrintDocument summary, PrintRecords report, Overflow report, Overflow policy report, and Flow regions report;
- Print Output contains the real A4 output used for printing;
- provides an `Imprimir` button using `window.print()`;
- hides controls, workspace panels except Print Output, diagnostic UI, and overflow marks in print mode.

## Main directories

```text
src/app/
  read-only workspace views, controls, overflow policy diagnostics, and inspector utilities

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

## Phase 3 closed status

Phase 3 established the overflow and flow architecture for card templates.

Completed in Phase 3:

- browser-side overflow detection;
- diagnostic overflow policy evaluation;
- `fail` and `clip` diagnostic semantics;
- recognized unresolved strategies for `shrink`, `blank-extra`, and `continuation-card`;
- flow-oriented spell-card variant;
- spell-card flow region model;
- `description` as the first flow region;
- flow candidate detection by data estimate;
- PrintRecords as an intermediate representation;
- mixed spell-card PrintDocuments with `classic` head cards and `flow` continuation cards;
- diagnostics for PrintDocument, PrintRecords, Overflow, Overflow policy, and Flow regions;
- read-only four-view workspace.

Not completed in Phase 3:

- DOM-measured fragmentation;
- layout-perfect continuation cards;
- provisional render / measure / split / re-render loops;
- final tail-region placement;
- table row flow;
- shrink policy execution;
- blank-extra generation;
- print blocking from overflow policy.

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

The mixed document builder is generic to records and variant resolution:

```text
src/core/print/createMixedPrintDocument.js
src/core/print/createMixedPrintBlocks.js
```

Spell-card-specific record creation lives in:

```text
src/templates/spellCard/createSpellCardPrintRecords.js
```

For v1, mixed documents assume all participating variants share the same physical size and composer. If a variant differs, mixed document creation throws.

Description splitting is estimated from data only. It does not use DOM measurement and does not split tables or rows.

## Spell-card variants

Spell-card variants live under `src/templates/spellCard/`.

Current variants:

- `classic`: the default fixed spell-card layout;
- `compact`: a fixed-size denser layout using the same data model;
- `flow`: a fixed-size long-text-oriented layout using the same data model and a semantic description flow region.

The local registry is:

```text
src/templates/spellCard/variants.js
```

`createSpellCardsJob()` accepts a `variantId` from code and defaults to `classic`.

The flow variant can still be selected from code with:

```js
createSpellCardsJob({ variantId: "flow" })
```

## Spell-card theme tokens

Spell-card theme tokens live under `src/templates/spellCard/`.

The current token flow is:

```text
spell.school -> resolveSpellCardTheme -> theme tokens -> template placeholders -> CSS custom properties
```

This keeps spell-school logic out of `src/core/`.

## Overflow detection and policy diagnostics

Overflow detection is browser-side and diagnostic.

The current flow is:

```text
render PrintDocument -> measure rendered PrintBlocks -> evaluate manifest overflow strategy -> Diagnostics reports
```

The detector reports total blocks, overflowing blocks, page number, block id, template id, and approximate vertical/horizontal overflow in pixels.

The policy evaluator reads `manifest.overflow.strategy` and produces an Overflow policy report.

Implemented diagnostic strategies:

- `fail`: overflow produces `error`; no overflow produces `ok`;
- `clip`: overflow produces `warning`; no overflow produces `ok`.

Recognized but unresolved strategies:

- `shrink`;
- `blank-extra`;
- `continuation-card`.

Unknown or absent strategies produce an explicit diagnostic status.

Overflow policy diagnostics do not resolve overflow. They do not implement shrink, blank-extra, DOM-measured continuation, automatic flow continuation by measurement, or print blocking.

## Spell-card flow regions

The spell-card template family has a local flow region model:

```text
src/templates/spellCard/flowRegions.js
```

The current model declares:

- fixed regions for title and metadata;
- a flow region for `description`;
- a tail region prepared for `higherLevels`;
- a decoration region for a bottom school mark.

The `description` flow region references `continuationVariantId: "flow"` and uses estimated character capacity for diagnostics and PrintRecord generation.

The Flow regions report identifies records as `single` or `flow-candidate` using data estimation only. It does not use DOM measurement.

## Flow card variant

The `flow` spell-card variant is a template variant, not a flow engine.

It keeps the same physical card size, data model, theme token model, and `grid-pack` pagination as the other spell-card variants.

It declares `overflow.strategy: "fail"` and marks the description area with:

```html
data-flow-region="description"
```

That semantic region supports estimated continuation work, but the variant does not split text by itself.

## Four-view workspace

The app shell is read-only and split into four workspace views:

- Data: source data and generated PrintRecords;
- Template: active variant metadata, manifest, template HTML, and template CSS;
- Diagnostics: PrintDocument summary, PrintRecords report, Overflow report, Overflow policy report, and Flow regions report;
- Print Output: generated A4 pages used by browser print.

The workspace buttons show or hide panels independently, so multiple views can be visible at once. Panels can be resized locally in the browser.

The workspace does not edit data, edit templates, load files, select variants, persist layout, or create duplicate panel instances.

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
foundation/phase-4-direction-scope
```

Possible objective:

Choose whether Phase 4 should focus on DOM-measured fragmentation, another template family, controlled data input, or workspace evolution.

Do not add character sheets, stackblocks, random tables, backend, or a visual editor until separately scoped.
