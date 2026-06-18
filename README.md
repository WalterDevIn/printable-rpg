# Printable RPG

Printable RPG is a frontend-first tool for generating printable tabletop RPG material from structured data and reusable physical templates.

The current pipeline is:

```text
DataPack -> Template -> PrintBlock -> PageComposer -> PrintDocument -> Browser Print
```

## Current app

The current app is a minimal print-preview implementation for spell cards with a non-editable print job inspector.

It renders sample spell data through a reusable card template variant, creates fixed-size physical PrintBlocks, arranges them into A4 pages, supports browser printing, and exposes the inputs that feed the generated preview.

Spell cards receive semantic visual tokens derived from their spell school. The mapping lives inside the `spellCard` template area, not in the generic print core.

Spell cards also support code-selected template variants. The default variant is `classic`; additional fixed-size `compact` and `flow` variants exist for denser and long-text-oriented layout experiments.

Rendered PrintBlocks are measured in the browser for overflow after the preview is rendered. The report is diagnostic only: it does not shrink, split, continue, or otherwise resolve content.

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
```

Current behavior:

- loads sample spell objects from `src/data/sampleSpells.js`;
- enriches spell-card template data with theme tokens derived from `school`;
- selects a spell-card template variant from code;
- uses `classic` as the default spell-card variant;
- provides fixed-size `compact` and `flow` spell-card variants;
- renders each spell with a template using placeholder variables;
- applies visual tokens through CSS custom properties;
- validates the template manifest before creating print blocks;
- creates fixed-size spell-card PrintBlocks from template manifest dimensions;
- arranges cards automatically into A4 pages with the explicit `grid-pack` composer;
- creates additional A4 pages when needed;
- renders a browser preview;
- measures rendered PrintBlocks for visual overflow;
- shows a non-editable inspector for the current print job;
- shows data, template HTML, manifest, template CSS, PrintDocument summary, and Overflow report;
- provides an `Imprimir` button using `window.print()`;
- hides controls, inspector, and diagnostic overflow marks in print mode.

## Main directories

```text
src/app/
  application-level inspector utilities

src/data/
  sample content objects

src/core/layout/
  physical page sizes

src/core/template/
  placeholder rendering utilities and template manifest validation

src/core/print/
  print blocks, page composition dispatch, fixed-grid composition, and print document creation

src/templates/
  reusable physical templates, local variants, and template-specific theme logic

src/printJobs/
  concrete print requests and traceable job objects

src/render/
  browser DOM rendering and rendered overflow measurement for print documents
```

## Template and print model

The first template family is `spellCard`.

Its variants define physical card size and A4 pagination rules.

The A4 page size is centralized in `src/core/layout/pageSizes.js`.

The current page composition strategy is explicitly `grid-pack`, implemented by `composeFixedGridPages`. Future composers, such as vertical stack composition, should be added as separate strategies instead of expanding fixed-grid logic.

Cards are not required to follow the internal 5 mm grid. Character sheets, DM stackblocks, NPC blocks, and random tables should use the 5 mm grid internally in later phases.

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

The flow variant can be selected from code with:

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

## Overflow detection

Overflow detection is browser-side and diagnostic.

The current flow is:

```text
render PrintDocument -> measure rendered PrintBlocks -> inspector Overflow report
```

The detector reports total blocks, overflowing blocks, page number, block id, template id, and approximate vertical/horizontal overflow in pixels.

It does not resolve overflow. It does not implement shrink, blank-extra, continuation-card, or automatic flow continuation.

## Flow card variant

The `flow` spell-card variant is a template variant, not a flow engine.

It keeps the same physical card size, data model, theme token model, and `grid-pack` pagination as the other spell-card variants.

It declares `overflow.strategy: "fail"` and marks the description area with:

```html
data-flow-region="description"
```

That semantic region is for future overflow policy and continuation work. It does not split text or create additional cards by itself.

## Inspector model

The inspector is read-only.

It shows what feeds the current preview:

- DataPack;
- template HTML;
- template manifest;
- template CSS;
- PrintDocument summary;
- Overflow report.

It does not allow editing, file loading, persistence, import/export, or template authoring.

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
foundation/card-overflow-policy-scope
```

Possible objective:

Scope how declared overflow strategies such as `fail`, `clip`, `shrink`, `blank-extra`, and `continuation-card` should behave before implementing automatic resolution.

Do not add character sheets, stackblocks, random tables, backend, or a visual editor until separately scoped.
