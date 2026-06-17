# Two-Step AI Development

This project should use a two-step AI workflow:

```text
1. Scope
2. Implementation
```

The goal is to prevent architectural drift, accidental feature creep, and uncontrolled edits.

No implementation task should begin before the scope is explicit.

## Step 1: Scope

Scope mode is for analysis, planning, boundaries, and contracts.

Use scope mode when:

- defining architecture;
- splitting work into tasks;
- reviewing existing files;
- identifying risks;
- preparing an implementation contract;
- deciding what must not be touched.

Scope mode may read files and propose changes, but should not modify code.

A scope response should produce an implementation contract.

## Step 2: Implementation

Implementation mode is for executing a specific contract.

Use implementation mode only when the task has:

- a closed objective;
- allowed files;
- forbidden files or areas;
- explicit non-goals;
- expected result;
- update instructions for project state.

Implementation mode should not expand the task beyond the contract.

If the contract is wrong or unsafe, stop and report the problem instead of improvising.

## Prompt format: Scope

Use this format when asking the AI to analyze or prepare a task.

```text
MODO: SCOPE

Objetivo:
<What we want to understand or plan.>

Contexto:
<Relevant project context.>

Restricciones:
<Architectural constraints, files to avoid, known risks.>

Salida esperada:
<What the AI must return: task route, risk list, contract, file map, etc.>
```

## Prompt format: Implementation

Use this format when asking the AI to modify the repository.

```text
MODO: IMPLEMENTACION

Tarea:
<short/task-name>

Objetivo cerrado:
<exact desired result>

Archivos permitidos para modificar:
- <path>

Archivos permitidos para crear:
- <path>

Archivos prohibidos:
- <path or directory>

No objetivos:
- <what must not be added>

Criterios de aceptacion:
- <observable result>

Actualizar:
- PROJECT_STATE.md
```

## Implementation contract rules

A contract must be narrow.

A contract should prefer small tasks that can be reviewed easily.

A contract must name forbidden areas when the project has boundaries.

A contract must include non-goals when there is a risk of overbuilding.

A contract must update `PROJECT_STATE.md` when behavior, architecture, or active direction changes.

## Repository boundaries

Until the new architecture is implemented, treat the current editor as legacy/prototype code.

Do not mix the new printable pipeline directly into old editor behavior without an explicit migration task.

Prefer creating new modules under the future architecture instead of expanding a large file.

## Recommended development sequence

1. Document vision and architecture.
2. Define template and print specs.
3. Implement the minimal template-print pipeline.
4. Add sample spell data.
5. Add a fixed spell-card template.
6. Compose repeatable cards into A4 pages.
7. Add print preview and browser print styling.
8. Add color tokens.
9. Add simple overflow detection.
10. Add stackable DM/NPC blocks.
11. Add random-table templates.
12. Add character-sheet generation.
13. Only then revisit a visual template editor.

## AI behavior requirements

When in scope mode, the AI should:

- inspect relevant files;
- describe current state;
- identify architectural fit or mismatch;
- propose a narrow next task;
- avoid code changes.

When in implementation mode, the AI should:

- obey the contract;
- keep changes minimal;
- avoid unrelated refactors;
- update documentation when required;
- report any incomplete part honestly.

## Example first implementation contract

```text
MODO: IMPLEMENTACION

Tarea:
foundation/template-print-pipeline-v1

Objetivo cerrado:
Create the first minimal printable pipeline: JavaScript data objects -> template string with {{variables}} -> fixed-size card PrintBlocks -> A4 PrintDocument -> browser-rendered preview.

Archivos permitidos para modificar:
- index.html
- src/main.js
- src/styles.css
- README.md
- PROJECT_STATE.md

Archivos permitidos para crear:
- src/data/sampleSpells.js
- src/core/template/renderTemplate.js
- src/core/template/resolvePath.js
- src/core/print/createPrintBlocks.js
- src/core/print/composePages.js
- src/core/print/createPrintDocument.js
- src/render/renderPrintDocument.js
- src/templates/spellCard/manifest.js
- src/templates/spellCard/template.js
- src/templates/spellCard/styles.js
- src/printJobs/spellCardsJob.js

Archivos prohibidos:
- Any backend or server files
- Any package/build configuration unless explicitly justified

No objetivos:
- No visual template editor
- No overflow splitting
- No character sheet generation
- No PDF export
- No API/backend

Criterios de aceptacion:
- Opening index.html renders an A4 preview generated from spell data.
- Multiple cards are arranged into A4 pages.
- Browser print hides controls and prints only pages.
- Data and template are separate modules.
- PROJECT_STATE.md is updated.
```
