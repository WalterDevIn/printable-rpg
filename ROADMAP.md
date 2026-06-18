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

Status: active.

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

## Phase 3: Basic overflow handling

Goal: detect content that does not fit and apply declared template strategies.

Initial strategies:

- `clip`;
- `fail`;
- `shrink`;
- `blank-extra`;
- `continuation-card`.

Start with flow cards before solving every template family.

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

## Phase 4: Stackable DM and NPC blocks

Goal: support table-facing blocks printed sequentially.

Deliverables:

- stackable block template;
- generic NPC block;
- specific NPC block;
- vertical stack composer;
- keep-together behavior.

These templates should use the 5 mm grid internally.

## Phase 5: Random table templates

Goal: support random-table output as both pages and stackable blocks.

Deliverables:

- full-page random table template;
- stackable random table template;
- row-safe breaking concept;
- print examples.

These templates should use the 5 mm grid internally.

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

## Phase 7: Visual template editor revisit

Goal: evolve the current visual editor into a template editor, not a final-document editor.

Potential deliverables:

- visual placement of template regions;
- variable fields;
- section definitions;
- exported template manifest;
- 5 mm grid authoring for applicable template families.

This phase should happen only after the print pipeline is stable.

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
