<script setup lang="ts">
const area = ref(50);
const rooms = ref(2);
const conditionFactor = ref(1);
const districtFactor = ref(1);
const basePricePerM2 = 14500;
const MIN_AREA = 15;
const MAX_AREA = 300;
const MIN_ROOMS = 1;
const MAX_ROOMS = 8;
const conditionOptions = [
  { label: "Do remontu", value: 0.9 },
  { label: "Dobry", value: 1 },
  { label: "Bardzo dobry", value: 1.08 },
  { label: "Premium", value: 1.15 }
];
const districtOptions = [
  { label: "Niższa", value: 0.92 },
  { label: "Standardowa", value: 1 },
  { label: "Wysoka", value: 1.1 },
  { label: "Top", value: 1.2 }
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

watch(area, value => {
  const next = Number.isFinite(value) ? clamp(value, MIN_AREA, MAX_AREA) : MIN_AREA;
  if (next !== value) area.value = next;
});

watch(rooms, value => {
  const next = Number.isFinite(value) ? clamp(value, MIN_ROOMS, MAX_ROOMS) : MIN_ROOMS;
  if (next !== value) rooms.value = next;
});

const estimate = computed(() => {
  const raw = area.value * basePricePerM2 * conditionFactor.value * districtFactor.value;
  return Math.round(raw / 1000) * 1000;
});

const formatPln = (value: number) =>
  new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 }).format(value);
</script>

<template>
  <div>
    <main class="calculator-page">
      <div class="container calc-shell">
        <section class="calc-hero reveal">
          <video class="calculator-video-bg" autoplay muted loop playsinline preload="metadata" aria-hidden="true">
            <source src="/Hero-Calculator.mp4" type="video/mp4" />
          </video>
          <div class="calculator-video-overlay" aria-hidden="true"></div>
          <header class="calc-head">
            <p class="eyebrow">Kalkulator</p>
            <h1 class="section-title">Szybki szacunek wartości mieszkania</h1>
            <p class="section-copy">
              To orientacyjny kalkulator. Finalna wycena zależy od lokalizacji, stanu nieruchomości i strategii sprzedaży.
            </p>
          </header>
        </section>

        <div class="calc-grid">
          <div class="calc-grid-overlay" aria-hidden="true"></div>
          <form class="calc-form" @submit.prevent>
            <label>
              Metraż (m²)
              <div class="input-row">
                <input v-model.number="area" type="number" :min="MIN_AREA" :max="MAX_AREA" />
                <span class="unit">m²</span>
              </div>
              <input v-model.number="area" class="range" type="range" :min="MIN_AREA" :max="MAX_AREA" step="1" />
            </label>

            <label>
              Liczba pokoi
              <div class="rooms-grid">
                <span
                  v-for="n in 8"
                  :key="`room-${n}`"
                  class="chip"
                  :class="{ active: rooms === n }"
                  role="button"
                  tabindex="0"
                  @click="rooms = n"
                  @keydown.enter.prevent="rooms = n"
                  @keydown.space.prevent="rooms = n"
                >
                  {{ n }}
                </span>
              </div>
            </label>

            <label>
              Stan mieszkania
              <div class="chips-row">
                <span
                  v-for="option in conditionOptions"
                  :key="`cond-${option.value}`"
                  class="chip chip-wide"
                  :class="{ active: conditionFactor === option.value }"
                  role="button"
                  tabindex="0"
                  @click="conditionFactor = option.value"
                  @keydown.enter.prevent="conditionFactor = option.value"
                  @keydown.space.prevent="conditionFactor = option.value"
                >
                  {{ option.label }}
                </span>
              </div>
            </label>

            <label>
              Atrakcyjność lokalizacji
              <div class="chips-row">
                <span
                  v-for="option in districtOptions"
                  :key="`dist-${option.value}`"
                  class="chip chip-wide"
                  :class="{ active: districtFactor === option.value }"
                  role="button"
                  tabindex="0"
                  @click="districtFactor = option.value"
                  @keydown.enter.prevent="districtFactor = option.value"
                  @keydown.space.prevent="districtFactor = option.value"
                >
                  {{ option.label }}
                </span>
              </div>
            </label>
          </form>

          <aside class="calc-result">
            <p class="result-kicker">Szacowana wartość</p>
            <strong class="result-value">{{ formatPln(estimate) }}</strong>
            <p class="muted">Założenie bazowe: {{ formatPln(basePricePerM2) }} / m², rynek Warszawa.</p>
            <div class="result-meta">
              <p><span>Metraż</span><strong>{{ area }} m²</strong></p>
              <p><span>Pokoje</span><strong>{{ rooms }}</strong></p>
              <p><span>Stan</span><strong>{{ conditionFactor.toFixed(2) }}x</strong></p>
              <p><span>Lokalizacja</span><strong>{{ districtFactor.toFixed(2) }}x</strong></p>
            </div>
            <a href="/kontakt" class="link-arrow">Umów dokładną wycenę</a>
          </aside>
        </div>
      </div>
    </main>
    <FooterSection :calculator-footer-nav-order="true" />
  </div>
</template>

<style scoped>
.calculator-page {
  background: #ece7dd;
  padding: 0;
}

.calc-hero {
  position: relative;
  overflow: hidden;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  min-height: clamp(24rem, 56vh, 38rem);
  display: grid;
  align-items: start;
  padding: clamp(2.2rem, 6vh, 4.2rem) clamp(1rem, 3vw, 2rem) clamp(1.2rem, 3vh, 2rem);
  background: #0d0f11;
}

.calculator-video-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.calculator-video-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(160deg, rgba(7, 7, 8, 0.8), rgba(7, 7, 8, 0.68)),
    radial-gradient(circle at 78% 12%, rgba(186, 152, 89, 0.2), transparent 46%);
}

.calc-shell {
  display: grid;
  gap: 0;
}

.calc-head {
  position: relative;
  z-index: 2;
  display: grid;
  gap: 0.85rem;
}

.calc-head .section-title,
.calc-head .section-copy {
  color: #f5efe2;
}

.calc-head .section-title {
  max-width: 13ch;
}

.calc-head .section-copy {
  max-width: 56ch;
  color: rgba(245, 239, 226, 0.9);
}

.calc-grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(260px, 0.9fr);
  gap: 1rem;
  margin-top: clamp(4.2rem, 7vw, 6.2rem);
  margin-bottom: clamp(4.2rem, 7vw, 6.2rem);
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  min-height: clamp(34rem, 72vh, 48rem);
  padding: clamp(1.2rem, 3vw, 2rem);
  border: 1px solid rgba(255, 255, 255, 0.14);
  background:
    linear-gradient(120deg, rgba(11, 13, 16, 0.96), rgba(11, 13, 16, 0.9)),
    radial-gradient(circle at 82% 14%, rgba(186, 152, 89, 0.19), transparent 44%);
  overflow: hidden;
}

.calc-grid-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0) calc(25% - 1px),
      rgba(255, 255, 255, 0.05) calc(25% - 1px),
      rgba(255, 255, 255, 0.05) 25%
    );
  opacity: 0.35;
}

.calc-form {
  position: relative;
  z-index: 2;
  padding: clamp(1.1rem, 2.2vw, 1.6rem);
  display: grid;
  gap: 0.95rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background:
    linear-gradient(165deg, rgba(13, 15, 18, 0.96), rgba(13, 15, 18, 0.9)),
    radial-gradient(circle at 20% 10%, rgba(186, 152, 89, 0.16), transparent 44%);
  color: #f5efe3;
}

.calc-form label {
  display: grid;
  gap: 0.45rem;
  font-size: 0.88rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(245, 239, 227, 0.9);
}

.calc-form input,
.calc-form select {
  border: 1px solid rgba(255, 255, 255, 0.26);
  background: rgba(8, 9, 12, 0.62);
  color: #f5efe3;
  padding: 0.68rem 0.78rem;
  font: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.calc-form input:focus,
.calc-form select:focus {
  outline: none;
  border-color: rgba(186, 152, 89, 0.95);
  box-shadow: 0 0 0 2px rgba(186, 152, 89, 0.18);
  background: rgba(8, 9, 12, 0.78);
}

.input-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.unit {
  color: rgba(245, 239, 227, 0.72);
  font-size: 0.84rem;
}

.range {
  margin-top: 0.55rem;
  width: 100%;
  appearance: none;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border: 0 !important;
  padding: 0 !important;
}

.range::-webkit-slider-thumb {
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #e2be78;
  border: 1px solid rgba(11, 13, 16, 0.9);
  cursor: pointer;
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 0.45rem;
}

.chips-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.45rem;
}

.chip {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.26) !important;
  background: rgba(8, 9, 12, 0.62);
  color: rgba(245, 239, 227, 0.9) !important;
  padding: 0.52rem 0.4rem;
  font: inherit;
  font-size: 0.78rem;
  text-align: center;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color 0.18s ease, background-color 0.18s ease, color 0.18s ease;
}

.chip-wide {
  font-size: 0.72rem;
}

.chip:hover {
  border-color: rgba(186, 152, 89, 0.72) !important;
  color: #f8efd9 !important;
}

.chip:focus-visible {
  outline: none;
  border-color: rgba(186, 152, 89, 0.72) !important;
  box-shadow: 0 0 0 2px rgba(186, 152, 89, 0.15);
}

.chip:focus,
.chip:focus-visible {
  outline: none;
}

.chip:focus-visible:not(:hover):not(.active) {
  border-color: rgba(255, 255, 255, 0.26) !important;
  color: rgba(245, 239, 227, 0.9) !important;
  background: rgba(8, 9, 12, 0.62) !important;
  box-shadow: none !important;
}

.chip:not(:hover):not(:focus-visible):not(.active) {
  border-color: rgba(255, 255, 255, 0.26) !important;
  color: rgba(245, 239, 227, 0.9) !important;
  background: rgba(8, 9, 12, 0.62) !important;
}

.chip.active {
  border-color: rgba(186, 152, 89, 0.95) !important;
  background: rgba(186, 152, 89, 0.2) !important;
  color: #f8efd9 !important;
}

.calc-result {
  position: relative;
  z-index: 2;
  padding: clamp(1.1rem, 2.2vw, 1.6rem);
  display: grid;
  align-content: start;
  gap: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background:
    linear-gradient(145deg, rgba(18, 21, 26, 0.98), rgba(10, 12, 15, 0.95)),
    radial-gradient(circle at 80% 12%, rgba(186, 152, 89, 0.2), transparent 44%);
  color: #f6f1e8;
}

.result-kicker {
  font-size: 0.74rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(246, 241, 232, 0.72);
}

.result-value {
  font-size: clamp(2rem, 4.3vw, 3.2rem);
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: #f8f3e6;
  text-shadow: 0 8px 24px rgba(0, 0, 0, 0.42);
}

.muted {
  color: rgba(246, 241, 232, 0.74);
}

.result-meta {
  display: grid;
  gap: 0.45rem;
  margin-top: 0.12rem;
  padding-top: 0.72rem;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
}

.result-meta p {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.result-meta span {
  color: rgba(246, 241, 232, 0.72);
  font-size: 0.86rem;
}

.result-meta strong {
  color: #e2be78;
  font-size: 1rem;
}

.calc-result :deep(.link-arrow) {
  margin-top: 0.1rem;
}

@media (max-width: 900px) {
  .calc-grid {
    grid-template-columns: 1fr;
  }

  .rooms-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .chips-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
