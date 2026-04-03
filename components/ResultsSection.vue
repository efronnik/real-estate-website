<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const activeIndex = ref(0);
const cardRefs = ref<HTMLElement[]>([]);

const results = [
  {
    title: "Sprzedaż po 2 miesiącach ciszy",
    desc: "Problem: oferta bez zapytań. Działanie: nowa strategia wejścia i materiały premium. Efekt: finalizacja w 3 tygodnie.",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    title: "Negocjacje bez dużej obniżki",
    desc: "Problem: presja kupujących na szybkie zejście z ceny. Działanie: scenariusz rozmów i jasne punkty obrony ceny. Efekt: utrzymana cena na satysfakcjonującym poziomie.",
    image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    title: "Więcej jakościowych zapytań",
    desc: "Problem: słaba prezentacja mieszkania. Działanie: profesjonalna sesja i dopracowany opis oferty. Efekt: lepszy profil kupujących.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1800"
  }
];

let rafId = 0;

const updateActive = () => {
  if (!import.meta.client || cardRefs.value.length === 0) return;
  const viewportCenter = window.innerHeight * 0.45;
  let closest = 0;
  let minDistance = Number.POSITIVE_INFINITY;
  cardRefs.value.forEach((el, idx) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height * 0.5;
    const distance = Math.abs(center - viewportCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closest = idx;
    }
  });
  activeIndex.value = closest;
};

const onScroll = () => {
  if (rafId) return;
  rafId = window.requestAnimationFrame(() => {
    updateActive();
    rafId = 0;
  });
};

onMounted(() => {
  updateActive();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  if (rafId) window.cancelAnimationFrame(rafId);
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
});

const setCardRef = (el: Element | null, idx: number) => {
  if (!el) return;
  cardRefs.value[idx] = el as HTMLElement;
};
</script>

<template>
  <section class="section results">
    <div class="container results-layout">
      <div class="results-visuals">
        <article
          v-for="(item, idx) in results"
          :key="item.title"
          :ref="el => setCardRef(el, idx)"
          class="result-card"
          :class="{ active: idx === activeIndex }"
        >
          <img :src="item.image" :alt="item.title" />
        </article>
      </div>

      <aside class="results-copy">
        <p class="eyebrow">Rezultaty</p>
        <h2 class="results-title">Przykłady efektów współpracy</h2>
        <div class="results-progress">{{ activeIndex + 1 }} / {{ results.length }}</div>
        <p class="results-lead">{{ results[activeIndex]?.title }}</p>
        <p class="results-desc">{{ results[activeIndex]?.desc }}</p>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.results {
  background: #eeeae3;
}

.results-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
  gap: 2rem;
  align-items: start;
}

.results-visuals {
  display: grid;
  gap: 1.2rem;
}

.result-card {
  border: 1px solid rgba(19, 19, 19, 0.12);
  background: rgba(255, 255, 255, 0.5);
  overflow: hidden;
  transform: scale(0.985);
  opacity: 0.72;
  transition: transform 0.45s ease, opacity 0.45s ease, border-color 0.45s ease;
}

.result-card.active {
  transform: scale(1);
  opacity: 1;
  border-color: rgba(19, 19, 19, 0.26);
}

.result-card img {
  width: 100%;
  height: clamp(260px, 40vw, 430px);
  display: block;
  object-fit: cover;
}

.results-copy {
  position: sticky;
  top: 120px;
  padding-left: 1.2rem;
  border-left: 1px solid rgba(20, 20, 20, 0.15);
}

.results-title {
  margin-top: 0.7rem;
  font-size: clamp(2.1rem, 4.8vw, 4rem);
  line-height: 0.94;
  letter-spacing: -0.03em;
  font-weight: 500;
}

.results-progress {
  margin-top: 2.3rem;
  font-size: 0.76rem;
  letter-spacing: 0.2em;
  color: rgba(19, 19, 19, 0.48);
}

.results-lead {
  margin-top: 0.9rem;
  font-size: clamp(1.3rem, 2.6vw, 2rem);
  line-height: 1.02;
}

.results-desc {
  margin-top: 0.85rem;
  color: rgba(19, 19, 19, 0.62);
  max-width: 30ch;
}

@media (max-width: 900px) {
  .results-layout {
    grid-template-columns: 1fr;
    gap: 1.1rem;
  }

  .results-copy {
    position: static;
    top: auto;
    border-left: 0;
    padding-left: 0;
  }

  .results-progress {
    margin-top: 1.2rem;
  }
}
</style>
