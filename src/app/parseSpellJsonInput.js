import { validateSpellInput } from "./validateSpellInput.js";

export function parseSpellJsonInput(rawValue) {
  let parsedValue;

  try {
    parsedValue = JSON.parse(rawValue);
  } catch (error) {
    throw new Error(`JSON inválido: ${error.message}`);
  }

  return validateSpellInput(parsedValue);
}
