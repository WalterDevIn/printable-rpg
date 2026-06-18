const REQUIRED_SPELL_FIELDS = [
  "name",
  "level",
  "school",
  "castingTime",
  "range",
  "components",
  "duration",
  "description",
];

function normalizeSpell(spell, index) {
  if (!spell || typeof spell !== "object" || Array.isArray(spell)) {
    throw new Error(`El conjuro #${index + 1} debe ser un objeto.`);
  }

  const normalizedSpell = {};

  REQUIRED_SPELL_FIELDS.forEach((field) => {
    const value = String(spell[field] ?? "").trim();

    if (!value) {
      throw new Error(`El conjuro #${index + 1} no tiene "${field}".`);
    }

    normalizedSpell[field] = value;
  });

  return {
    ...spell,
    ...normalizedSpell,
  };
}

export function validateSpellInput(value) {
  if (!Array.isArray(value)) {
    throw new Error("El input debe ser un arreglo JSON de conjuros.");
  }

  if (value.length === 0) {
    throw new Error("El arreglo de conjuros no puede estar vacío.");
  }

  return value.map(normalizeSpell);
}
