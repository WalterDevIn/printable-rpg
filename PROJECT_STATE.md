# Project State

Last updated: 2026-06-18

## Current direction

Printable RPG is a data-driven printable RPG publishing tool.

The current implemented pipeline is:

```text
DataPack -> Template -> PrintRecord -> PrintBlock -> PageComposer -> PrintDocument -> Browser Print
```

The app remains frontend-first. A backend/API is not part of the current foundation.

## Current repository state

The previous A4 visual editor prototype has been replaced by the generated print-preview slice.

Phase 3 is closed. Phase 3.5 explicit JSON input is implemented for spell cards.

The current app:

- is frontend-only;
- uses HTML, CSS, and JavaScript ESM;
- has no build step;
- has no dependencies;
- opens directly through `index.html`;
- starts from example spell data in `src/data/sampleSpells.js`;
- lets the user edit or paste a JSON array of spell objects in the Input panel;
- validates JSON before regenerating the preview;
- keeps the previous preview when parsing or validation fails;
- restores example data on demand;
- renders spell-card pages from the active input data;
- applies spell-card visual theme tokens derived from spell school;
- supports code-selected spell-card template variants;
- generates spell-card PrintRecords before PrintBlocks;
- creates mixed spell-card PrintDocuments when estimated data length requires continuation;
- measures rendered PrintBlocks for diagnostic overflow;
- uses a compact user-facing Input / Preview workspace;
- keeps template internals out of the primary user workflow;
- includes disabled placeholders for input mode and template selection.

## Implemented foundation

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

Completed behavior:

- sample spell data lives in `src/data/sampleSpells.js`;
- JSON input parsing lives in `src/app/parseSpellJsonInput.js`;
- spell input validation lives in `src/app/validateSpellInput.js`;
- the JSON editor view lives in `src/app/createJsonInputView.js`;
- template placeholder rendering lives under `src/core/template/`;
- template manifest validation lives in `src/core/template/assertTemplateManifest.js`;
- shared page sizes live in `src/core/layout/pageSizes.js`;
- print block creation lives under `src/core/print/`;
- mixed print document creation lives in `src/core/print/createMixedPrintDocument.js`;
- mixed print block creation lives in `src/core/print/createMixedPrintBlocks.js`;
- `composePages.js` is a composer dispatcher, not a universal layout function;
- fixed card grid composition lives in `src/core/print/composeFixedGridPages.js`;
- mixed card variants are validated for compatible size and composer before document creation;
- spell-card variants live under `src/templates/spellCard/`;
- spell-card theme tokens live in `src/templates/spellCard/themeTokens.js`;
- spell-card theme resolution lives in `src/templates/spellCard/resolveSpellCardTheme.js`;
- spell-school mapping is template-specific and does not touch `src/core/`;
- the local spell-card flow region model lives in `src/templates/spellCard/flowRegions.js`;
- spell-card PrintRecord creation lives in `src/templates/spellCard/createSpellCardPrintRecords.js`;
- PrintRecord creation uses estimated data length only and does not use DOM measurement;
- the concrete spell-card print job lives in `src/printJobs/spellCardsJob.js`;
- `createSpellCardsJob()` accepts external `spells` data and still works without arguments;
- rendered PrintBlocks are measured browser-side for visual overflow;
- overflow measurement lives in `src/render/measurePrintBlockOverflow.js`;
- the primary user workspace is Input / Preview;
- `createUserPrintWorkspace.js` renders the compact user print workspace;
- `createInputModeButton.js` renders the disabled input mode placeholder;
- `createTemplateSelectButton.js` renders the disabled template selection placeholder;
- Input is an editable JSON textarea;
- applying valid JSON regenerates Preview;
- invalid JSON or invalid spell shape shows an error and keeps the previous Preview;
- restoring example data resets the textarea and regenerates Preview;
- Preview contains the real `#printPreview` output used for browser print;
- template HTML, manifest, CSS, and diagnostics are not part of the primary user workflow;
- DOM rendering of print pages lives in `src/render/renderPrintDocument.js`;
- `src/main.js` renders preview, applies JSON input, restores examples, measures overflow, and renders the user print workspace;
- `index.html` is a minimal print-preview shell with a workspace container;
- input controls and non-print UI are hidden in print mode.

## JSON input contract

The current input mode expects a non-empty array of spell objects.

Required fields:

- `name`
- `level`
- `school`
- `castingTime`
- `range`
- `components`
- `duration`
- `description`

Every item must be an object. Required fields must produce non-empty string values.

## Phase 3 closeout

Phase 3 established the overflow and flow foundation for card templates.

Phase 3 intentionally does not include:

- DOM-measured fragmentation;
- layout-perfect continuation;
- provisional render / measure / split / re-render loops;
- final tail-region placement;
- table flow;
- row splitting;
- shrink execution;
- blank-extra generation;
- print blocking from overflow policy.

The continuation behavior currently implemented is estimated from source data. It is not DOM-measured and is not guaranteed to fit perfectly.

## Key decisions

### Frontend-first

Do not split into API/frontend yet.

A backend may be introduced later only if required by persistence, shared libraries, authentication, collaboration, or server-side PDF rendering.

### User print workspace versus template authoring

The primary print workspace is for users who want to provide input data and get an imprimible.

The template is selected in that workflow; it is not edited or inspected there.

Template code, manifest, CSS, tokens, regions, and technical diagnostics belong in a future Template Studio or debug/inspector mode, not in the primary user workflow.

### Core separation

Current implementation separates:

- data;
- JSON input parsing;
- spell input validation;
- template rendering;
- template-specific context enrichment;
- template manifest validation;
- PrintRecord creation;
- print block creation;
- mixed print block creation;
- page composition dispatch;
- fixed-grid page composition;
- A4 page size constants;
- local template variants;
- template-local flow region modeling;
- print document creation;
- mixed print document creation;
- browser rendering;
- browser-side overflow measurement;
- print job orchestration;
- user print workspace views;
- app entrypoint.

### Page composition

The current supported composer is:

```text
grid-pack
```

`grid-pack` is for same-size repeatable blocks, such as fixed spell cards.

Future composers, such as vertical stack composition for NPCs or DM blocks, should be implemented as separate strategies.

### Mixed spell-card documents

Spell cards use PrintRecords as an intermediate step:

```text
data -> spell-card PrintRecords -> mixed PrintBlocks -> PrintDocument
```

For v1, mixed documents require all participating variants to share physical size and composer.

### Overflow detection and policy diagnostics

Overflow detection is diagnostic only.

The current flow is:

```text
render PrintDocument -> measure rendered PrintBlocks -> evaluate manifest overflow strategy
```

Overflow detection and policy diagnostics do not resolve content by measurement. They do not implement shrink, blank-extra, DOM-measured continuation, automatic flow continuation by layout, or print blocking.

## Current limitations

The current foundation intentionally does not include:

- input mode selection behavior;
- template selection behavior;
- Template Studio;
- visual template editor;
- drag and drop;
- persistence;
- import/export;
- file loading;
- natural-language input parsing;
- image input;
- OCR;
- AI parsing;
- overflow resolution by DOM measurement;
- content shrink;
- blank-extra generation;
- table row splitting;
- tail-region placement on final continuation only;
- print blocking from overflow policy;
- DOM-measured content fragmentation;
- character sheet generation;
- stackblocks;
- NPC templates;
- random tables;
- PDF export;
- backend/API;
- framework or build tooling;
- global template registry.

## Next recommended scope

Task name:

```text
foundation/input-validation-reporting-scope
```

Possible closed objective:

Improve validation messages and add a compact structured input status without exposing template internals.

Alternative next scopes:

- `foundation/template-selection-scope`
- `foundation/template-studio-scope`
- `foundation/input-mode-registry-scope`

## Known risks

- Adding domain-specific spell logic into generic print composition.
- Expanding placeholder syntax into a full template language too early.
- Reintroducing manual editor behavior into the print-preview foundation.
- Treating `grid-pack` as a universal page composer.
- Moving template-specific theme mapping into `src/core/`.
- Creating a global template registry before there are multiple template families.
- Treating overflow detection as overflow resolution.
- Treating estimated continuation as DOM-measured layout fitting.
- Surfacing template internals in the primary user print workflow.
- Adding backend/API before the print pipeline needs persistence or sharing.

## Immediate status

Explicit JSON input is implemented through `foundation/explicit-data-input-v1`.

The app lets the user edit a JSON array of spell objects, validates it, regenerates the current spell-card Preview on success, keeps the previous Preview on error, restores example data, and prints only the generated A4 output.
