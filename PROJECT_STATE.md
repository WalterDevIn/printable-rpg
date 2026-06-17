# Project State

Last updated: 2026-06-17

## Current direction

Printable RPG is being replanted as a data-driven printable RPG publishing tool.

The new intended pipeline is:

```text
DataPack -> Template -> PrintBlock -> PageComposer -> PrintDocument -> Browser Print
```

The app should remain frontend-first for now. A backend/API is not part of the current foundation.

## Current repository state

The existing app is a frontend-only A4 visual editor built with HTML, CSS, and JavaScript ESM.

It currently provides:

- A4 portrait canvas;
- optional 5 mm visual grid;
- manually positioned blocks;
- block inspector;
- basic print styling;
- no build step;
- no dependencies.

This is now considered a useful prototype/legacy editor, not the architectural center of the product.

## Architectural documents

Created documentation foundation:

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

Future implementation should split:

- pure core engine;
- templates;
- data;
- print jobs;
- browser rendering;
- app UI.

### Cards and grid

Cards are not required to follow the 5 mm internal grid.

Cards only need physical dimensions and pagination rules.

### 5 mm grid families

The 5 mm grid applies internally to:

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

## Next recommended implementation

Task name:

```text
foundation/template-print-pipeline-v1
```

Closed objective:

Create the first minimal printable pipeline:

```text
JavaScript data objects -> template string with {{variables}} -> fixed-size card PrintBlocks -> A4 PrintDocument -> browser-rendered preview
```

Recommended first use case:

- sample spell cards generated from a JavaScript array.

Non-goals:

- no visual template editor;
- no overflow splitting;
- no character sheet generation;
- no PDF export;
- no backend/API.

## Known risks

- Expanding the old `src/main.js` instead of introducing the new architecture.
- Mixing domain-specific logic into generic print composition.
- Adding backend/API before the print pipeline is proven.
- Treating template HTML as a full programming language too early.
- Trying to solve perfect overflow before fixed cards work.

## Immediate status

Documentation foundation is complete.

No code implementation has started yet under the new architecture.
