export const compactSpellCardTemplate = `
  <article
    class="spell-card spell-card--compact"
    style="--card-accent: {{theme.accent}}; --card-surface: {{theme.surface}}; --card-border: {{theme.border}}; --card-ink: {{theme.ink}};"
  >
    <header class="spell-card__header">
      <div>
        <p class="spell-card__eyebrow">{{level}} · {{school}}</p>
        <h2 class="spell-card__title">{{name}}</h2>
      </div>
      <p class="spell-card__badge">{{range}}</p>
    </header>

    <dl class="spell-card__meta">
      <div>
        <dt>Tiempo</dt>
        <dd>{{castingTime}}</dd>
      </div>
      <div>
        <dt>Componentes</dt>
        <dd>{{components}}</dd>
      </div>
      <div>
        <dt>Duración</dt>
        <dd>{{duration}}</dd>
      </div>
    </dl>

    <p class="spell-card__description">{{description}}</p>
  </article>
`;
