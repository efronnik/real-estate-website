<template>
  <section id="o-mnie" class="section about">
    <div class="container">
      <div class="about-head reveal">
        <p class="eyebrow">O mnie</p>
        <h2 class="section-title">Pomagam sprzedawać nieruchomości spokojnie, strategicznie i z dobrym wynikiem</h2>
      </div>

      <div class="about-layout">
        <article class="about-bio surface reveal delay-1">
          <p>
            Nazywam się [Twoje imię]. Od lat wspieram właścicieli nieruchomości w przeprowadzeniu całego procesu
            sprzedaży - od pierwszej diagnozy, przez przygotowanie oferty, po finalne podpisanie dokumentów.
          </p>
          <p>
            Łączę analizę rynku, estetykę prezentacji i konkretne negocjacje. Dzięki temu sprzedaż jest poukładana,
            przewidywalna i mniej stresująca dla właściciela.
          </p>
        </article>

        <div class="about-points">
          <article class="point surface reveal delay-1">
            <h3>Strategia zamiast chaosu</h3>
            <p>Kazda nieruchomosc otrzymuje indywidualny plan wejscia na rynek.</p>
          </article>
          <article class="point surface reveal delay-2">
            <h3>Silna prezentacja oferty</h3>
            <p>Dbam o materiały i narrację, które budują realną wartość w oczach kupującego.</p>
          </article>
          <article class="point surface reveal delay-3">
            <h3>Negocjacje i finalizacja</h3>
            <p>Prowadzę rozmowy i formalności tak, aby zabezpieczyć Twój interes do końca procesu.</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.12));
}

.about-head {
  display: grid;
  gap: 0.9rem;
}

.about-head :deep(.section-title) {
  max-width: 18ch;
}

.about-layout {
  margin-top: 1.8rem;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 1rem;
  align-items: start;
}

.about-bio {
  padding: 1.2rem;
  display: grid;
  gap: 0.9rem;
}

.about-bio p {
  color: var(--muted);
  font-size: 1.02rem;
}

.about-points {
  display: grid;
  gap: 0.8rem;
}

.point {
  padding: 1rem;
}

.point h3 {
  font-size: 1.22rem;
  line-height: 1.08;
}

.point p {
  margin-top: 0.5rem;
  color: var(--muted);
}

@media (max-width: 900px) {
  .about-layout {
    grid-template-columns: 1fr;
  }
}
</style>
