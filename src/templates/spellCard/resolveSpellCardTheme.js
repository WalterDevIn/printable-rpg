import { defaultSpellCardTheme, spellSchoolThemeTokens } from "./themeTokens.js";

function normalizeSchoolName(school) {
  return String(school ?? "")
    .trim()
    .toLowerCase();
}

export function resolveSpellCardTheme(spell) {
  const schoolKey = normalizeSchoolName(spell.school);
  return spellSchoolThemeTokens[schoolKey] ?? defaultSpellCardTheme;
}

export function createSpellCardTemplateContext(spell) {
  return {
    ...spell,
    theme: resolveSpellCardTheme(spell),
  };
}
