# Printable RPG

Printable RPG is a frontend-first tool for generating printable tabletop RPG material from structured data and reusable physical templates.

The current pipeline is:

```text
DataPack -> Template -> PrintBlock -> PageComposer -> PrintDocument -> Browser Print
```

## Current app

The current app is a minimal print-preview implementation for spell cards with a non-editable print job inspector.

It renders sample spell data through a reusable card template, creates fixed-size physical PrintBlocks, arranges them into A4 pages, supports browser printing, and exposes the inputs that feed the generated preview.

Spell cards now receive semantic visual tokens derived from their spell school. The mapping lives inside the `spellCard` template area, not in the generic print core.

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
```

Current behavior:

- loads sample spell objects from `src/data/sampleSpells.js`;
- enriches spell-card template data with theme tokens derived from `school`;
- renders each spell with a template using placeholder variables;
- applies visual tokens through CSS custom properties;
- validates the template manifest before creating print blocks;
- creates fixed-size spell-card PrintBlocks from template manifest dimensions;
- arranges cards automatically into A4 pages with the explicit `grid-pack` composer;
- creates additional A4 pages when needed;
- renders a browser preview;
- shows a non-editable inspector for the current print job;
- shows data, template HTML, manifest, template CSS, and PrintDocument summary;
- provides an `Imprimir` button using `window.print()`;
- hides controls and inspector in print mode and prints only the pages.

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
  reusable physical templates and template-specific theme logic

src/printJobs/
  concrete print requests and traceable job objects

src/render/
  browser DOM rendering for print documents
```

## Template and print model

The first template is `spellCard`.

Its manifest defines physical card size and A4 pagination rules.

The A4 page size is centralized in `src/core/layout/pageSizes.js`.

The current page composition strategy is explicitly `grid-pack`, implemented by `composeFixedGridPages`. Future composers, such as vertical stack composition, should be added as separate strategies instead of expanding fixed-grid logic.

Cards are not required to follow the internal 5 mm grid. Character sheets, DM stackblocks, NPC blocks, and random tables should use the 5 mm grid internally in later phases.

## Spell-card theme tokens

Spell-card theme tokens live under `src/templates/spellCard/`.

The current token flow is:

```text
spell.school -> resolveSpellCardTheme -> theme tokens -> template placeholders -> CSS custom properties
```

This keeps spell-school logic out of `src/core/`.

## Inspector model

The inspector is read-only.

It shows what feeds the current preview:

- DataPack;
- template HTML;
- template manifest;
- template CSS;
- PrintDocument summary.

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
foundation/card-template-variants-v1
```

Possible objective:

Add support for multiple card template variants from code-authored modules without adding user input, editor UI, overflow, or arbitrary template JavaScript.

Do not add overflow, character sheets, stackblocks, random tables, backend, or a visual editor until separately scoped.
