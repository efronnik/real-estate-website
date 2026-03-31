<script setup lang="ts">
const steps = [
  {
    label: "01",
    title: "Diagnoza i pozycjonowanie",
    text: "Szybka diagnoza sytuacji mieszkania i rynku. Ustalamy plan, ktory daje realna przewage wlascicielowi.",
    hero: "Diagnoza",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80"
  },
  {
    label: "02",
    title: "Przygotowanie i publikacja",
    text: "Materialy premium i narracja, ktora pokazuje wartosc mieszkania oraz prowadzi klienta do decyzji.",
    hero: "Ekspozycja",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
  },
  {
    label: "03",
    title: "Pokazy i negocjacje",
    text: "Prowadze rozmowy i zarzadzam dynamika tak, aby bronic ceny i domykac transakcje.",
    hero: "Negocjacje",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80"
  },
  {
    label: "04",
    title: "Final i przekazanie",
    text: "Domykamy formalnosci, terminy i podpis. Bez chaosu i bez ryzyka utraty kontroli.",
    hero: "Finalizacja",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80"
  }
];
</script>

<template>
  <section class="section process">
    <div class="container">
      <header class="process-head reveal">
        <p class="eyebrow">Proces pracy</p>
        <h2 class="section-title">Jak prowadzimy sprzedaz od strategii do podpisu</h2>
      </header>

      <div class="service-board reveal delay-1">
        <article
          v-for="step in steps"
          :key="step.title"
          class="service-row"
          :style="{ '--bg': `url(${step.image})` }"
        >
          <div class="service-info">
            <p class="idx">{{ step.label }}</p>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>
          <div class="service-word">
            <span>{{ step.hero }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process {
  background: #0d0f11;
  color: #f7f2e8;
}

.process-head {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1.4rem;
}

.process-head :deep(.section-title),
.process-head :deep(.section-copy),
.process-head :deep(.eyebrow) {
  color: #f7f2e8;
}

.service-board {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.service-row {
  position: relative;
  display: grid;
  grid-template-columns: minmax(240px, 36%) 1fr;
  align-items: stretch;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  min-height: clamp(8.2rem, 14vw, 12rem);
}

.service-row:first-child {
  border-top: 0;
}

.service-row::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(160deg, rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.58)),
    var(--bg);
  background-size: cover;
  background-position: center;
  opacity: 1;
  transform: translateY(100%);
  transition: transform 0.72s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
}

.service-info {
  padding: 1.2rem 1rem;
  background: transparent;
  position: relative;
  z-index: 2;
}

.idx {
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #f1f1f1;
  font-weight: 700;
  display: inline-grid;
  place-items: center;
  width: 1.35rem;
  height: 1.35rem;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 999px;
}

.service-info h3 {
  margin-top: 0.82rem;
  font-size: 1.12rem;
  line-height: 1.17;
  color: #f6f2e8;
}

.service-info p:last-child {
  margin-top: 0.52rem;
  color: rgba(247, 242, 232, 0.86);
  font-size: 0.95rem;
}

.service-word {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem clamp(1rem, 2vw, 1.8rem);
  font-size: clamp(2.35rem, 7vw, 6.6rem);
  line-height: 0.95;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: rgba(255, 255, 255, 0.96);
  background: transparent;
  z-index: 2;
}

.service-word::after {
  content: "";
  position: absolute;
  inset: 0;
  background: #0d0f11;
  transform: translateY(0);
  transition: transform 0.72s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
}

.service-word > * {
  position: relative;
  z-index: 2;
}

.service-word > span:first-child {
  display: inline-block;
  position: relative;
}

.service-word > span:first-child::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.2em;
  height: 0.022em;
  background: rgba(255, 255, 255, 0.95);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.54s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
}

.service-row:hover .service-word::after {
  transform: translateY(-102%);
}

.service-row:hover::before {
  transform: translateY(0);
}

.service-row:hover .service-word > span:first-child::after {
  transform: scaleX(1);
}

@media (max-width: 1000px) {
  .service-row {
    grid-template-columns: 1fr;
  }

  .service-word {
    font-size: clamp(2.2rem, 9.2vw, 4.4rem);
  }
}
</style>
