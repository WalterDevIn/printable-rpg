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

The previous A4 visual editor prototype has been replaced by the first generated print-preview slice.

The current app:

- is frontend-only;
- uses HTML, CSS, and JavaScript ESM;
- has no build step;
- has no dependencies;
- opens directly through `index.html`;
- renders sample spell-card pages generated from JavaScript data.

## Implemented foundation

Implemented task:

```text
foundation/template-print-pipeline-v1
```

Closed objective completed:

```text
JavaScript data objects -> template string with placeholder variables -> fixed-size spell-card PrintBlocks -> A4 PrintDocument -> browser-rendered preview with print support
```

Implemented behavior:

- sample spell data lives in `src/data/sampleSpells.js`;
- template placeholder rendering lives under `src/core/template/`;
- print block and page composition logic lives under `src/core/print/`;
- the spell-card template lives under `src/templates/spellCard/`;
- the concrete spell-card print job lives in `src/printJobs/spellCardsJob.js`;
- DOM rendering lives in `src/render/renderPrintDocument.js`;
- `src/main.js` is now a thin entry point;
- `index.html` is now a print-preview shell;
- `src/styles.css` now contains app, preview, and print styles.

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
- print block creation;
- A4 page composition;
- print document creation;
- browser rendering;
- print job orchestration;
- app entrypoint.

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
- inspector;
- persistence;
- import/export;
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
- Adding backend/API before the print pipeline needs persistence or sharing.

## Immediate status

Fase 1 is implemented.

The app now previews generated spell-card A4 pages from sample data.
