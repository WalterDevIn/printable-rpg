import { defaultSpellCardTheme, spellSchoolThemeTokens } from "./themeTokens.js";

const SCHOOL_DISPLAY = {
  abjuration: {
    key: "abjuracion",
    label: "Abjuración",
  },
  conjuration: {
    key: "conjuracion",
    label: "Conjuración",
  },
  divination: {
    key: "adivinacion",
    label: "Adivinación",
  },
  enchantment: {
    key: "encantamiento",
    label: "Encantamiento",
  },
  evocation: {
    key: "evocacion",
    label: "Evocación",
  },
  illusion: {
    key: "ilusion",
    label: "Ilusión",
  },
  necromancy: {
    key: "nigromancia",
    label: "Nigromancia",
  },
  transmutation: {
    key: "transmutacion",
    label: "Transmutación",
  },
};

function normalizeSchoolName(school) {
  return String(school ?? "")
    .trim()
    .toLowerCase();
}

function createLevelBadge(level) {
  const normalized = String(level ?? "").trim().toLowerCase();

  if (normalized === "cantrip") {
    return "0";
  }

  const match = normalized.match(/\d+/);
  return match ? match[0] : normalized.slice(0, 2).toUpperCase();
}

export function resolveSpellCardTheme(spell) {
  const schoolKey = normalizeSchoolName(spell.school);
  return spellSchoolThemeTokens[schoolKey] ?? defaultSpellCardTheme;
}

export function createSpellCardTemplateContext(spell) {
  const schoolKey = normalizeSchoolName(spell.school);
  const schoolDisplay = SCHOOL_DISPLAY[schoolKey] ?? {
    key: schoolKey || "unknown",
    label: spell.school ?? "Escuela",
  };

  return {
    ...spell,
    schoolKey: schoolDisplay.key,
    schoolLabel: schoolDisplay.label,
    levelBadge: createLevelBadge(spell.level),
    printPageLabel: "1/1",
    theme: resolveSpellCardTheme(spell),
  };
}
