export const spellCardTemplate = `
  <article class="spell-card">
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

    <p class="spell-card__description">{{description}}</p>
  </article>
`;
