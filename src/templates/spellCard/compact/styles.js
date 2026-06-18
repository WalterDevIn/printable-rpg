export const compactSpellCardStyles = `
.spell-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.2mm;
  padding: 3.2mm;
  border: 0.45mm solid var(--card-border);
  border-radius: 2mm;
  background: var(--card-surface);
  color: var(--card-ink);
  font-family: Georgia, serif;
}

.spell-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2mm;
  border-bottom: 0.35mm solid var(--card-border);
  padding-bottom: 1.6mm;
}

.spell-card__eyebrow {
  margin: 0 0 0.8mm;
  color: var(--card-accent);
  font-size: 2mm;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.spell-card__title {
  margin: 0;
  font-size: 4.25mm;
  line-height: 1;
}

.spell-card__badge {
  flex: 0 0 auto;
  max-width: 19mm;
  margin: 0;
  padding: 0.8mm 1mm;
  border: 0.25mm solid var(--card-accent);
  border-radius: 1.2mm;
  color: var(--card-accent);
  font-size: 1.85mm;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
}

.spell-card__meta {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2mm;
  margin: 0;
  font-size: 2.35mm;
}

.spell-card__meta div {
  display: grid;
  grid-template-columns: 18mm 1fr;
  gap: 1.2mm;
}

.spell-card__meta dt {
  color: var(--card-accent);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.9mm;
}

.spell-card__meta dd {
  margin: 0;
  line-height: 1.12;
}

.spell-card__description {
  margin: 0;
  font-size: 2.75mm;
  line-height: 1.2;
}
`;
