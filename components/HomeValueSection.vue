<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const activeIndex = ref(0);
const cardRefs = ref<HTMLElement[]>([]);

const steps = [
  {
    title: "Lepsza cena sprzedaży",
    desc: "Lepsze pozycjonowanie oferty i spokojne negocjacje, które pomagają utrzymać mocną cenę.",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    title: "Krótszy czas na rynku",
    desc: "Precyzyjna selekcja zapytań i mocna prezentacja nieruchomości.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    title: "Spokój i kontrola procesu",
    desc: "Jasne etapy współpracy i domknięcie formalności bez chaosu.",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    title: "Finalizacja z wynikiem",
    desc: "Negocjacje prowadzone tak, by bronić ceny i interesu właściciela.",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1800"
  }
];

let rafId = 0;

const updateActiveStep = () => {
  if (!import.meta.client || cardRefs.value.length === 0) return;

  const viewportCenter = window.innerHeight * 0.45;
  let nextIndex = 0;
  let minDistance = Number.POSITIVE_INFINITY;

  cardRefs.value.forEach((el, idx) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cardCenter = rect.top + rect.height * 0.5;
    const distance = Math.abs(cardCenter - viewportCenter);
    if (distance < minDistance) {
      minDistance = distance;
      nextIndex = idx;
    }
  });

  activeIndex.value = nextIndex;
};

const onScroll = () => {
  if (rafId) return;
  rafId = window.requestAnimationFrame(() => {
    updateActiveStep();
    rafId = 0;
  });
};

onMounted(() => {
  updateActiveStep();
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
  <section class="section value">
    <div class="container value-layout">
      <aside class="value-copy">
        <p class="eyebrow">Co zyskujesz</p>
        <h2 class="value-title">Kluczowe korzyści współpracy</h2>
        <div class="value-progress">{{ activeIndex + 1 }} / {{ steps.length }}</div>
        <p class="value-lead">{{ steps[activeIndex]?.title }}</p>
        <p class="value-desc">{{ steps[activeIndex]?.desc }}</p>
      </aside>

      <div class="value-visuals">
        <article
          v-for="(step, idx) in steps"
          :key="step.title"
          :ref="el => setCardRef(el, idx)"
          class="visual-card"
          :data-idx="idx"
          :class="{ active: idx === activeIndex }"
        >
          <img :src="step.image" :alt="step.title" />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.value {
  background: #efece6;
}

.value-layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.15fr);
  gap: 2rem;
  align-items: start;
}

.value-copy {
  position: sticky;
  top: 120px;
  padding-right: 1.2rem;
  border-right: 1px solid rgba(20, 20, 20, 0.15);
}

.value-title {
  margin-top: 0.7rem;
  font-size: clamp(2.1rem, 4.8vw, 4rem);
  line-height: 0.94;
  letter-spacing: -0.03em;
  font-weight: 500;
}

.value-progress {
  margin-top: 2.4rem;
  font-size: 0.76rem;
  letter-spacing: 0.2em;
  color: rgba(19, 19, 19, 0.48);
}

.value-lead {
  margin-top: 0.9rem;
  font-size: clamp(1.3rem, 2.6vw, 2rem);
  line-height: 1.02;
}

.value-desc {
  margin-top: 0.85rem;
  color: rgba(19, 19, 19, 0.62);
  max-width: 24ch;
}

.value-visuals {
  display: grid;
  gap: 1.25rem;
}

.visual-card {
  border-radius: 0;
  overflow: hidden;
  border: 1px solid rgba(19, 19, 19, 0.12);
  background: rgba(255, 255, 255, 0.5);
  transform: scale(0.985);
  opacity: 0.72;
  transition: transform 0.45s ease, opacity 0.45s ease, border-color 0.45s ease;
}

.visual-card.active {
  transform: scale(1);
  opacity: 1;
  border-color: rgba(19, 19, 19, 0.26);
}

.visual-card img {
  width: 100%;
  height: clamp(260px, 40vw, 430px);
  display: block;
  object-fit: cover;
}

@media (max-width: 900px) {
  .value-layout {
    grid-template-columns: 1fr;
    gap: 1.1rem;
  }

  .value-copy {
    position: static;
    top: auto;
    border-right: 0;
    padding-right: 0;
  }

  .value-progress {
    margin-top: 1.2rem;
  }
}
</style>
