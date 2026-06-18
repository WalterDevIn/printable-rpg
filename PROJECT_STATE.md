# Project State

Last updated: 2026-06-17

## Current direction

Printable RPG is a data-driven printable RPG publishing tool.

The current implemented pipeline is:

```text
DataPack -> Template -> PrintBlock -> PageComposer -> PrintDocument -> Browser Print
```

The app remains frontend-first. A backend/API is not part of the current foundation.

## Current repository state

The previous A4 visual editor prototype has been replaced by the generated print-preview slice.

The current app:

- is frontend-only;
- uses HTML, CSS, and JavaScript ESM;
- has no build step;
- has no dependencies;
- opens directly through `index.html`;
- renders sample spell-card pages generated from JavaScript data;
- shows a non-editable inspector for the active print job.

## Implemented foundation

Implemented tasks:

```text
foundation/template-print-pipeline-v1
foundation/print-core-boundaries-v1
foundation/print-job-inspector-v1
```

Completed behavior:

- sample spell data lives in `src/data/sampleSpells.js`;
- template placeholder rendering lives under `src/core/template/`;
- template manifest validation lives in `src/core/template/assertTemplateManifest.js`;
- shared page sizes live in `src/core/layout/pageSizes.js`;
- print block creation lives under `src/core/print/`;
- `composePages.js` is a composer dispatcher, not a universal layout function;
- fixed card grid composition lives in `src/core/print/composeFixedGridPages.js`;
- print document creation validates the manifest before creating blocks;
- the spell-card template lives under `src/templates/spellCard/`;
- the spell-card manifest uses the centralized A4 page size;
- the concrete spell-card print job lives in `src/printJobs/spellCardsJob.js`;
- `createSpellCardsJob()` returns a traceable job object with data, manifest, template HTML, template CSS, and printDocument;
- the non-editable job inspector lives under `src/app/`;
- the inspector shows job summary, DataPack, template HTML, manifest, template CSS, and a PrintDocument summary without block HTML duplication;
- DOM rendering of print pages lives in `src/render/renderPrintDocument.js`;
- `src/main.js` is a thin entry point that renders preview and inspector;
- `index.html` is a print-preview shell with an inspector container;
- `src/styles.css` contains app, inspector, preview, and print styles;
- the inspector is hidden in print mode.

## Architectural documents

Documentation foundation:

- `PROJECT_VISION.md`
- `ARCHITECTURE.md`
- `TEMPLATE_SPEC.md`
- `PRINT_SPEC.md`
- `TWO_STEP_AI_DEVELOPMENT.md`
- `ROADMAP.md`
- `PROJECT_STATE.md`

## Key decisions

### Frontend-first

Do not split into API/frontend yet.

A backend may be introduced later only if required by persistence, shared libraries, authentication, collaboration, or server-side PDF rendering.

### Core separation

Current implementation separates:

- data;
- template rendering;
- template manifest validation;
- print block creation;
- page composition dispatch;
- fixed-grid page composition;
- A4 page size constants;
- print document creation;
- browser rendering;
- print job orchestration;
- app-level inspection;
- app entrypoint.

### Page composition

The current supported composer is:

```text
grid-pack
```

`grid-pack` is for same-size repeatable blocks, such as fixed spell cards.

Future composers, such as vertical stack composition for NPCs or DM blocks, should be implemented as separate strategies.

### Print job inspection

The inspector is read-only.

It exposes the active job inputs and generated document summary without making them editable.

Data and templates remain code-authored modules for now.

### Cards and grid

Cards are not required to follow the 5 mm internal grid.

Cards only need physical dimensions and pagination rules.

### 5 mm grid families

The 5 mm grid applies internally to future:

- character sheets;
- DM stackblocks;
- NPC blocks;
- random tables;
- table-facing reference blocks.

### Blank personalized sheets

A blank personalized character sheet is the same generated sheet with data ink hidden, not a separate template.

### AI workflow

Development should use a two-step AI process:

1. Scope.
2. Implementation.

Implementation work should use explicit contracts with allowed files, forbidden files, non-goals, and acceptance criteria.

## Current limitations

The current foundation intentionally does not include:

- visual template editor;
- drag and drop;
- editable inspector;
- persistence;
- import/export;
- file loading;
- overflow splitting;
- continuation cards;
- advanced color tokens;
- character sheet generation;
- stackblocks;
- NPC templates;
- random tables;
- PDF export;
- backend/API;
- framework or build tooling.

## Next recommended scope

Task name:

```text
foundation/card-template-tokens-v1
```

Possible closed objective:

Add semantic visual tokens for spell schools while keeping school-specific behavior outside the generic print engine.

Alternative next scopes:

- `foundation/card-overflow-detection-scope`
- `foundation/flow-card-template-scope`
- `foundation/stackable-block-composer-scope`

## Known risks

- Adding domain-specific spell logic into generic print composition.
- Expanding placeholder syntax into a full template language too early.
- Adding overflow continuation before simple cards are stable.
- Reintroducing manual editor behavior into the print-preview foundation.
- Treating `grid-pack` as a universal page composer.
- Turning the read-only inspector into an editor without a dedicated scope.
- Adding backend/API before the print pipeline needs persistence or sharing.

## Immediate status

Fase 1 and Phase 1.5 are implemented.

The app previews generated spell-card A4 pages from sample data and exposes the active print job inputs through a read-only inspector.
