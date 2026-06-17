# Printable RPG Vision

Printable RPG is a frontend-first tool for generating printable tabletop RPG material from structured data and reusable physical templates.

The project is not primarily a manual A4 editor. The long-term product is a printable publishing pipeline:

```text
DataPack -> Template -> PrintBlock -> PageComposer -> PrintDocument -> Browser Print
```

The current visual editor is useful as a prototype for A4 measurement, grid handling, block placement, and print styling. It is not the architectural center of the project.

## Product identity

Printable RPG compiles structured RPG content into physical table material.

It should support:

- spell, item, condition, feature, and rule cards;
- character sheets generated only with the sections a character needs;
- DM stackblocks, generic NPCs, specific NPCs, and reference blocks;
- random-table pages and stackable table blocks for solo or table play.

The primary design goal is low-friction printing. The system should reduce wasted paper where possible, while preserving readable physical layouts.

## Core principle

Data must not know about layout.

Templates must not know about the whole document unless they are explicitly document templates.

The page composer must not know about D&D, spells, NPCs, tables, or campaign content.

The browser renderer must not own the data model.

## Template families

### Cards

Cards are small repeatable templates. They are stackable on A4 pages to reduce printing cost.

Cards are not required to follow the internal 5 mm grid standard. Existing card designs may use their own proportions and internal spacing.

Two card models are expected:

- fixed cards: entity cards with metadata, such as spell name, school, level, casting time, range, and description;
- flow cards: continuation-friendly cards without heavy metadata, used for long descriptions, procedures, rules, or tables that may continue naturally across multiple cards.

Cards may use color tokens based on semantic data, such as spell school, item rarity, faction, danger, or creature type.

### Character sheets

Character sheets are full-page or multipage documents.

They use the 5 mm grid standard internally.

The sheet should generate only the sections needed by the character. A fighter should not print dead spell sections. A caster should print spell sections. A character with long traits or background can generate additional pages.

A blank personalized sheet is the same generated sheet with data ink hidden, not a separate layout.

### DM stackblocks and NPC sheets

DM material is stackable and table-facing.

This includes:

- stackblocks;
- generic NPCs;
- specific NPCs;
- compact rules references;
- encounter notes.

These templates should follow the 5 mm grid standard internally. They should print sequentially and compactly.

### Random tables

Random tables may be full-page documents or stackable blocks.

They follow the 5 mm grid standard internally.

Long tables should be allowed to break by safe units, such as rows, not arbitrary visual clipping.

## Physical standards

The engine works in millimeters.

A4 portrait is the default page target: 210 mm x 297 mm.

The 5 mm grid is a template-family convention, not a universal engine constraint.

- Cards: millimeter-based, grid optional.
- Character sheets: 5 mm grid.
- DM stackblocks and NPCs: 5 mm grid.
- Random tables: 5 mm grid.

A 2.5 mm half-grid may be used for lines, separators, or fine placement when declared by the template family.

## Non-goals for the first foundation

The first foundation should not implement everything.

Do not start with:

- a backend API;
- user accounts;
- database persistence;
- a complex visual template editor;
- PDF generation on the server;
- perfect overflow handling;
- full character-sheet generation.

The first useful slice is:

```text
JavaScript data objects -> card template -> repeatable print blocks -> A4 pages -> browser print
```

## Long-term direction

The app should remain frontend-first until a backend is justified by concrete needs such as shared template libraries, persistent user projects, authenticated storage, or server-side PDF rendering.

The core engine should be written as a browser-independent module where practical, with browser-specific adapters only for DOM rendering, measurement, preview, and printing.
