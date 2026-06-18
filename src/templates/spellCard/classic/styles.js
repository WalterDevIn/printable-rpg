export const classicSpellCardStyles = `
.spell-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3mm;
  padding: 4mm;
  border: 0.45mm solid var(--card-border);
  border-radius: 2mm;
  background: var(--card-surface);
  color: var(--card-ink);
  font-family: Georgia, serif;
}

.spell-card__header {
  border-bottom: 0.35mm solid var(--card-border);
  padding-bottom: 2mm;
}

.spell-card__eyebrow {
  margin: 0 0 1mm;
  color: var(--card-accent);
  font-size: 2.3mm;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.spell-card__title {
  margin: 0;
  font-size: 5mm;
  line-height: 1;
}

.spell-card__meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2mm;
  margin: 0;
  font-size: 2.55mm;
}

.spell-card__meta dt {
  color: var(--card-accent);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 2mm;
}

.spell-card__meta dd {
  margin: 0.5mm 0 0;
  line-height: 1.15;
}

.spell-card__description {
  margin: 0;
  font-size: 3mm;
  line-height: 1.25;
}
`;
