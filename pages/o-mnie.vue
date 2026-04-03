<script setup lang="ts">
const portfolioCases = [
  {
    title: "Mokotów - sprzedaż po rebrandingu oferty",
    text: "Po zmianie pozycjonowania i materiałów premium oferta wróciła na rynek z nową narracją. Finalnie mieszkanie sprzedało się szybciej i bez nerwowych negocjacji.",
    result: "Finalizacja: 27 dni",
    hero: "Rebranding",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1800&q=80"
  },
  {
    title: "Śródmieście - obrona ceny przy dużym ruchu",
    text: "Kluczowe było przejęcie rozmów i selekcja zapytań. Dzięki temu presja na obniżkę została ograniczona, a transakcja zamknięta na warunkach właściciela.",
    result: "Cena końcowa: +6.5% vs. oczekiwania",
    hero: "Negocjacje",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
  },
  {
    title: "Praga Południe - przygotowanie od zera",
    text: "Od audytu mieszkania po finalne dokumenty. Spójny plan pozwolił skrócić czas ekspozycji i poprowadzić cały proces bez chaosu po stronie klienta.",
    result: "Liczba jakościowych zapytań: x2.3",
    hero: "Finalizacja",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=80"
  }
];

const valueCards = [
  {
    text: "Strategia zamiast przypadkowych decyzji",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80"
  },
  {
    text: "Transparentna komunikacja na każdym etapie",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80"
  },
  {
    text: "Estetyka oferty, która realnie wspiera cenę",
    image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    text: "Negocjacje prowadzone spokojnie i zdecydowanie",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1800&q=80"
  }
];

const process = [
  {
    step: "01",
    title: "Diagnoza i pozycjonowanie",
    text: "Analiza mieszkania, konkurencji i profilu kupującego. Ustalamy plan, który ma konkretny cel: sprzedaż na dobrych warunkach.",
    image: "https://images.pexels.com/photos/7947663/pexels-photo-7947663.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    step: "02",
    title: "Przygotowanie oferty",
    text: "Home staging, zdjęcia, opis i narracja. Każdy element jest dopasowany do grupy docelowej i oczekiwań rynku.",
    image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    step: "03",
    title: "Prezentacje i negocjacje",
    text: "Prowadzę spotkania i rozmowy tak, aby utrzymać przewagę po stronie właściciela i chronić wartość oferty.",
    image: "https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    step: "04",
    title: "Domknięcie transakcji",
    text: "Koordynacja formalności, terminy i dokumenty. Finalizacja przebiega spokojnie, jasno i bez niepotrzebnego ryzyka.",
    image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1800"
  }
];

const activeProcessIndex = ref(0);
const processCardRefs = ref<HTMLElement[]>([]);
const activeValueIndex = ref(0);
const valueCardRefs = ref<HTMLElement[]>([]);
let processRaf = 0;

const updateActiveProcess = () => {
  if (!import.meta.client || processCardRefs.value.length === 0) return;

  const viewportCenter = window.innerHeight * 0.45;
  let closest = 0;
  let minDistance = Number.POSITIVE_INFINITY;

  processCardRefs.value.forEach((el, idx) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cardCenter = rect.top + rect.height * 0.5;
    const distance = Math.abs(cardCenter - viewportCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closest = idx;
    }
  });

  activeProcessIndex.value = closest;
};

const onProcessScroll = () => {
  if (processRaf) return;
  processRaf = window.requestAnimationFrame(() => {
    updateActiveProcess();
    updateActiveValue();
    processRaf = 0;
  });
};

const setProcessRef = (el: Element | null, idx: number) => {
  if (!el) return;
  processCardRefs.value[idx] = el as HTMLElement;
};

const setValueRef = (el: Element | null, idx: number) => {
  if (!el) return;
  valueCardRefs.value[idx] = el as HTMLElement;
};

const updateActiveValue = () => {
  if (!import.meta.client || valueCardRefs.value.length === 0) return;

  const viewportCenter = window.innerHeight * 0.45;
  let closest = 0;
  let minDistance = Number.POSITIVE_INFINITY;

  valueCardRefs.value.forEach((el, idx) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cardCenter = rect.top + rect.height * 0.5;
    const distance = Math.abs(cardCenter - viewportCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closest = idx;
    }
  });

  activeValueIndex.value = closest;
};

onMounted(() => {
  updateActiveProcess();
  updateActiveValue();
  window.addEventListener("scroll", onProcessScroll, { passive: true });
  window.addEventListener("resize", onProcessScroll, { passive: true });
});

onBeforeUnmount(() => {
  if (processRaf) window.cancelAnimationFrame(processRaf);
  window.removeEventListener("scroll", onProcessScroll);
  window.removeEventListener("resize", onProcessScroll);
});
</script>

<template>
  <div>
    <main class="about-page">
      <section class="section about-hero">
        <div class="container hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">O mnie</p>
            <h1 class="section-title">Eksperckie prowadzenie sprzedaży nieruchomości w modelu premium</h1>
            <p class="section-copy">
              Nazywam się [Twoje imię]. Pracuję z właścicielami mieszkań, którzy chcą sprzedać świadomie: z planem,
              kontrolą procesu i wynikiem finansowym, który ma uzasadnienie rynkowe.
            </p>
            <p class="section-copy">
              Łączę doświadczenie negocjacyjne, przygotowanie oferty i estetykę prezentacji. Dzięki temu sprzedaż jest
              uporządkowana, przewidywalna i bez chaosu.
            </p>
          </div>

          <figure class="hero-photo">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1800&q=80"
              alt="Portret eksperta nieruchomości"
            />
          </figure>
        </div>
      </section>

      <section class="section">
        <div class="container about-value-layout">
          <aside class="about-value-copy">
            <p class="eyebrow">Podejście</p>
            <h2>Kim jestem i jak pracuję</h2>
            <p>
              Wspieram klientów, którzy chcą sprzedać mieszkanie dobrze, a nie przypadkowo. Od pierwszego audytu po
              podpisanie dokumentów prowadzę cały proces tak, aby każdy etap miał jasny cel i konkretne mierniki.
            </p>
            <p>
              Nie działam szablonowo. Każda nieruchomość wymaga innej strategii ceny, innej narracji i innego planu
              negocjacji. To właśnie te detale tworzą przewagę przy finalnym wyniku.
            </p>
            <blockquote>
              "Dobrze sprzedana nieruchomość to wynik decyzji podjętych we właściwej kolejności."
            </blockquote>
          </aside>

          <div class="about-value-visuals">
            <div class="value-points">
              <h3>Co jest dla mnie ważne</h3>
              <div class="value-image-grid">
                <article
                  v-for="(item, idx) in valueCards"
                  :key="item.text"
                  :ref="el => setValueRef(el, idx)"
                  class="value-image-item"
                  :class="{ active: idx === activeValueIndex }"
                >
                  <img :src="item.image" :alt="item.text" />
                  <p>{{ item.text }}</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section about-process-section">
        <div class="container">
          <header class="about-process-head">
            <p class="eyebrow">Portfolio</p>
            <h2 class="section-title">Przykłady projektów i efektów współpracy</h2>
          </header>
          <div class="about-service-board">
            <article
              v-for="(item, idx) in portfolioCases"
              :key="item.title"
              class="about-service-row"
              :style="{ '--bg': `url(${item.image})` }"
            >
              <div class="about-service-info">
                <p class="about-idx"><span class="about-idx-text">{{ String(idx + 1).padStart(2, "0") }}</span></p>
                <p class="about-service-result">{{ item.result }}</p>
                <p class="about-service-tag">{{ item.hero }}</p>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container process-layout">
          <div class="process-visuals">
            <article
              v-for="(item, idx) in process"
              :key="`img-${item.step}`"
              :ref="el => setProcessRef(el, idx)"
              class="process-image-item"
              :class="{ active: idx === activeProcessIndex }"
            >
              <img :src="item.image" :alt="item.title" />
            </article>
          </div>

          <aside class="process-copy">
            <p class="eyebrow">Proces</p>
            <h2 class="section-title">Model współpracy krok po kroku</h2>
            <p class="process-progress">{{ activeProcessIndex + 1 }} / {{ process.length }}</p>
            <p class="process-lead">{{ process[activeProcessIndex]?.title }}</p>
            <p class="process-desc">{{ process[activeProcessIndex]?.text }}</p>
          </aside>
        </div>
      </section>

    </main>
    <FooterSection
      prefooter-kicker="Porozmawiajmy o Twojej nieruchomości"
      prefooter-title="Jeśli chcesz sprzedać mieszkanie z planem i spokojem, umów rozmowę."
      prefooter-copy="Zaczniemy od krótkiej diagnozy i konkretnego kierunku działań."
      :prefooter-tall="true"
      :show-home-link-in-footer="true"
    />
  </div>
</template>

<style scoped>
.about-page {
  padding-top: 1.6rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
  gap: 1.2rem;
  align-items: stretch;
}

.hero-copy {
  display: grid;
  align-content: start;
}

.hero-copy .section-title {
  max-width: 14ch;
}

.hero-photo {
  margin: 0;
  min-height: 26rem;
  border: 1px solid rgba(19, 19, 19, 0.14);
  overflow: hidden;
}

.hero-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-value-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 2rem;
  align-items: start;
}

.about-value-copy {
  position: sticky;
  top: 120px;
  padding-right: 1.2rem;
  border-right: 1px solid rgba(20, 20, 20, 0.15);
}

.about-value-copy .eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  font-weight: 700;
}

.about-value-copy h2 {
  margin-top: 0.72rem;
}

.about-value-copy p {
  margin-top: 0.8rem;
  color: rgba(19, 19, 19, 0.88);
  font-size: clamp(1.02rem, 1.25vw, 1.14rem);
  line-height: 1.58;
  font-weight: 500;
  max-width: 34ch;
}

.about-value-copy blockquote {
  margin: 1rem 0 0;
  padding: 0.72rem 0.78rem;
  border-left: 2px solid rgba(196, 160, 88, 0.75);
  background: rgba(196, 160, 88, 0.08);
  color: rgba(19, 19, 19, 0.84);
  font-size: 0.98rem;
}

.about-value-visuals {
  display: grid;
  gap: 1.15rem;
  align-content: start;
}

.about-visual-card {
  border: 1px solid rgba(19, 19, 19, 0.12);
  background: rgba(255, 255, 255, 0.5);
  overflow: hidden;
}

.about-visual-card img {
  width: 100%;
  height: clamp(280px, 38vw, 420px);
  object-fit: cover;
  display: block;
}

.value-points {
  padding: 0;
}

.value-points h3 {
  margin: 0;
  font-size: clamp(1.42rem, 2.1vw, 2rem);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: rgba(19, 19, 19, 0.96);
  margin-bottom: 0.2rem;
}

.value-image-grid {
  margin-top: 0.7rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.62rem;
}

.value-image-item {
  position: relative;
  border: 1px solid rgba(19, 19, 19, 0.14);
  overflow: hidden;
  transform: scale(0.985);
  opacity: 0.8;
  transition: transform 0.45s ease, opacity 0.45s ease, border-color 0.45s ease;
}

.value-image-item img {
  display: block;
  width: 100%;
  height: clamp(210px, 28vw, 320px);
  object-fit: cover;
  filter: saturate(0.88);
  transform: scale(1);
  transition: transform 0.6s ease;
}

.value-image-item.active {
  transform: scale(1);
  opacity: 1;
  border-color: rgba(19, 19, 19, 0.3);
}

.value-image-item.active img {
  transform: scale(1.045);
}

.value-image-item::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(6, 6, 6, 0.12), rgba(6, 6, 6, 0.88));
}

.value-image-item p {
  position: absolute;
  left: 0.78rem;
  right: 0.78rem;
  bottom: 0.7rem;
  margin: 0;
  color: #fffdf7;
  z-index: 2;
  font-weight: 800;
  font-size: clamp(1.04rem, 1.35vw, 1.24rem);
  line-height: 1.22;
  padding: 0.34rem 0.46rem;
  background: rgba(0, 0, 0, 0.42);
  border-left: 2px solid rgba(196, 160, 88, 0.95);
  text-shadow:
    0 3px 10px rgba(0, 0, 0, 0.78),
    0 0 1px rgba(0, 0, 0, 0.95);
}

.about-service-board {
  margin-top: 1rem;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  background: #0d0f11;
}

.about-process-section {
  background: #0d0f11;
  color: #f7f2e8;
}

.about-process-head {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1.4rem;
}

.about-process-head :deep(.section-title) {
  color: #f7f2e8;
}

.about-process-head :deep(.eyebrow) {
  color: var(--gold);
}

.about-service-row {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  align-items: stretch;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  min-height: clamp(8.6rem, 14vw, 12rem);
}

.about-service-row:first-child {
  border-top: 0;
}

.about-service-row::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(160deg, rgba(0, 0, 0, 0.76), rgba(0, 0, 0, 0.7)),
    var(--bg);
  background-size: cover;
  background-position: center;
  opacity: 1;
  transform: translateY(100%);
  transition: transform 1.08s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 0;
}

.about-service-info {
  padding-top: 1.1rem;
  padding-right: 1rem;
  padding-bottom: 1.1rem;
  padding-left: max(1.2rem, calc(50vw - 690px));
  position: relative;
  z-index: 2;
  max-width: 78ch;
}

.about-idx {
  width: 1.35rem;
  height: 1.35rem;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.68rem;
  line-height: 1;
  letter-spacing: 0.14em;
  color: #f1f1f1;
  font-weight: 700;
}

.about-idx-text {
  display: block;
  transform: translateY(-0.11em);
}

.about-service-result {
  margin-top: 0.52rem;
  color: #e2bc73;
  font-size: 0.83rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.55);
}

.about-service-tag {
  margin-top: 0.45rem;
  color: rgba(247, 242, 232, 0.72);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.about-service-info h3 {
  margin-top: 0.7rem;
  font-size: clamp(1.2rem, 2.15vw, 1.72rem);
  line-height: 1.08;
  font-weight: 700;
  color: #fff8eb;
  text-shadow:
    0 4px 14px rgba(0, 0, 0, 0.56),
    0 1px 1px rgba(0, 0, 0, 0.8);
}

.about-service-info p:last-child {
  margin-top: 0.45rem;
  color: rgba(255, 248, 235, 0.95);
  font-size: 1.03rem;
  line-height: 1.45;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
}

.about-service-row:hover::before {
  transform: translateY(0);
}

.process-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 2rem;
  align-items: start;
}

.process-visuals {
  display: grid;
  gap: 0.72rem;
}

.process-image-item {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(19, 19, 19, 0.14);
  background: rgba(255, 255, 255, 0.55);
  transform: scale(0.985);
  opacity: 0.72;
  transition: transform 0.45s ease, opacity 0.45s ease, border-color 0.45s ease;
}

.process-image-item img {
  width: 100%;
  height: clamp(210px, 28vw, 320px);
  display: block;
  object-fit: cover;
}

.process-image-item.active {
  transform: scale(1);
  opacity: 1;
  border-color: rgba(19, 19, 19, 0.3);
}

.process-copy {
  position: sticky;
  top: 120px;
  padding-left: 1.2rem;
  border-left: 1px solid rgba(20, 20, 20, 0.15);
}

.process-progress {
  margin-top: 2rem;
  font-size: 0.76rem;
  letter-spacing: 0.2em;
  color: rgba(19, 19, 19, 0.48);
}

.process-lead {
  margin-top: 0.9rem;
  font-size: clamp(1.3rem, 2.7vw, 2.06rem);
  line-height: 1.02;
}

.process-desc {
  margin-top: 0.84rem;
  color: var(--muted);
  max-width: 30ch;
}

@media (max-width: 1000px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-photo {
    min-height: 22rem;
  }

  .about-value-layout,
  .process-layout {
    grid-template-columns: 1fr;
  }

  .about-value-copy {
    position: static;
    top: auto;
    border-right: 0;
    padding-right: 0;
  }

  .about-service-row {
    grid-template-columns: 1fr;
  }

  .about-service-info {
    padding-left: 1.2rem;
  }

  .value-image-grid {
    grid-template-columns: 1fr;
  }

  .process-copy {
    position: static;
    top: auto;
    border-left: 0;
    padding-left: 0;
  }

  .process-progress {
    margin-top: 1.2rem;
  }
}
</style>
