# Roadmap

This roadmap follows the new Printable RPG direction: data-driven printable generation with reusable templates.

## Phase 0: Documentation foundation

Goal: define the project direction before changing code.

Deliverables:

- `PROJECT_VISION.md`
- `ARCHITECTURE.md`
- `TEMPLATE_SPEC.md`
- `PRINT_SPEC.md`
- `TWO_STEP_AI_DEVELOPMENT.md`
- `ROADMAP.md`
- `PROJECT_STATE.md`

Status: completed.

## Phase 1: Minimal template-print pipeline

Goal: validate the central pipeline.

```text
JavaScript data -> template -> PrintBlocks -> A4 pages -> browser print
```

Target use case:

- fixed spell cards generated from a JavaScript array.

Expected behavior:

- data lives outside the template;
- template uses `{{variable}}` placeholders;
- each data object produces one fixed-size card;
- cards are arranged into A4 pages;
- print mode hides app controls;
- no backend or build step is required.

Non-goals:

- no overflow continuation;
- no character sheet;
- no visual template editor;
- no PDF export;
- no API.

Status: completed.

## Phase 1.5: Print job inspector

Goal: make the current print job transparent without turning the app into an editor.

The user should be able to see what feeds the generated preview.

Deliverables:

- visible current DataPack;
- visible template HTML;
- visible template manifest;
- visible template CSS;
- visible PrintDocument summary;
- visible page count and block count.

Non-goals:

- no data editing;
- no template editing;
- no file loading;
- no persistence;
- no import/export;
- no visual template editor.

This phase prevents the print pipeline from becoming a black box while keeping programmer-authored files as the source of truth.

Status: completed.

## Phase 2: Template tokens and card variants

Goal: improve cards without changing the core pipeline.

Deliverables:

- semantic color tokens;
- spell-school color mapping;
- support for multiple card templates;
- fixed card and flow card examples.

Non-goals:

- no complex expression language;
- no arbitrary template JavaScript.

Status: completed.

## Phase 3: Basic overflow and flow foundation

Goal: establish the overflow and flow architecture for card templates without requiring layout-perfect fragmentation.

Phase 3 is now closed.

Completed capabilities:

- browser-side overflow detection for rendered PrintBlocks;
- diagnostic overflow policy evaluation from `manifest.overflow.strategy`;
- implemented diagnostic semantics for `fail` and `clip`;
- recognized unresolved strategies for `shrink`, `blank-extra`, and `continuation-card`;
- flow-oriented spell-card variant;
- spell-card flow region model with fixed, flow, tail, and decoration regions;
- `description` as the first flow region;
- flow candidate detection by data estimate, not DOM measurement;
- PrintRecords as an intermediate representation before PrintBlocks;
- mixed spell-card PrintDocuments with `classic` head cards and `flow` continuation cards;
- diagnostics for PrintDocument, PrintRecords, Overflow, Overflow policy, and Flow regions;
- four-view read-only workspace: Data, Template, Diagnostics, and Print Output.

Current Phase 3 guarantees:

- overflow can be measured after rendering;
- overflow policy can be evaluated diagnostically;
- templates can declare candidate flow regions;
- spell-card data can generate estimated continuation records;
- a final PrintDocument can mix compatible variants.

Current Phase 3 limits:

- continuation is estimated from data length;
- continuation is not layout-perfect;
- DOM measurement is not used to decide text splitting;
- overflow diagnostics do not block printing;
- `tail` regions are modeled but not placed only on final continuation cards;
- table flow and row splitting are not implemented;
- `shrink` is recognized but not implemented;
- `blank-extra` is recognized but not implemented;
- `continuation-card` is recognized diagnostically but not implemented as a generic policy engine.

Explicitly outside Phase 3:

- DOM-measured fragmentation;
- provisional render / measure / split / re-render loops;
- table row flow;
- final tail-region placement;
- shrink policy execution;
- blank-extra generation;
- print blocking from overflow policy;
- global template registry;
- template editor;
- data import UI;
- other template families.

Status: completed.

## Phase 3.5: Explicit data input

Goal: allow user-provided data after the print pipeline, card variants, and basic overflow model are stable enough to define meaningful input contracts.

The first explicit user input should be data, not template editing.

Deliverables:

- paste or load JSON data for an existing template family;
- validate basic JSON shape;
- report useful data errors;
- regenerate the current print job from user-provided data;
- keep existing code-authored sample data as a fallback.

Non-goals:

- no visual template editor;
- no full template editing;
- no arbitrary JavaScript input;
- no persistence unless separately scoped;
- no backend/API.

This phase converts DataPack input from programmer-authored files into controlled user input while preserving existing templates as stable code modules.

Status: planned.

## Phase 4: Stackable DM and NPC blocks

Goal: support table-facing blocks printed sequentially.

Deliverables:

- stackable block template;
- generic NPC block;
- specific NPC block;
- vertical stack composer;
- keep-together behavior.

These templates should use the 5 mm grid internally.

Status: planned.

## Possible future phase: DOM-measured fragmentation

Goal: make continuation cards layout-aware instead of only data-estimated.

Potential deliverables:

- provisional render;
- browser-side measurement loop;
- content split based on actual rendered height;
- final render validation;
- loop guards and unresolved overflow diagnostics.

Non-goals until separately scoped:

- table row flow;
- arbitrary template editor;
- server-side PDF rendering.

Status: backlog.

## Phase 5: Random table templates

Goal: support random-table output as both pages and stackable blocks.

Deliverables:

- full-page random table template;
- stackable random table template;
- row-safe breaking concept;
- print examples.

These templates should use the 5 mm grid internally.

Status: planned.

## Phase 6: Character sheet generation

Goal: generate only the sheet sections a character needs.

Deliverables:

- multipage character-sheet template;
- optional sections;
- filled mode;
- blank personalized mode;
- second page for traits when needed;
- third page for personality/background when needed.

These templates should use the 5 mm grid internally.

Status: planned.

## Phase 7: Visual template editor revisit

Goal: evolve the current visual editor into a template editor, not a final-document editor.

Potential deliverables:

- visual placement of template regions;
- variable fields;
- section definitions;
- exported template manifest;
- 5 mm grid authoring for applicable template families.

This phase should happen only after the print pipeline is stable.

Status: planned.

## Phase 8: Optional backend/API

A backend should only be introduced if there is a concrete need.

Possible triggers:

- persistent user projects;
- shared template library;
- shared DataPack library;
- authentication;
- cloud storage;
- server-side PDF rendering;
- collaborative editing.

Until then, frontend-first is preferred.

Status: optional.
