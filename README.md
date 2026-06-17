# Printable RPG

Printable RPG is being replanted as a frontend-first tool for generating printable tabletop RPG material from structured data and reusable physical templates.

The long-term pipeline is:

```text
DataPack -> Template -> PrintBlock -> PageComposer -> PrintDocument -> Browser Print
```

The current app is a visual A4 editor prototype. It remains useful as a reference for A4 sizing, grid handling, block placement, and print CSS, but it is no longer the architectural center of the project.

## Current app

The app is frontend-only: HTML, CSS, and JavaScript ESM.

It has no build step and no dependencies.

Open `index.html` in the browser.

## Current prototype features

- A4 portrait canvas.
- Optional 5 mm x 5 mm visual grid.
- Positionable and resizable blocks with 5 mm snap.
- Fine 2.5 mm snap for divider lines.
- Sidebar explorer with all sheet elements.
- Inspector for name, position, size, text, color, and element properties.
- Elements:
  - centered text;
  - common text;
  - divider line;
  - square;
  - grid square.
- Duplicate, delete, clear sheet, and zoom.
- A4 print styles.

## New project direction

Printable RPG should become a data-driven printable publishing tool for RPG table material.

Primary output families:

- cards;
- character sheets;
- DM stackblocks and NPC sheets;
- random tables.

Cards are not required to follow the internal 5 mm grid. Character sheets, DM stackblocks, NPC blocks, and random tables should use the 5 mm grid internally.

The project should remain frontend-first until a backend/API is justified by persistence, shared libraries, accounts, collaboration, or server-side PDF rendering.

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

## Next recommended task

```text
foundation/template-print-pipeline-v1
```

Goal:

```text
JavaScript data objects -> template string with {{variables}} -> fixed-size card PrintBlocks -> A4 PrintDocument -> browser-rendered preview
```

Non-goals for the first implementation:

- no visual template editor;
- no overflow splitting;
- no character sheet generation;
- no PDF export;
- no backend/API.
