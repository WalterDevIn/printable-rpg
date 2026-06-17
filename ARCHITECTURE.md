# Architecture

Printable RPG should be organized as a frontend-first printable document generator.

The ideal architecture is not API versus frontend at this stage. The ideal split is:

```text
core engine / templates / data / print jobs / browser rendering
```

A backend API may be added later if persistence, shared libraries, accounts, or server-side PDF rendering become necessary.

## Main pipeline

```text
DataPack
  -> PrintJob
  -> Template
  -> TemplateContext
  -> PrintBlock[]
  -> PageComposer
  -> PrintDocument
  -> Browser Renderer
  -> window.print()
```

## Core concepts

### DataPack

A DataPack is structured content. It does not contain layout information.

Examples:

- spell list;
- character object;
- NPC list;
- random-table collection;
- item list;
- rules reference objects.

### Template

A Template is a reusable visual definition. It contains or references:

- manifest/configuration;
- HTML template;
- CSS template styles;
- optional theme tokens;
- declared input type;
- declared output behavior.

A template may use `{{variable}}` interpolation and limited declarative blocks.

### PrintJob

A PrintJob is a request to generate printable output from data and a template.

Examples:

- print these spells using the spell-card template;
- print this character using the character-sheet template in blank mode;
- print these NPCs using the stackable NPC block template;
- print these random tables as full A4 pages.

### PrintBlock

A PrintBlock is a physical printable piece produced by applying a template to data.

It has:

- width in mm;
- height in mm;
- rendered content;
- template family;
- stackability rules;
- overflow behavior;
- keep-together behavior.

### PageComposer

The PageComposer places PrintBlocks into A4 pages.

It must not know about spells, NPCs, D&D rules, or campaign data.

It only understands physical constraints:

- page size;
- margins;
- block width and height;
- gaps;
- stackability;
- safe page breaks;
- orientation rules.

### PrintDocument

A PrintDocument is the final abstract printable result.

It contains pages and positioned blocks, ready for browser rendering.

### Browser Renderer

The Browser Renderer converts a PrintDocument into DOM nodes and CSS suitable for preview and browser printing.

Browser-specific measurement and overflow detection belong here or in a browser adapter, not in the pure composer.

## Recommended source structure

```text
src/
  app/
    main.js
    createApp.js
    appState.js

  core/
    template/
      renderTemplate.js
      resolvePath.js
      evaluateCondition.js
      createTemplateContext.js

    print/
      createPrintJob.js
      createPrintBlocks.js
      composePages.js
      measureOverflow.js
      createPrintDocument.js

    layout/
      units.js
      pageSizes.js
      grid.js
      rectanglePacking.js

    document/
      printBlock.js
      printPage.js
      printDocument.js

  data/
    sampleSpells.js
    sampleCharacter.js
    sampleNpcs.js
    sampleTables.js

  templates/
    spellCard/
      manifest.js
      template.js
      styles.js

    flowCard/
      manifest.js
      template.js
      styles.js

    characterSheet/
      manifest.js
      template.js
      styles.js

    dmBlock/
      manifest.js
      template.js
      styles.js

    randomTable/
      manifest.js
      template.js
      styles.js

  printJobs/
    spellCardsJob.js
    characterSheetJob.js
    npcBlocksJob.js
    randomTablesJob.js

  render/
    renderPrintDocument.js
    renderPage.js
    renderBlock.js

  styles/
    app.css
    preview.css
    print.css
```

This structure is aspirational. Implementation should happen incrementally.

## Template output modes

Templates should declare one of these physical modes:

- `repeatable-fixed`: same-size repeatable blocks, such as standard cards;
- `repeatable-flow`: repeatable blocks that may continue text, tables, or procedures;
- `stackable`: variable-size table-facing blocks, such as NPCs or DM references;
- `full-page`: one page per rendered object;
- `multi-page-document`: one input object may generate several pages.

## Grid policy

The engine uses millimeters.

The 5 mm grid is a template-family rule, not a universal engine rule.

Cards may ignore the grid.

Character sheets, stackblocks, NPC blocks, and random tables should use the 5 mm grid internally.

## Browser-first rule

Do not add an API until the product needs one.

A frontend-first architecture is preferred because:

- the output is visual and print-oriented;
- overflow measurement depends on browser layout;
- local JavaScript/JSON data is enough for early use;
- no authentication or persistence is needed yet;
- browser print is the first output target.

The core should still be isolated enough to later move into a shared package if a backend is introduced.

## Dependency rule

Early development should avoid dependencies unless they solve a concrete problem.

A no-build, browser-native ESM approach is acceptable for the first foundation.

If template loading from `.html` or `.css` files becomes awkward under `file://`, templates may initially be JS modules exporting strings.

## Anti-patterns

Avoid:

- putting domain knowledge inside the page composer;
- putting DOM manipulation inside pure core modules;
- making templates execute arbitrary procedural DOM JavaScript;
- hardcoding spell-specific behavior into generic systems;
- treating the visual editor as the core product;
- adding backend API routes before the print pipeline exists.
