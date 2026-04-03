<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";

const currentSlide = ref(0);
const isPaused = ref(false);
const problems = [
  {
    title: "Brak analizy rynku",
    text: "Ustalasz cenę według swoich potrzeb, a nie na podstawie cen transakcyjnych podobnych nieruchomości.",
    metric: "Konsekwencja: za tanio albo za drogo",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    title: "Nieprzygotowane wnętrza",
    text: "Publikujesz ofertę bez przygotowania mieszkania: drobne usterki, przedmioty osobiste i chaos obniżają odbiór.",
    metric: "Konsekwencja: nie przyciągasz uwagi kupujących",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    title: "Zdjęcia słabej jakości",
    text: "Wykonujesz zdjęcia smartfonem zamiast zamówić profesjonalną sesję, która podnosi wartość oferty.",
    metric: "Konsekwencja: mniejsza liczba zapytań",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    title: "Niepełny opis oferty",
    text: "Podajesz tylko parametry techniczne i lokalizację, pomijając udogodnienia oraz styl życia w okolicy.",
    metric: "Konsekwencja: oferta nie budzi emocji",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    title: "Brak reklamy",
    text: "Ograniczasz reklamę tylko do jednego portalu i nie docierasz do wszystkich potencjalnych kupujących.",
    metric: "Konsekwencja: wąski zasięg oferty",
    image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    title: "Prezentacja mieszkania",
    text: "Podczas prezentacji cała rodzina jest w mieszkaniu, a opowieści właściciela odciągają uwagę od atutów oferty.",
    metric: "Konsekwencja: zniechęcenie kupujących",
    image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    title: "Negocjacje ceny",
    text: "Zbyt szybko podajesz minimalny akceptowalny poziom ceny, oddając przewagę w rozmowie drugiej stronie.",
    metric: "Konsekwencja: niższa cena finalna",
    image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    title: "Oferta w wielu agencjach",
    text: "Współpraca z wieloma biurami bez jednej strategii osłabia wiarygodność oferty i rozmywa odpowiedzialność.",
    metric: "Konsekwencja: dłuższa sprzedaż i presja na obniżkę",
    image: "https://images.pexels.com/photos/48195/document-agreement-documents-sign-48195.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    title: "Sprzedasz za tanio albo za drogo",
    text: "Błędna wycena lub zbyt wysoka cena startowa potrafi zatrzymać proces już na etapie pierwszych tygodni.",
    metric: "Konsekwencja: strata pieniędzy lub czasu",
    image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    title: "Nie trafiasz do grupy docelowej",
    text: "Słaba prezentacja i komunikacja oferty sprawia, że nie przyciągasz odpowiednich kupujących.",
    metric: "Konsekwencja: mało wartościowych zapytań",
    image: "https://images.pexels.com/photos/7944060/pexels-photo-7944060.jpeg?auto=compress&cs=tinysrgb&w=1400"
  },
  {
    title: "Każdy element ma znaczenie",
    text: "Zaniedbanie nawet drobnych etapów procesu sprzedaży może kosztować Cię tysiące złotych.",
    metric: "Konsekwencja: realne straty finansowe",
    image: "https://images.pexels.com/photos/8293701/pexels-photo-8293701.jpeg?auto=compress&cs=tinysrgb&w=1400"
  }
];

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % problems.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + problems.length) % problems.length;
};

const relativeIndex = (idx: number) => {
  const len = problems.length;
  let diff = (idx - currentSlide.value + len) % len;
  if (diff > len / 2) diff -= len;
  return diff;
};

let timer: ReturnType<typeof setInterval> | null = null;
onMounted(() => {
  timer = setInterval(() => {
    if (!isPaused.value) nextSlide();
  }, 5200);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <section id="bledy" class="section problems">
    <div class="container">
      <div class="lead reveal">
        <p class="eyebrow no-sweep">Najdroższe pomyłki przy sprzedaży</p>
        <h2 class="section-title sweep-reveal">Kosztowne błędy w procesie sprzedaży mieszkania</h2>
        <p class="section-copy sweep-reveal">
          W premium segmencie nie przegrywa ten, kto ma słabszą nieruchomość. Przegrywa ten, kto oddaje narrację i kontrolę procesu.
        </p>
      </div>

      <div class="stage reveal delay-1" @mouseenter="isPaused = true" @mouseleave="isPaused = false">
        <div class="stage-head">
          <p class="no-sweep">Najbardziej kosztowne punkty procesu</p>
        </div>

        <div class="carousel">
          <article
            v-for="(item, idx) in problems"
            :key="item.title"
            class="panel"
            :class="{
              center: relativeIndex(idx) === 0,
              left: relativeIndex(idx) === -1,
              right: relativeIndex(idx) === 1,
              hidden: Math.abs(relativeIndex(idx)) > 1
            }"
            :style="{ '--bg': `url(${item.image})` }"
            @click="currentSlide = idx"
          >
            <div class="panel-overlay">
              <p class="kicker">{{ String(idx + 1).padStart(2, "0") }}</p>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
              <div class="metric">{{ item.metric }}</div>
            </div>
          </article>
        </div>

        <div class="dots" role="tablist" aria-label="Nawigacja slajdów">
          <button
            v-for="(item, idx) in problems"
            :key="`dot-${item.title}`"
            class="dot"
            :class="{ active: idx === currentSlide }"
            :aria-label="`Przejdź do slajdu ${idx + 1}`"
            @click="currentSlide = idx"
          >
            <span class="dot-core"></span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.problems {
  padding-top: clamp(4rem, 8vw, 7.2rem);
}

.lead {
  display: grid;
  gap: 0.9rem;
}

.lead :deep(.section-title) {
  line-height: 1.02;
  padding-bottom: 0.08em;
}

.stage {
  margin-top: 2.2rem;
}

.stage-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stage-head p {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(19, 19, 19, 0.56);
}

.carousel {
  position: relative;
  height: clamp(24rem, 44vw, 30rem);
  overflow: hidden;
}

.panel {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(34rem, 72vw);
  min-height: 23rem;
  border-radius: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.26);
  background-image: var(--bg);
  background-size: cover;
  background-position: center;
  transform-origin: center center;
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease, filter 0.45s ease;
  cursor: pointer;
}

.panel-overlay {
  min-height: 100%;
  padding: 1.25rem;
  background: linear-gradient(180deg, rgba(10, 10, 10, 0.18), rgba(10, 10, 10, 0.62));
  display: grid;
  gap: 0.65rem;
  grid-template-rows: auto auto 1fr auto;
}

.panel.center {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  z-index: 3;
}

.panel.left {
  transform: translate(calc(-50% - 18.5rem), -50%) scale(0.86);
  opacity: 0.58;
  filter: saturate(0.86) brightness(0.76);
  z-index: 2;
}

.panel.right {
  transform: translate(calc(-50% + 18.5rem), -50%) scale(0.86);
  opacity: 0.58;
  filter: saturate(0.86) brightness(0.76);
  z-index: 2;
}

.panel.hidden {
  transform: translate(-50%, -50%) scale(0.8);
  opacity: 0;
  pointer-events: none;
  z-index: 1;
}

.panel h3 {
  font-size: 1.34rem;
  line-height: 1.1;
  color: #fbf8f2;
}

.panel p {
  color: rgba(245, 238, 227, 0.78);
}

.kicker {
  font-size: 0.72rem;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  color: #d2af72;
  font-weight: 700;
}

.metric {
  justify-self: start;
  padding: 0.4rem 0.72rem;
  border-radius: 0;
  background: rgba(186, 152, 89, 0.18);
  color: #f0d5a2;
  font-size: 0.8rem;
  font-weight: 600;
}

.dots {
  margin-top: 0.9rem;
  display: flex;
  gap: 0.42rem;
  justify-content: center;
  align-items: center;
}

.dot {
  width: 1.35rem;
  height: 0.22rem;
  border: 0;
  border-radius: 999px;
  background: rgba(19, 19, 19, 0.2);
  cursor: pointer;
  transition: background-color 0.25s ease, transform 0.25s ease;
  padding: 0;
}

.dot-core {
  display: none;
}

.dot.active {
  background: rgba(186, 152, 89, 0.9);
  transform: scaleX(1.08);
}

@media (max-width: 1024px) and (min-width: 768px) {
  .carousel {
    height: 22.5rem;
  }

  .panel {
    width: min(30rem, 72vw);
    min-height: 19.2rem;
  }

  .panel.left {
    transform: translate(calc(-50% - 11.4rem), -50%) scale(0.88);
  }

  .panel.right {
    transform: translate(calc(-50% + 11.4rem), -50%) scale(0.88);
  }
}

@media (max-width: 700px) {
  .stage-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .carousel {
    height: 19.2rem;
  }

  .panel {
    width: min(20rem, 90vw);
    min-height: 16.2rem;
  }

  .panel.left,
  .panel.right {
    opacity: 0;
    pointer-events: none;
  }
}

@media (max-width: 480px) {
  .dots {
    display: none;
  }
}
</style>
