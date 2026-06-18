export const ornateFlowSpellCardTemplate = `
  <article
    class="spell spell--ornate spell--ornate-flow"
    data-school="{{schoolKey}}"
    style="--primary: {{theme.primary}}; --secondary: {{theme.secondary}};"
  >
    <aside class="spell__sidebar">
      <div class="spell__sidebar-cutout" aria-hidden="true"></div>

      <div class="spell__school" aria-label="Escuela de magia">
        <span class="spell__school-text">{{schoolLabel}}</span>
      </div>
    </aside>

    <section class="spell__card">
      <div class="spell__content">
        <header class="spell__header">
          <h1 class="spell__title">{{name}}</h1>
        </header>

        <section class="spell__caption" aria-label="Descripción" data-flow-region="description">
          <p class="spell__p"><span class="spell__tab"></span>{{description}}</p>
        </section>
      </div>
    </section>

    <div class="spell__floating" aria-hidden="true">
      <div class="spell__level">{{levelBadge}}</div>

      <div class="spell__corner spell__corner--a"></div>
      <div class="spell__corner spell__corner--b"></div>

      <div class="spell__pages">{{printPageLabel}}</div>

      <div class="spell__corner spell__corner--c"></div>
      <div class="spell__corner spell__corner--d"></div>
    </div>
  </article>
`;
