<script setup lang="ts">
const activeGuideIndex = ref(0);
const guideCardRefs = ref<HTMLElement[]>([]);
let guideRaf = 0;

const guideSignals = [
  {
    title: "Zła wycena na starcie",
    why: "Cena ustawiona emocjonalnie zamiast na danych obniża jakość zapytań i od razu ustawia rozmowy na obniżkę.",
    action: "Porównaj realne transakcje i konkurencję 1:1. Ustal wariant ceny startowej oraz granice negocjacyjne.",
    image: "https://images.pexels.com/photos/7578919/pexels-photo-7578919.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    title: "Nieprzygotowany stan prawny i dokumenty",
    why: "Braki formalne wydłużają decyzję kupującego i osłabiają zaufanie w kluczowym momencie procesu.",
    action: "Przygotuj komplet dokumentów przed publikacją i usuń ryzyka formalne przed pierwszymi prezentacjami.",
    image: "https://images.pexels.com/photos/8293777/pexels-photo-8293777.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    title: "Słaba prezentacja oferty",
    why: "Przypadkowe zdjęcia i ogólny opis sprawiają, że oferta przegrywa już na etapie pierwszego kontaktu.",
    action: "Zadbaj o porządek, światło i profesjonalne kadry. Opis oprzyj na konkretnych przewagach nieruchomości.",
    image: "https://images.pexels.com/photos/7031590/pexels-photo-7031590.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    title: "Negocjacje prowadzone pod presją",
    why: "Brak scenariusza rozmów i zbyt szybkie ustępstwa prowadzą do finalnej ceny niższej od potencjału.",
    action: "Ustal warunki brzegowe, argumenty obrony ceny i plan rozmowy przed kontaktem z kupującym.",
    image: "https://images.pexels.com/photos/7414284/pexels-photo-7414284.jpeg?auto=compress&cs=tinysrgb&w=1800"
  }
];

const checklistItems = [
  "Strategia ceny oparta o dane z rynku lokalnego",
  "Zweryfikowany stan prawny i komplet dokumentów",
  "Przygotowanie mieszkania do prezentacji i sesji zdjęciowej",
  "Opis oferty z konkretami: układ, standard, otoczenie, atuty",
  "Plan negocjacji i scenariusze odpowiedzi na obniżki",
  "Wstępna weryfikacja skutków podatkowych transakcji"
];

const checklistImages = [
  "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7031408/pexels-photo-7031408.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/8292799/pexels-photo-8292799.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7415036/pexels-photo-7415036.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7821510/pexels-photo-7821510.jpeg?auto=compress&cs=tinysrgb&w=1800",
  "https://images.pexels.com/photos/7578903/pexels-photo-7578903.jpeg?auto=compress&cs=tinysrgb&w=1800"
];

const checklistCards = computed(() =>
  checklistItems.map((text, idx) => ({
    title: text,
    text: "Element checklisty przed publikacją ogłoszenia.",
    metric: "Checklista wdrożenia",
    image: checklistImages[idx % checklistImages.length]
  }))
);

const setGuideRef = (el: Element | null, idx: number) => {
  if (!el) return;
  guideCardRefs.value[idx] = el as HTMLElement;
};

const updateActiveGuide = () => {
  if (!import.meta.client || guideCardRefs.value.length === 0) return;
  const viewportCenter = window.innerHeight * 0.45;
  let closest = 0;
  let minDistance = Number.POSITIVE_INFINITY;
  guideCardRefs.value.forEach((el, idx) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height * 0.5;
    const distance = Math.abs(center - viewportCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closest = idx;
    }
  });
  activeGuideIndex.value = closest;
};

const onGuideScroll = () => {
  if (guideRaf) return;
  guideRaf = window.requestAnimationFrame(() => {
    updateActiveGuide();
    guideRaf = 0;
  });
};

const currentChecklistSlide = ref(0);
const isChecklistPaused = ref(false);
const nextChecklistSlide = () => {
  currentChecklistSlide.value = (currentChecklistSlide.value + 1) % checklistCards.value.length;
};
const checklistRelativeIndex = (idx: number) => {
  const len = checklistCards.value.length;
  let diff = (idx - currentChecklistSlide.value + len) % len;
  if (diff > len / 2) diff -= len;
  return diff;
};
let checklistTimer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  updateActiveGuide();
  window.addEventListener("scroll", onGuideScroll, { passive: true });
  window.addEventListener("resize", onGuideScroll, { passive: true });
  checklistTimer = setInterval(() => {
    if (!isChecklistPaused.value) nextChecklistSlide();
  }, 5200);
});

onBeforeUnmount(() => {
  if (guideRaf) window.cancelAnimationFrame(guideRaf);
  window.removeEventListener("scroll", onGuideScroll);
  window.removeEventListener("resize", onGuideScroll);
  if (checklistTimer) clearInterval(checklistTimer);
});
</script>

<template>
  <div>
    <main>
      <section class="section mistakes-hero">
        <video class="mistakes-hero-video" autoplay muted loop playsinline preload="metadata" aria-hidden="true">
          <source src="/Hero-Fail.mp4" type="video/mp4" />
        </video>
        <div class="mistakes-hero-overlay" aria-hidden="true"></div>

        <div class="container mistakes-hero-shell">
          <p class="eyebrow">Błędy</p>
          <h1 class="section-title">Błędy przy sprzedaży nieruchomości</h1>
          <p class="section-copy">
            Zebrane w jednym miejscu: najczęstsze potknięcia, które obniżają cenę lub wydłużają proces sprzedaży.
          </p>
        </div>
      </section>

      <ProblemsSection />

      <section class="section mistakes-extended">
        <div class="container">
          <header class="mistakes-head">
            <p class="eyebrow">Praktyczny przewodnik</p>
            <h2 class="section-title">Najczęstsze błędy przy sprzedaży mieszkania i jak ich uniknąć</h2>
            <p class="section-copy">
              Poniżej znajdziesz rozwinięcie najważniejszych obszarów, które najczęściej wydłużają sprzedaż lub obniżają
              cenę transakcyjną.
            </p>
          </header>

          <div class="signals-layout">
            <aside class="signals-copy">
              <div class="signals-progress">{{ activeGuideIndex + 1 }} / {{ guideSignals.length }}</div>
              <p class="signals-lead">{{ guideSignals[activeGuideIndex]?.title }}</p>
            </aside>

            <div class="signals-visuals">
              <article
                v-for="(signal, idx) in guideSignals"
                :key="signal.title"
                :ref="el => setGuideRef(el, idx)"
                class="signal-card"
                :class="{ active: idx === activeGuideIndex }"
                :style="{ '--bg': `url(${signal.image})` }"
              >
                <p><strong>Dlaczego to ważne:</strong> {{ signal.why }}</p>
                <p><strong>Co zrobić:</strong> {{ signal.action }}</p>
              </article>
            </div>
          </div>

          <div class="checklist-stage">
            <div class="checklist-head">
              <h3>Checklista przed publikacją ogłoszenia</h3>
            </div>
            <div class="checklist-carousel" @mouseenter="isChecklistPaused = true" @mouseleave="isChecklistPaused = false">
              <article
                v-for="(item, idx) in checklistCards"
                :key="item.title"
                class="checklist-panel"
                :class="{
                  center: checklistRelativeIndex(idx) === 0,
                  left: checklistRelativeIndex(idx) === -1,
                  right: checklistRelativeIndex(idx) === 1,
                  hidden: Math.abs(checklistRelativeIndex(idx)) > 1
                }"
                :style="{ '--bg': `url(${item.image})` }"
                @click="currentChecklistSlide = idx"
              >
                <div class="checklist-panel-overlay">
                  <p class="checklist-kicker">{{ String(idx + 1).padStart(2, '0') }}</p>
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.text }}</p>
                  <div class="checklist-metric">{{ item.metric }}</div>
                </div>
              </article>
            </div>
            <div class="checklist-dots" role="tablist" aria-label="Nawigacja checklisty">
              <button
                v-for="(item, idx) in checklistCards"
                :key="`checklist-dot-${item.title}`"
                class="checklist-dot"
                :class="{ active: idx === currentChecklistSlide }"
                @click="currentChecklistSlide = idx"
              ></button>
            </div>
          </div>

          <div class="mistakes-note">
            <p>
              <strong>Uwaga podatkowa:</strong> przy sprzedaży przed upływem 5 lat (licząc od końca roku nabycia) może
              wystąpić obowiązek rozliczenia PIT od dochodu. W praktyce warto to zweryfikować przed wystawieniem
              nieruchomości, aby uniknąć kosztownych decyzji na finiszu.
            </p>
          </div>
        </div>
      </section>
    </main>
    <FooterSection :show-home-link-in-footer="true" :replace-errors-link-with-about="true" />
  </div>
</template>

<style scoped>
.mistakes-hero {
  position: relative;
  overflow: hidden;
  min-height: clamp(24rem, 56vh, 38rem);
  display: grid;
  align-items: center;
  padding: 0;
  background: #0d0f11;
}

.mistakes-hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mistakes-hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(160deg, rgba(7, 7, 8, 0.82), rgba(7, 7, 8, 0.68)),
    radial-gradient(circle at 16% 14%, rgba(186, 152, 89, 0.24), transparent 45%);
}

.mistakes-hero-shell {
  position: relative;
  z-index: 2;
  padding: clamp(2rem, 5vh, 3.4rem) 0;
}

.mistakes-hero-shell .section-title,
.mistakes-hero-shell .section-copy {
  color: #f5efe2;
}

.mistakes-hero-shell .section-title {
  max-width: 13ch;
}

.mistakes-hero-shell .section-copy {
  max-width: 56ch;
  color: rgba(245, 239, 226, 0.9);
}

.mistakes-extended {
  background: #f1ede6;
}

.mistakes-head {
  display: grid;
  gap: 0.75rem;
}

.signals-layout {
  margin-top: 1.2rem;
  display: grid;
  grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.15fr);
  gap: 2rem;
  align-items: start;
}

.signals-copy {
  position: sticky;
  top: 120px;
  padding-right: 1.2rem;
  border-right: 1px solid rgba(20, 20, 20, 0.15);
}

.signals-progress {
  margin-top: 0.2rem;
  font-size: 0.76rem;
  letter-spacing: 0.2em;
  color: rgba(19, 19, 19, 0.48);
}

.signals-lead {
  margin-top: 0.9rem;
  font-size: clamp(1.3rem, 2.6vw, 2rem);
  line-height: 1.02;
  color: rgba(19, 19, 19, 0.96);
}

.signals-visuals {
  display: grid;
  gap: 1.25rem;
}

.signal-card {
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background-image:
    linear-gradient(180deg, rgba(10, 10, 10, 0.18), rgba(10, 10, 10, 0.62)),
    var(--bg);
  background-size: cover;
  background-position: center;
  overflow: hidden;
  min-height: clamp(220px, 28vw, 320px);
  padding: 1.15rem;
  display: grid;
  align-content: start;
  transform: scale(0.985);
  opacity: 0.72;
  transition: transform 0.45s ease, opacity 0.45s ease, border-color 0.45s ease;
}

.signal-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(8, 8, 8, 0.48), rgba(8, 8, 8, 0.62));
  z-index: 0;
}

.signal-card.active {
  transform: scale(1);
  opacity: 1;
  border-color: rgba(255, 255, 255, 0.34);
}

.signal-card p {
  position: relative;
  z-index: 1;
  margin: 0;
  color: rgba(247, 242, 232, 0.96);
  line-height: 1.5;
  font-size: clamp(1.08rem, 1.35vw, 1.28rem);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.58);
  max-width: 48ch;
}

.signal-card p + p {
  margin-top: 0.72rem;
  padding-top: 0.72rem;
  border-top: 1px solid rgba(255, 255, 255, 0.24);
}

.signal-card p strong {
  color: #ffffff;
}

.checklist-stage {
  margin: clamp(4.8rem, 8vw, 8.2rem) 0;
}

.checklist-head {
  display: grid;
  gap: 0.45rem;
  margin-bottom: 1rem;
}

.checklist-carousel {
  position: relative;
  height: clamp(24rem, 44vw, 30rem);
  overflow: hidden;
}

.checklist-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(34rem, 72vw);
  min-height: 23rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.26);
  background-image: var(--bg);
  background-size: cover;
  background-position: center;
  filter: saturate(0.9) brightness(0.8);
  transform-origin: center center;
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease, filter 0.45s ease;
  cursor: pointer;
}

.checklist-panel-overlay {
  min-height: 100%;
  padding: 1.25rem;
  background: linear-gradient(180deg, rgba(6, 6, 6, 0.44), rgba(6, 6, 6, 0.82));
  display: grid;
  gap: 0.65rem;
  grid-template-rows: auto auto 1fr auto;
}

.checklist-panel.center {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  z-index: 3;
}

.checklist-panel.left {
  transform: translate(calc(-50% - 18.5rem), -50%) scale(0.86);
  opacity: 0.58;
  filter: saturate(0.86) brightness(0.76);
  z-index: 2;
}

.checklist-panel.right {
  transform: translate(calc(-50% + 18.5rem), -50%) scale(0.86);
  opacity: 0.58;
  filter: saturate(0.86) brightness(0.76);
  z-index: 2;
}

.checklist-panel.hidden {
  transform: translate(-50%, -50%) scale(0.8);
  opacity: 0;
  pointer-events: none;
  z-index: 1;
}

.checklist-panel h3 {
  font-size: 1.34rem;
  line-height: 1.1;
  color: #fbf8f2;
}

.checklist-panel p {
  color: rgba(245, 238, 227, 0.9);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.45);
}

.checklist-kicker {
  font-size: 0.72rem;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  color: #d2af72;
  font-weight: 700;
}

.checklist-metric {
  justify-self: start;
  padding: 0.4rem 0.72rem;
  background: rgba(186, 152, 89, 0.18);
  color: #f0d5a2;
  font-size: 0.8rem;
  font-weight: 600;
}

.checklist-dots {
  margin-top: 0.9rem;
  display: flex;
  gap: 0.42rem;
  justify-content: center;
  align-items: center;
}

.checklist-dot {
  width: 1.35rem;
  height: 0.22rem;
  border: 0;
  border-radius: 999px;
  background: rgba(19, 19, 19, 0.2);
  cursor: pointer;
  transition: background-color 0.25s ease, transform 0.25s ease;
  padding: 0;
}

.checklist-dot.active {
  background: rgba(186, 152, 89, 0.9);
  transform: scaleX(1.08);
}

.mistakes-note {
  margin-top: 0.8rem;
  padding: 0.8rem 0.95rem;
  border-left: 2px solid rgba(186, 152, 89, 0.8);
  background: rgba(186, 152, 89, 0.08);
}

@media (max-width: 900px) {
  .signals-layout {
    grid-template-columns: 1fr;
    gap: 1.1rem;
  }

  .signals-copy {
    position: static;
    top: auto;
    border-right: 0;
    padding-right: 0;
  }

  .checklist-stage {
    margin: clamp(4.2rem, 7vw, 6.2rem) 0;
  }

  .checklist-carousel {
    height: 19.2rem;
  }

  .checklist-panel {
    width: min(20rem, 90vw);
    min-height: 16.2rem;
  }

  .checklist-panel.left,
  .checklist-panel.right {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
