export const ornateSpellCardTemplate = `
  <article
    class="spell spell--ornate"
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

        <section class="spell__stats" aria-label="Estadísticas del conjuro">
          <div class="spell__stats-row">
            <div class="spell__stat">
              <span class="spell__icon" aria-hidden="true">◷</span>
              <span>{{castingTime}}</span>
            </div>
            <div class="spell__stat">
              <span class="spell__icon" aria-hidden="true">➜</span>
              <span>{{range}}</span>
            </div>
          </div>

          <div class="spell__stats-row">
            <div class="spell__stat">
              <span class="spell__icon" aria-hidden="true">✦</span>
              <span>{{components}}</span>
            </div>
            <div class="spell__stat">
              <span class="spell__icon" aria-hidden="true">⌛</span>
              <span>{{duration}}</span>
            </div>
          </div>
        </section>

        <section class="spell__details" aria-label="Detalles">
          <div class="spell__detail spell__detail--materials">
            <span class="spell__icon" aria-hidden="true">✦</span>
            <p class="spell__material-text">Componentes: {{components}}</p>
          </div>
        </section>

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
