# Template Specification

This document defines the first intended contract for Printable RPG templates.

The specification is deliberately small. It should support the first pipeline without becoming a full programming language.

## Template parts

A template is composed of:

- `manifest`: physical and behavioral metadata;
- `template`: HTML string with placeholders;
- `styles`: CSS string scoped by convention to the template root;
- optional `themeTokens`: semantic visual tokens.

Early implementation may store these as JavaScript modules exporting strings and objects.

Example structure:

```text
src/templates/spellCard/
  manifest.js
  template.js
  styles.js
```

## Manifest

The manifest is the authoritative contract of a template.

Example:

```js
export const manifest = {
  id: "spellCard",
  family: "card",
  input: "Spell",
  mode: "repeatable-fixed",

  size: {
    widthMm: 100,
    heightMm: 140,
  },

  layout: {
    unit: "mm",
    gridMm: null,
  },

  pagination: {
    stackable: true,
    composer: "grid-pack",
    allowRotate: false,
  },

  overflow: {
    strategy: "clip",
  },
};
```

## Template modes

### repeatable-fixed

Used for fixed-size repeated pieces.

Examples:

- spell cards;
- item cards;
- condition cards;
- feature cards.

### repeatable-flow

Used for repeated pieces that may continue content across several physical blocks.

Examples:

- long rules;
- long descriptions;
- procedure cards;
- card-based tables.

### stackable

Used for variable-size table-facing blocks that are printed sequentially and compactly.

Examples:

- NPC blocks;
- DM stackblocks;
- compact encounter blocks;
- rules references.

### full-page

Used when one rendered object owns one whole A4 page.

Examples:

- a full random-table page;
- a map sheet;
- a single reference sheet.

### multi-page-document

Used when one input object may produce several pages.

Examples:

- character sheet;
- campaign dossier;
- generated adventure packet.

## Placeholder syntax

Initial placeholder syntax:

```html
<h1>{{name}}</h1>
<p>{{level}} · {{school}}</p>
<p>{{description}}</p>
```

Supported in the first version:

- direct properties: `{{name}}`;
- nested properties: `{{stats.strength}}`;
- missing values render as an empty string.

Reserved for later:

- `{{#if condition}}...{{/if}}`;
- `{{#each list}}...{{/each}}`;
- formatting helpers;
- fallback values.

Do not start with a complex expression language.

## Conditions

Template conditions should be declarative and limited.

Examples:

```js
{ id: "spells", showIf: "spells.length > 0" }
```

Conditions are used for:

- optional sections;
- optional badges;
- optional pages;
- optional continuation blocks.

Conditions should not mutate data or layout.

## Theme tokens

Templates may map semantic values to visual tokens.

The engine should not hardcode spell-school colors.

Example concept:

```js
export const themeTokens = {
  "school.abjuration": "#4f7cff",
  "school.evocation": "#d84a35",
  "school.illusion": "#7b5bd6",
};
```

A template can request a color token based on input data.

The same mechanism should later support rarity, faction, terrain, danger level, creature type, or table category.

## Grid policy

Templates declare whether they use an internal grid.

Cards may use:

```js
layout: { unit: "mm", gridMm: null }
```

Character sheets, stackblocks, NPCs, and random tables should use:

```js
layout: { unit: "mm", gridMm: 5 }
```

The core engine still works in millimeters in both cases.

## Overflow policy

Overflow handling is part of template behavior.

Initial strategies:

- `clip`: render and hide overflow;
- `fail`: report overflow but do not solve it;
- `shrink`: reduce text size down to a declared minimum;
- `continuation-card`: create an additional block with remaining content;
- `blank-extra`: create a blank continuation block for manual writing.

The first implementation may only support `clip`.

Do not hardcode overflow behavior by domain. A spell description, rule paragraph, table, or NPC note should all use the same declared mechanisms.

## Breakable content

Not all content can break safely.

Potential future break units:

- paragraph;
- table row;
- list item;
- sentence;
- line.

Examples:

```js
overflow: {
  strategy: "continuation-card",
  breakBy: "paragraph",
  sourceField: "description",
}
```

```js
overflow: {
  strategy: "continuation-card",
  breakBy: "row",
  sourceField: "rows",
}
```

## Blank output mode

Some document templates, especially character sheets, should support blank personalized output.

Blank mode means:

- layout is generated normally;
- titles, labels, boxes, lines, and section structure remain visible;
- data values are hidden or rendered in transparent/white ink;
- sections still reflect the character's structure.

A blank personalized sheet is not a different template.

## Template safety rule

Templates should remain declarative as long as possible.

Avoid arbitrary procedural JavaScript that mutates DOM structure after render. It makes pagination, measurement, and testing harder.

If behavior hooks are introduced later, they should be explicit, constrained, and documented.
