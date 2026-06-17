export function resolvePath(source, path) {
  if (!source || !path) return "";

  return path.split(".").reduce((current, key) => {
    if (current == null) return "";
    return current[key];
  }, source) ?? "";
}
