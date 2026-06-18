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

The current app:

- is frontend-only;
- uses HTML, CSS, and JavaScript ESM;
- has no build step;
- has no dependencies;
- opens directly through `index.html`;
- renders sample spell-card pages generated from JavaScript data;
- applies spell-card visual theme tokens derived from spell school;
- supports code-selected spell-card template variants;
- generates spell-card PrintRecords before PrintBlocks;
- creates mixed spell-card PrintDocuments with `classic` and `flow` variants when estimated data length requires continuation;
- measures rendered PrintBlocks for diagnostic overflow;
- evaluates the declared overflow strategy against the measured overflow report;
- reports spell-card flow regions and flow candidates by data estimate;
- separates read-only inspection into Data, Template, Diagnostics, and Print Output workspace panels;
- supports showing, hiding, and locally resizing workspace panels.

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
```

Completed behavior:

- sample spell data lives in `src/data/sampleSpells.js`;
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
- the default spell-card base variant is `classic`;
- additional fixed-size `compact` and `flow` spell-card variants exist;
- the flow variant declares a semantic description flow region;
- the flow variant declares `overflow.strategy: "fail"` for diagnostic intent;
- the local spell-card variant registry lives in `src/templates/spellCard/variants.js`;
- spell-card theme tokens live in `src/templates/spellCard/themeTokens.js`;
- spell-card theme resolution lives in `src/templates/spellCard/resolveSpellCardTheme.js`;
- spell-school mapping is template-specific and does not touch `src/core/`;
- spell-card templates consume theme tokens through placeholders;
- spell-card styles use CSS custom properties for token application;
- the local spell-card flow region model lives in `src/templates/spellCard/flowRegions.js`;
- the flow region report generator lives in `src/templates/spellCard/createSpellCardFlowRegionsReport.js`;
- spell-card PrintRecord creation lives in `src/templates/spellCard/createSpellCardPrintRecords.js`;
- the flow region model declares fixed, flow, tail, and decoration regions;
- the `description` field is the first declared flow region;
- the `description` flow region references `continuationVariantId: "flow"`;
- flow region reporting uses data estimation only and does not use DOM measurement;
- PrintRecord creation uses estimated data length only and does not use DOM measurement;
- single records create one `classic` PrintRecord;
- flow candidates create a `classic` head record and one or more `flow` continuation records;
- description splitting avoids cutting in the middle of a word when possible;
- the concrete spell-card print job lives in `src/printJobs/spellCardsJob.js`;
- `createSpellCardsJob()` accepts a `variantId` option from code and defaults to `classic`;
- `createSpellCardsJob({ variantId: "flow" })` can select the flow variant from code;
- `createSpellCardsJob()` returns a traceable job object with variant metadata, themed data, PrintRecords, manifest, template HTML, template CSS, and printDocument;
- rendered PrintBlocks include diagnostic attributes for block id, template id, and page number;
- rendered PrintBlocks are measured browser-side for visual overflow;
- overflow measurement lives in `src/render/measurePrintBlockOverflow.js`;
- overflow policy evaluation lives in `src/app/evaluateOverflowPolicy.js`;
- overflow policy evaluation reads `manifest.overflow.strategy`;
- `fail` and `clip` have implemented diagnostic semantics;
- `shrink`, `blank-extra`, and `continuation-card` are recognized but unresolved;
- Data view shows source data and generated PrintRecords;
- Diagnostics view shows PrintDocument summary, PrintRecords report, Overflow report, Overflow policy report, and Flow regions report;
- the read-only workspace shell lives under `src/app/`;
- `createWorkspaceView.js` renders toggleable workspace controls and panels;
- Template view shows variant metadata, manifest, template HTML, and template CSS;
- Print Output view contains the real `#printPreview` output used for browser print;
- workspace panels can be shown, hidden, and resized locally in the browser;
- DOM rendering of print pages lives in `src/render/renderPrintDocument.js`;
- `src/main.js` is a thin entry point that renders preview, measures overflow, evaluates overflow policy, creates the flow regions report, and renders the workspace;
- `index.html` is a print-preview shell with a workspace container;
- `src/styles.css` contains app, workspace, view, print output, diagnostic overflow, and print styles;
- workspace controls, non-print panels, diagnostic UI, and diagnostic overflow marks are hidden in print mode.

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
- app-level overflow policy diagnostics;
- read-only workspace views;
- app entrypoint.

### Page composition

The current supported composer is:

```text
grid-pack
```

`grid-pack` is for same-size repeatable blocks, such as fixed spell cards.

Future composers, such as vertical stack composition for NPCs or DM blocks, should be implemented as separate strategies.

### Mixed spell-card documents

Spell cards now use PrintRecords as an intermediate step:

```text
data -> spell-card PrintRecords -> mixed PrintBlocks -> PrintDocument
```

`src/core/print/createMixedPrintDocument.js` is generic to records and variant resolution. It does not know spell-card fields.

`src/templates/spellCard/createSpellCardPrintRecords.js` is spell-card-specific and knows about the `description` flow region.

For v1, mixed documents require all participating variants to share physical size and composer.

### Overflow detection and policy diagnostics

Overflow detection is diagnostic only.

The current flow is:

```text
render PrintDocument -> measure rendered PrintBlocks -> evaluate manifest overflow strategy -> Diagnostics reports
```

Overflow detection and policy diagnostics do not resolve content by measurement. They do not implement shrink, blank-extra, DOM-measured continuation, automatic flow continuation by layout, or print blocking.

Implemented diagnostic strategies:

- `fail`: overflow produces `error`; no overflow produces `ok`;
- `clip`: overflow produces `warning`; no overflow produces `ok`.

Recognized but unresolved strategies:

- `shrink`;
- `blank-extra`;
- `continuation-card`.

### Spell-card flow regions

Spell-card flow regions are local to `src/templates/spellCard/`.

The current model declares:

- fixed regions for title and metadata;
- a flow region for `description`;
- a tail region prepared for `higherLevels`;
- a decoration region for a bottom school mark.

The Flow regions report marks records as `single` or `flow-candidate` using estimated data length only. It does not use DOM measurement.

### Flow card variant

The flow spell-card variant is a template variant, not a flow engine.

It keeps the same physical card size, data model, theme token model, and `grid-pack` pagination as the other spell-card variants.

It marks the long-text description region with:

```html
data-flow-region="description"
```

That semantic region supports estimated continuation work, but the variant does not split text by itself.

### Read-only workspace views

The app shell separates inspection into four workspace panels:

- Data: source data and generated PrintRecords;
- Template: active variant metadata, manifest, template HTML, and template CSS;
- Diagnostics: PrintDocument summary, PrintRecords report, Overflow report, Overflow policy report, and Flow regions report;
- Print Output: generated A4 pages used by browser print.

Workspace controls show or hide panels independently. Multiple panels can be visible at once. Panels can be resized locally in the browser.

The workspace does not edit data, edit templates, load files, select variants, create duplicate panel instances, or persist layout.

### Spell-card variants

Spell-card variants are local to `src/templates/spellCard/`.

The current local registry is:

```text
src/templates/spellCard/variants.js
```

Current variants:

- `classic`: default fixed spell-card layout;
- `compact`: fixed-size denser layout using the same data model;
- `flow`: fixed-size long-text-oriented layout using the same data model.

No global template registry exists yet.

### Spell-card theme tokens

Spell-card visual tokens are resolved in the spell-card template layer.

The current flow is:

```text
spell.school -> resolveSpellCardTheme -> theme tokens -> template placeholders -> CSS custom properties
```

Spell-school mapping must not move into `src/core/`.

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
- overflow resolution by DOM measurement;
- content shrink;
- blank-extra generation;
- table row splitting;
- tail-region placement on final continuation only;
- print blocking from overflow policy;
- DOM-measured content fragmentation;
- duplicate workspace panel instances;
- persisted workspace layout;
- character sheet generation;
- stackblocks;
- NPC templates;
- random tables;
- PDF export;
- backend/API;
- framework or build tooling;
- global template registry;
- UI template selector.

## Next recommended scope

Task name:

```text
foundation/phase-3-closeout-scope
```

Possible closed objective:

Review Phase 3 behavior and decide whether to close it before moving to DOM-measured fragmentation, table flow, or another template family.

Alternative next scopes:

- `foundation/workspace-panel-instances-scope`
- `foundation/stackable-block-composer-scope`

## Known risks

- Adding domain-specific spell logic into generic print composition.
- Expanding placeholder syntax into a full template language too early.
- Reintroducing manual editor behavior into the print-preview foundation.
- Treating `grid-pack` as a universal page composer.
- Turning the read-only workspace shell into an editor without a dedicated scope.
- Moving template-specific theme mapping into `src/core/`.
- Creating a global template registry before there are multiple template families.
- Treating overflow detection as overflow resolution.
- Treating overflow policy diagnostics as overflow resolution.
- Treating flow region reports as flow resolution.
- Treating the flow variant as a flow engine.
- Treating estimated continuation as DOM-measured layout fitting.
- Adding backend/API before the print pipeline needs persistence or sharing.

## Immediate status

Mixed spell-card PrintDocuments are implemented through `foundation/mixed-card-print-document-v1`.

The app previews generated spell-card A4 pages from sample data using the default `classic` base variant, generates PrintRecords, emits `classic` head cards and `flow` continuation cards by data estimate, exposes data/template/diagnostics/print-output through read-only toggleable panels, reports rendered block overflow, and evaluates the declared overflow strategy without DOM-measured overflow resolution.
