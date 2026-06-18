import { createJsonInputView } from "./createJsonInputView.js";
import { formatJson } from "./formatInspectorValue.js";

export function createDataView(options) {
  const { initialSpells, onApply, onReset } = options;

  return createJsonInputView({
    initialValue: formatJson(initialSpells),
    onApply,
    onReset,
  });
}
