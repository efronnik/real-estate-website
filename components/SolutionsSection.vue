<script setup lang="ts">
const items = [
  {
    title: "Strategia ceny i wejścia na rynek",
    text: "Ustalamy strategię ceny dla Twojego mieszkania. Budujemy plan rozmów i margines negocjacyjny, który broni Twojego wyniku.",
    className: "large",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Wizualne przygotowanie mieszkania",
    text: "Home staging, kadry i narracja, która pomaga klientowi szybciej podjąć decyzję i skrócić czas sprzedaży.",
    className: "tall",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Leady i prezentacje premium",
    text: "Kwalifikuję zapytania i prowadzę prezentacje tak, aby wzmacniać pozycję właściciela, a nie schodzić z ceny.",
    className: "wide",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Negocjacje + bezpieczny final",
    text: "Prowadzę rozmowy i dokumenty do momentu podpisu. Transparentnie i bez chaosu po stronie właściciela.",
    className: "small",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80"
  }
];
</script>

<template>
  <section id="jak-pomagam" class="section help">
    <div class="container">
      <header class="reveal top">
        <p class="eyebrow">Jak pomagam</p>
        <h2 class="section-title sweep-reveal">Asymetryczny system działań, który skraca czas sprzedaży</h2>
        <a href="#kontakt" class="link-arrow">Umów konsultację</a>
      </header>

      <div class="mosaic">
        <article
          v-for="(item, idx) in items"
          :key="item.title"
          class="tile reveal"
          :class="[item.className, `delay-${Math.min(idx, 3)}`]"
          :style="{ '--bg': `url(${item.image})` }"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.help {
  z-index: 1;
}

.top {
  display: grid;
  gap: 1rem;
}

.top :deep(.section-title) {
  line-height: 1.02;
  padding-bottom: 0.08em;
}

.mosaic {
  margin-top: 2.4rem;
  display: flex;
  gap: 0.8rem;
  align-items: stretch;
}

.tile {
  position: relative;
  overflow: hidden;
  border-radius: 0.35rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.55rem;
  min-height: 24.5rem;
  flex: 1 1 0;
  transition: flex 0.62s cubic-bezier(0.16, 1, 0.3, 1), transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.42s ease, border-color 0.42s ease, filter 0.42s ease;
  background-image: var(--bg);
  background-size: cover;
  background-position: center;
  will-change: transform, flex, filter;
}

.tile::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(170deg, rgba(22, 22, 22, 0.25), rgba(14, 14, 14, 0.72));
  transition: background 0.45s ease, opacity 0.45s ease;
}

.tile > * {
  position: relative;
  z-index: 1;
}

.tile:hover {
  transform: translateY(-4px);
  filter: saturate(1.1);
  border-color: rgba(186, 152, 89, 0.62);
  box-shadow: 0 24px 40px rgba(0, 0, 0, 0.22);
}

.tile:hover::before {
  background: linear-gradient(170deg, rgba(22, 22, 22, 0.2), rgba(14, 14, 14, 0.55));
}

.mosaic:hover .tile {
  flex: 0.95 1 0;
}

.mosaic:hover .tile:hover {
  flex: 1.85 1 0;
}

.tile h3 {
  margin-top: 1rem;
  font-size: 1.34rem;
  line-height: 1.1;
  max-width: 16ch;
  color: #f8f3ea;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.42s ease, transform 0.42s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0s;
}

.tile p {
  margin-top: 0.8rem;
  color: rgba(250, 246, 239, 0.84);
  font-size: 0.96rem;
  max-width: 34ch;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.46s ease, transform 0.46s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0s;
}

.large,
.tall,
.wide,
.small {
  min-height: 24.5rem;
}

.small::before {
  background: linear-gradient(170deg, rgba(17, 17, 17, 0.2), rgba(28, 25, 19, 0.82));
}

.tile:hover h3,
.tile:hover p {
  opacity: 1;
  transform: translateY(0);
}

.tile:hover h3 {
  transition-delay: 0.38s;
}

.tile:hover p {
  transition-delay: 0.46s;
}

@media (max-width: 980px) {
  .mosaic {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .tile,
  .large,
  .tall,
  .wide,
  .small {
    flex: initial;
    min-height: 16rem;
  }

  .mosaic:hover .tile,
  .mosaic:hover .tile:hover {
    flex: initial;
  }
}

@media (max-width: 700px) {
  .mosaic {
    grid-template-columns: 1fr;
  }

  .large,
  .tall,
  .wide,
  .small {
    min-height: 14rem;
  }
}

@media (hover: none) {
  .tile h3,
  .tile p {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
