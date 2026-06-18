export const flowSpellCardTemplate = `
  <article
    class="spell-card spell-card--flow"
    style="--card-accent: {{theme.accent}}; --card-surface: {{theme.surface}}; --card-border: {{theme.border}}; --card-ink: {{theme.ink}};"
  >
    <header class="spell-card__header">
      <p class="spell-card__eyebrow">{{level}} · {{school}}</p>
      <h2 class="spell-card__title">{{name}}</h2>
    </header>

    <dl class="spell-card__meta">
      <div>
        <dt>Tiempo</dt>
        <dd>{{castingTime}}</dd>
      </div>
      <div>
        <dt>Alcance</dt>
        <dd>{{range}}</dd>
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

    <section class="spell-card__flow-body" data-flow-region="description">
      <p class="spell-card__description">{{description}}</p>
    </section>
  </article>
`;
