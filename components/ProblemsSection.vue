<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";

const currentSlide = ref(0);
const isPaused = ref(false);

const problems = [
  {
    title: "Cena ustawiona emocjonalnie",
    text: "Pierwsze tygodnie bez ruchu zabijaja momentum. Pozniej mieszkanie wyglada na problematyczne i klienci negocjuja ostrzej.",
    metric: "-6-12% ceny",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Nieczytelny przekaz oferty",
    text: "Zdjecia bez narracji i przypadkowy opis nie buduja poczucia wartosci. Klient porownuje mieszkanie tylko przez metry i cene.",
    metric: "2x mniej zapytan",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Negocjacje bez strategii",
    text: "Brak scenariuszy rozmowy powoduje oddawanie ceny w pierwszych minutach. Najczesciej bez swiadomosci, ze byl margines do obrony.",
    metric: "nawet -80k PLN",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Chaos formalny",
    text: "Dokumenty i terminy domykane za pozno wydluzaja final. Rosnie ryzyko, ze klient wycofa sie przed podpisaniem.",
    metric: "+3-5 tygodni",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1400&q=80"
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
  }, 4200);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <section id="bledy" class="section problems">
    <div class="container">
      <div class="lead reveal">
        <p class="eyebrow no-sweep">Najdrozsze pomylki przy sprzedazy</p>
        <h2 class="section-title sweep-reveal">Bledy, przez ktore mieszkanie sprzedaje sie dluzej i taniej</h2>
        <p class="section-copy sweep-reveal">
          W premium segmencie nie przegrywa ten, kto ma slabsza nieruchomosc. Przegrywa ten, kto
          oddaje narracje i kontrole procesu.
        </p>
      </div>

      <div class="stage reveal delay-1" @mouseenter="isPaused = true" @mouseleave="isPaused = false">
        <div class="stage-head">
          <p class="no-sweep">Najbardziej kosztowne punkty procesu</p>
          <div class="controls">
            <button class="nav" type="button" aria-label="Poprzedni slajd" @click="prevSlide">←</button>
            <button class="nav" type="button" aria-label="Nastepny slajd" @click="nextSlide">→</button>
          </div>
        </div>

        <div class="carousel-3d">
          <div class="orb" aria-hidden="true"></div>
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
              <p class="kicker">0{{ idx + 1 }}</p>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
              <div class="metric">{{ item.metric }}</div>
            </div>
          </article>
        </div>

        <div class="dots" role="tablist" aria-label="Nawigacja slajdow">
          <button
            v-for="(item, idx) in problems"
            :key="`dot-${item.title}`"
            class="dot"
            :class="{ active: idx === currentSlide }"
            :aria-label="`Przejdz do slajdu ${idx + 1}`"
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
  margin-top: 2.3rem;
  padding: clamp(1rem, 2vw, 1.4rem);
  border-radius: 0.35rem;
  background: transparent;
  border: 0;
  box-shadow: none;
}

.nav {
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 0.3rem;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.05);
  color: #f3eee3;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
}

.nav:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.13);
}

.stage-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.stage-head p {
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(19, 19, 19, 0.58);
  margin-left: -1.35rem;
}

.controls {
  display: flex;
  gap: 0.55rem;
}

.panel {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(27rem, 72vw);
  min-height: 20rem;
  border-radius: 0.3rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background-image: var(--bg);
  background-size: cover;
  background-position: center;
  transform-origin: center center;
  transition: transform 0.72s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.55s ease, filter 0.55s ease;
  cursor: pointer;
}

.carousel-3d {
  position: relative;
  height: clamp(22rem, 40vw, 27rem);
  overflow: hidden;
  border-radius: 0.3rem;
  perspective: 1200px;
}

.orb {
  position: absolute;
  left: 50%;
  bottom: -2.8rem;
  width: 28rem;
  height: 7rem;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, rgba(186, 152, 89, 0.35), rgba(186, 152, 89, 0));
  filter: blur(8px);
  pointer-events: none;
  z-index: 0;
}

.panel-overlay {
  min-height: 100%;
  padding: 1.35rem;
  background: linear-gradient(180deg, rgba(8, 8, 8, 0.24), rgba(8, 8, 8, 0.7));
  display: grid;
  gap: 0.72rem;
  grid-template-rows: auto auto 1fr auto;
}

.panel.center {
  transform: translate(-50%, -50%) rotateY(0deg) scale(1.04);
  opacity: 1;
  z-index: 3;
}

.panel.left {
  transform: translate(calc(-50% - 19.8rem), calc(-50% + 1.5rem)) rotateY(28deg) rotateZ(-2deg) scale(0.82);
  opacity: 0.62;
  filter: brightness(0.72) blur(0.2px);
  z-index: 2;
}

.panel.right {
  transform: translate(calc(-50% + 19.8rem), calc(-50% + 1.5rem)) rotateY(-28deg) rotateZ(2deg) scale(0.82);
  opacity: 0.62;
  filter: brightness(0.72) blur(0.2px);
  z-index: 2;
}

.panel.hidden {
  transform: translate(-50%, -50%) scale(0.72);
  opacity: 0;
  pointer-events: none;
  z-index: 1;
}

.panel h3 {
  font-size: 1.35rem;
  line-height: 1.1;
  color: #fbf8f2;
}

.panel p {
  color: rgba(245, 238, 227, 0.72);
}

.kicker {
  font-size: 0.74rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #c8ab72;
  font-weight: 700;
}

.metric {
  justify-self: start;
  padding: 0.42rem 0.76rem;
  border-radius: 0.3rem;
  background: rgba(186, 152, 89, 0.16);
  color: #e8cf9f;
  font-size: 0.82rem;
  font-weight: 700;
}

.dots {
  margin-top: 0.95rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
}

.dot {
  width: 0.9rem;
  height: 0.9rem;
  border: 1px solid rgba(19, 19, 19, 0.22);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  transition: all 0.35s ease;
  display: grid;
  place-items: center;
  padding: 0;
}

.dot-core {
  width: 0.28rem;
  height: 0.28rem;
  border-radius: 50%;
  background: rgba(19, 19, 19, 0.36);
  transition: all 0.35s ease;
}

.dot.active {
  border-color: rgba(186, 152, 89, 0.62);
  background: rgba(186, 152, 89, 0.18);
  box-shadow: 0 0 0 1px rgba(186, 152, 89, 0.22);
}

.dot.active .dot-core {
  background: rgba(186, 152, 89, 0.95);
  transform: scale(1.18);
}

@media (max-width: 900px) {
  .carousel-3d {
    height: 20rem;
  }

  .panel {
    width: min(22rem, 74vw);
    min-height: 17.5rem;
  }

  .panel.left {
    transform: translate(calc(-50% - 12.2rem), -50%) rotateY(22deg) scale(0.82);
  }

  .panel.right {
    transform: translate(calc(-50% + 12.2rem), -50%) rotateY(-22deg) scale(0.82);
  }
}

@media (max-width: 700px) {
  .stage {
    padding: 1rem;
  }

  .stage-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .controls {
    display: none;
  }

  .carousel-3d {
    height: 18rem;
  }

  .panel {
    width: min(18rem, 86vw);
    min-height: 15rem;
  }

  .panel.left {
    transform: translate(calc(-50% - 9.5rem), -50%) rotateY(20deg) scale(0.78);
  }

  .panel.right {
    transform: translate(calc(-50% + 9.5rem), -50%) rotateY(-20deg) scale(0.78);
  }

  .dots {
    display: none;
  }
}
</style>
