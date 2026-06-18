function assertPositiveNumber(value, message) {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    throw new Error(message);
  }
}

export function assertTemplateManifest(manifest) {
  if (!manifest || typeof manifest !== "object") {
    throw new Error("Template manifest must be an object.");
  }

  if (!manifest.id) {
    throw new Error("Template manifest requires an id.");
  }

  if (!manifest.mode) {
    throw new Error(`Template manifest ${manifest.id} requires a mode.`);
  }

  if (!manifest.pagination?.composer) {
    throw new Error(`Template manifest ${manifest.id} requires pagination.composer.`);
  }

  if (manifest.mode === "repeatable-fixed") {
    assertPositiveNumber(
      manifest.size?.widthMm,
      `Template manifest ${manifest.id} requires a positive size.widthMm.`,
    );
    assertPositiveNumber(
      manifest.size?.heightMm,
      `Template manifest ${manifest.id} requires a positive size.heightMm.`,
    );
  }
}
