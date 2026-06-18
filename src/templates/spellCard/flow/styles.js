export const flowSpellCardStyles = `
.spell-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2mm;
  padding: 3.2mm;
  border: 0.45mm solid var(--card-border);
  border-radius: 2mm;
  background: var(--card-surface);
  color: var(--card-ink);
  font-family: Georgia, serif;
}

.spell-card__header {
  flex: 0 0 auto;
  border-bottom: 0.35mm solid var(--card-border);
  padding-bottom: 1.4mm;
}

.spell-card__eyebrow {
  margin: 0 0 0.7mm;
  color: var(--card-accent);
  font-size: 1.95mm;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.spell-card__title {
  margin: 0;
  font-size: 4.35mm;
  line-height: 1;
}

.spell-card__meta {
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2mm 2mm;
  margin: 0;
  padding-bottom: 1.6mm;
  border-bottom: 0.25mm solid var(--card-border);
  font-size: 2.15mm;
}

.spell-card__meta dt {
  color: var(--card-accent);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.75mm;
}

.spell-card__meta dd {
  margin: 0.3mm 0 0;
  line-height: 1.1;
}

.spell-card__flow-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
}

.spell-card__description {
  margin: 0;
  font-size: 2.75mm;
  line-height: 1.18;
}
`;
