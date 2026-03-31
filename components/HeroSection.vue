<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const rootEl = ref<HTMLElement | null>(null);
const progress = ref(0);
const scrollStage = ref(0);
const heroReady = ref(false);
const heroWords = ["Sprzedaj", "mieszkanie"];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const updateProgress = () => {
  if (!rootEl.value || !import.meta.client) return;

  const rect = rootEl.value.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const total = rect.height + vh;
  const offset = vh - rect.top;
  progress.value = clamp(offset / total, 0, 1);

  const stageDistance = Math.max(rootEl.value.offsetHeight * 0.72, 1);
  scrollStage.value = clamp(-rect.top / stageDistance, 0, 1);
};

let rafId = 0;
const onScroll = () => {
  if (rafId) return;
  rafId = window.requestAnimationFrame(() => {
    updateProgress();
    rafId = 0;
  });
};

onMounted(() => {
  updateProgress();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  window.requestAnimationFrame(() => {
    heroReady.value = true;
  });
});

onBeforeUnmount(() => {
  if (rafId) window.cancelAnimationFrame(rafId);
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
});

const houseStyle = computed(() => ({
  transform: `translate3d(-50%, ${progress.value * 135 - scrollStage.value * 58}px, 0) scale(${1 + progress.value * 0.18})`,
  opacity: clamp(1 - Math.max(scrollStage.value - 0.42, 0) * 2.1, 0, 1)
}));

const contentStyle = computed(() => {
  const stage = scrollStage.value;
  const opacity = clamp(1 - stage * 3.2, 0, 1);
  return {
    opacity,
    transform: `translate3d(0, ${stage * -68}px, 0)`
  };
});

const logoOverlayStyle = computed(() => {
  const stage = scrollStage.value;
  const opacity = clamp((stage - 0.24) * 3.1, 0, 1) * clamp(1 - (stage - 0.86) * 3.5, 0, 1);
  return {
    opacity,
    transform: `translate3d(-50%, ${stage * -20}px, 0) scale(${1 + stage * 0.03})`
  };
});

const hazeStyle = computed(() => {
  const stage = scrollStage.value;
  const opacity = clamp(0.58 + stage * 0.95, 0, 1);
  return {
    opacity,
    transform: `translate3d(0, ${stage * -20}px, 0) scale(${1 + stage * 0.14})`
  };
});

const whiteWipeStyle = computed(() => {
  const stage = scrollStage.value;
  const opacity = clamp((stage - 0.68) * 2.2, 0, 0.72);
  return {
    opacity
  };
});

const cloudFarStyle = computed(() => ({
  transform: `translate3d(${progress.value * 90}px, ${progress.value * -28}px, 0) scale(${1 + progress.value * 0.04})`
}));

const cloudMidStyle = computed(() => ({
  transform: `translate3d(${progress.value * -130}px, ${progress.value * -45}px, 0) scale(${1 + progress.value * 0.06})`
}));

const cloudNearStyle = computed(() => ({
  transform: `translate3d(${progress.value * 165}px, ${progress.value * -68 - scrollStage.value * 22}px, 0) scale(${1 + progress.value * 0.09})`
}));
</script>

<template>
  <section ref="rootEl" class="cp-hero">
    <header class="cp-topbar">
      <div class="cp-brand">FIND</div>
      <nav class="cp-nav" aria-label="Primary navigation">
        <a href="#bledy">Bledy</a>
        <a href="#jak-pomagam">Jak pomagam</a>
        <a href="#blog">Blog</a>
        <a href="#kontakt">Kontakt</a>
      </nav>
      <a href="#kontakt" class="cp-sign">
        <span class="cp-btn-text-wrap" aria-hidden="true">
          <span class="cp-btn-text cp-btn-text-top">Umow rozmowe</span>
          <span class="cp-btn-text cp-btn-text-bottom">Umow rozmowe</span>
        </span>
        <span class="sr-only">Umow rozmowe</span>
      </a>
    </header>

    <div class="cp-sky" aria-hidden="true"></div>
    <div class="cp-cloud cp-cloud-far" :style="cloudFarStyle" aria-hidden="true"></div>
    <div class="cp-cloud cp-cloud-mid" :style="cloudMidStyle" aria-hidden="true"></div>
    <div class="cp-cloud cp-cloud-near" :style="cloudNearStyle" aria-hidden="true"></div>

    <div class="cp-content" :style="contentStyle">
      <h1 class="hero-title" :class="{ ready: heroReady }">
        <span v-for="(word, idx) in heroWords" :key="word" class="hero-word-mask" :style="{ '--d': `${idx * 180}ms` }">
          <span class="hero-word">{{ word }}</span>
        </span>
      </h1>
      <p class="hero-subtitle" :class="{ ready: heroReady }">Pokaze bledy i dam jasny plan sprzedazy.</p>
      <a href="#kontakt" class="cp-btn hero-cta" :class="{ ready: heroReady }">
        <span class="cp-btn-text-wrap" aria-hidden="true">
          <span class="cp-btn-text cp-btn-text-top">Umow konsultacje</span>
          <span class="cp-btn-text cp-btn-text-bottom">Umow konsultacje</span>
        </span>
        <span class="sr-only">Umow konsultacje</span>
        <span class="cp-btn-arrow" aria-hidden="true">→</span>
      </a>
    </div>

    <div class="cp-logo-overlay" :style="logoOverlayStyle" aria-hidden="true">
      <div class="cp-logo-find">FIND</div>
        <div class="cp-logo-real">Nieruchomosci</div>
    </div>

    <div class="cp-house-wrap" :style="houseStyle" aria-hidden="true">
      <img
        class="cp-house"
        src="https://findrealestate.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhouse.8ed9b3db.png&w=1920&q=90&dpl=dpl_A42WFJk578JTS2Vboa8KRRVEdras"
        alt=""
      />
    </div>

    <div class="cp-haze" :style="hazeStyle" aria-hidden="true"></div>
    <div class="cp-white-wipe" :style="whiteWipeStyle" aria-hidden="true"></div>
  </section>
</template>

<style scoped>
.cp-hero {
  position: relative;
  min-height: min(1840px, 190svh);
  overflow: clip;
  isolation: isolate;
  padding: 152px 24px 320px;
  display: grid;
  place-items: start center;
}

.cp-topbar {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: min(1280px, calc(100% - 54px));
  z-index: 20;
  border-radius: 0;
  padding: 8px 2px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 22px;
  background: transparent;
  backdrop-filter: none;
}

.cp-brand {
  font-size: 2rem;
  letter-spacing: -0.075em;
  font-weight: 950;
  color: var(--ink);
  line-height: 1;
  text-transform: uppercase;
}

.cp-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 1.8vw, 30px);
}

.cp-nav a {
  position: relative;
  display: inline-block;
  color: rgba(19, 19, 19, 0.9);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  padding-bottom: 0.2rem;
}

.cp-nav a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: rgba(19, 19, 19, 0.85);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.cp-nav a:hover::after,
.cp-nav a:focus-visible::after {
  transform: scaleX(1);
}

.cp-sign {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--paper);
  text-decoration: none;
  border-radius: 999px;
  padding: 0.72rem 1.22rem;
  font-weight: 650;
  font-size: 0.95rem;
  background: var(--ink);
  box-shadow: 0 8px 18px rgba(19, 19, 19, 0.22);
  transition: box-shadow 180ms ease, filter 180ms ease;
}

.cp-sky {
  position: absolute;
  inset: 0;
  z-index: -5;
  background:
    linear-gradient(180deg, rgba(242, 238, 230, 0.82), rgba(244, 241, 234, 0.7)),
    url("https://findrealestate.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fback.f53e9773.jpg&w=1920&q=75&dpl=dpl_A42WFJk578JTS2Vboa8KRRVEdras")
      center top / cover no-repeat;
}

.cp-cloud {
  position: absolute;
  inset: 0;
  pointer-events: none;
  will-change: transform;
  transition: transform 220ms linear;
  z-index: 2;
  opacity: 0.78;
}

.cp-cloud::before,
.cp-cloud::after {
  content: "";
  position: absolute;
  border-radius: 999px;
  background:
    url("https://findrealestate.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcloud.c8800fa9.png&w=768&q=75&dpl=dpl_A42WFJk578JTS2Vboa8KRRVEdras")
      center / contain no-repeat;
  filter: saturate(1.06) brightness(1.08);
}

.cp-cloud-far { animation: cp-drift-a 24s linear infinite; }
.cp-cloud-far::before { width: 460px; height: 156px; top: 11%; left: 6%; }
.cp-cloud-far::after { width: 560px; height: 178px; top: 18%; right: 5%; }

.cp-cloud-mid { animation: cp-drift-b 32s linear infinite; }
.cp-cloud-mid::before { width: 670px; height: 224px; top: 27%; left: 14%; }
.cp-cloud-mid::after { width: 540px; height: 190px; top: 35%; right: 10%; }

.cp-cloud-near { animation: cp-drift-c 38s linear infinite; }
.cp-cloud-near::before { width: 760px; height: 262px; top: 44%; left: -10%; }
.cp-cloud-near::after { width: 730px; height: 252px; top: 47%; right: -12%; }

.cp-content {
  width: min(100%, 1240px);
  text-align: center;
  z-index: 6;
  position: relative;
  padding-top: 8px;
  margin-top: -64px;
  transition: opacity 180ms linear, transform 220ms linear;
}

.cp-content h1 {
  margin: 0 auto;
  max-width: none;
  color: var(--ink);
  font-size: clamp(3rem, 8.2vw, 6.9rem);
  line-height: 1.02;
  letter-spacing: -0.045em;
  font-weight: 800;
}

.hero-title {
  display: inline-flex;
  gap: 0.18em;
}

.hero-word-mask {
  display: inline-block;
  overflow: visible;
  padding-top: 0;
  padding-bottom: 0;
}

.hero-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(0.55em);
  transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.78s ease;
  transition-delay: var(--d);
}

.hero-title.ready .hero-word {
  opacity: 1;
  transform: translateY(0);
}

.cp-content p {
  margin: 0.72rem auto 0;
  max-width: none;
  white-space: nowrap;
  font-size: clamp(1.02rem, 2vw, 2rem);
  color: var(--muted);
}

.hero-subtitle {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.72s ease, transform 0.72s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.62s;
}

.hero-subtitle.ready {
  opacity: 1;
  transform: translateY(0);
}

.cp-btn {
  margin-top: 0.92rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.42rem;
  padding: 0.86rem 1.45rem;
  border-radius: 999px;
  color: var(--paper);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.94rem;
  background: linear-gradient(180deg, #2a2620, #191715);
  box-shadow: 0 12px 28px rgba(19, 19, 19, 0.3);
  transition: box-shadow 180ms ease, filter 180ms ease;
}

.cp-btn-text-wrap {
  position: relative;
  display: inline-grid;
  overflow: hidden;
  height: 1.2em;
  line-height: 1.2;
}

.cp-btn-text {
  grid-area: 1 / 1;
  display: inline-block;
  transition: transform 0.56s cubic-bezier(0.22, 1, 0.36, 1);
}

.cp-btn-text-top {
  transform: translateY(0);
}

.cp-btn-text-bottom {
  transform: translateY(120%);
}

.hero-cta {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.76s ease, transform 0.76s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 180ms ease, filter 180ms ease;
  transition-delay: 0.78s;
}

.hero-cta.ready {
  opacity: 1;
  transform: translateY(0);
}

.cp-btn-arrow {
  display: inline-block;
  font-size: 1rem;
  line-height: 1;
  transform: translateX(0);
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.cp-btn:hover {
  filter: brightness(1.03);
  box-shadow: 0 13px 29px rgba(19, 19, 19, 0.34);
}

.cp-btn:hover .cp-btn-text-top,
.cp-btn:focus-visible .cp-btn-text-top,
.cp-sign:hover .cp-btn-text-top,
.cp-sign:focus-visible .cp-btn-text-top {
  transform: translateY(-120%);
}

.cp-btn:hover .cp-btn-text-bottom,
.cp-btn:focus-visible .cp-btn-text-bottom,
.cp-sign:hover .cp-btn-text-bottom,
.cp-sign:focus-visible .cp-btn-text-bottom {
  transform: translateY(0);
}

.cp-btn:hover .cp-btn-arrow,
.cp-btn:focus-visible .cp-btn-arrow {
  transform: translateX(2px);
}

.cp-btn:focus-visible {
  outline: none;
  filter: brightness(1.03);
  box-shadow: 0 13px 29px rgba(19, 19, 19, 0.34);
}

.cp-sign:hover,
.cp-sign:focus-visible {
  outline: none;
  filter: brightness(1.03);
  box-shadow: 0 12px 24px rgba(19, 19, 19, 0.3);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.cp-house-wrap {
  width: min(1680px, 122vw);
  margin-top: 0;
  position: absolute;
  left: 50%;
  bottom: -370px;
  z-index: 4;
  will-change: transform;
  transition: transform 220ms linear;
}

.cp-logo-overlay {
  position: absolute;
  left: 50%;
  top: 52%;
  z-index: 6;
  text-align: center;
  pointer-events: none;
  transition: opacity 180ms linear, transform 220ms linear;
}

.cp-logo-find {
  font-size: clamp(8rem, 20vw, 17rem);
  line-height: 0.88;
  letter-spacing: -0.06em;
  font-weight: 800;
  color: transparent;
  background:
    url("https://findrealestate.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhouse.8ed9b3db.png&w=1920&q=90&dpl=dpl_A42WFJk578JTS2Vboa8KRRVEdras")
      center 56% / cover no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 0 2px 20px rgba(10, 18, 30, 0.08);
}

.cp-logo-real {
  margin-top: -0.4rem;
  font-size: clamp(2.1rem, 5vw, 4.4rem);
  line-height: 1;
  font-weight: 750;
  color: transparent;
  background:
    url("https://findrealestate.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhouse.8ed9b3db.png&w=1920&q=90&dpl=dpl_A42WFJk578JTS2Vboa8KRRVEdras")
      center 61% / cover no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 0 2px 18px rgba(10, 18, 30, 0.08);
}

.cp-house {
  width: min(1680px, 128%);
  margin: 0 auto;
  display: block;
  object-fit: contain;
  filter: saturate(1.04) contrast(1.03);
}

.cp-haze {
  position: absolute;
  left: -9%;
  right: -9%;
  bottom: -30px;
  height: 300px;
  z-index: 7;
  pointer-events: none;
  background:
    url("https://findrealestate.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsmoke.9f683cb4.png&w=768&q=75&dpl=dpl_A42WFJk578JTS2Vboa8KRRVEdras")
      center bottom / 112% 100% no-repeat;
  opacity: 0.86;
  filter: saturate(1.04) brightness(1.03) blur(0.3px);
  -webkit-mask-image: radial-gradient(110% 96% at 50% 66%, #000 44%, rgba(0, 0, 0, 0.82) 68%, transparent 92%);
  mask-image: radial-gradient(110% 96% at 50% 66%, #000 44%, rgba(0, 0, 0, 0.82) 68%, transparent 92%);
  transition: opacity 180ms linear, transform 220ms linear;
}

.cp-white-wipe {
  position: absolute;
  inset: 0;
  z-index: 8;
  pointer-events: none;
  background:
    radial-gradient(60% 22% at 50% 78%, rgba(244, 245, 247, 0.76), rgba(244, 245, 247, 0)),
    linear-gradient(
      180deg,
      rgba(244, 245, 247, 0) 58%,
      rgba(244, 245, 247, 0.24) 76%,
      rgba(244, 245, 247, 0.56) 88%,
      rgba(244, 245, 247, 0.86) 100%
    );
  opacity: 0;
  transition: opacity 240ms linear;
}

@keyframes cp-drift-a { from { transform: translateX(0); } to { transform: translateX(40px); } }
@keyframes cp-drift-b { from { transform: translateX(0); } to { transform: translateX(-56px); } }
@keyframes cp-drift-c { from { transform: translateX(0); } to { transform: translateX(64px); } }

@media (max-width: 900px) {
  .cp-topbar {
    width: calc(100% - 26px);
    top: 12px;
    padding: 8px 0;
    gap: 10px;
  }

  .cp-brand { font-size: 1.65rem; }
  .cp-nav { display: none; }
  .cp-sign { padding: 0.62rem 1rem; font-size: 0.86rem; }

  .cp-hero { min-height: 148svh; padding: 148px 24px 220px; }
  .cp-content { padding-top: 2px; margin-top: -44px; }
  .cp-house-wrap { width: 156vw; bottom: -228px; }
  .cp-house { width: min(1400px, 132%); }
  .cp-haze { height: 230px; opacity: 0.82; bottom: -22px; }
  .cp-logo-overlay { top: 54%; }
}

@media (max-width: 640px) {
  .cp-hero { min-height: 128svh; padding: 122px 16px 170px; }
  .cp-content { margin-top: -28px; }
  .cp-content h1 { font-size: clamp(2.3rem, 12.5vw, 3.7rem); max-width: none; white-space: nowrap; }
  .cp-content p { font-size: 1.05rem; max-width: none; white-space: nowrap; margin-top: 0.62rem; }
  .cp-btn { margin-top: 0.82rem; }
  .cp-house-wrap { width: 198vw; bottom: -104px; }
  .cp-house { width: min(1220px, 136%); }
  .cp-haze { height: 186px; bottom: -18px; opacity: 0.78; }
  .cp-logo-overlay { top: 58%; }
}
</style>
