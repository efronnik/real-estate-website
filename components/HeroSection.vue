<script setup lang="ts">
import { onMounted, ref } from "vue";

const heroReady = ref(false);
const heroWords = ["Sprzedaj", "mieszkanie"];

onMounted(() => {
  window.requestAnimationFrame(() => {
    heroReady.value = true;
  });
});
</script>

<template>
  <section class="cp-hero">
    <header class="cp-topbar">
      <a href="/" class="cp-brand" aria-label="FIND home">
        <img src="/LOGO.png" alt="FIND" />
      </a>
      <nav class="cp-nav" aria-label="Primary navigation">
        <a href="/">Główna</a>
        <a href="/o-mnie">O mnie</a>
        <a href="/bledy">Błędy</a>
        <a href="/poradnik">Poradnik</a>
        <a href="/kalkulator">Kalkulator</a>
        <a href="/kontakt">Kontakt</a>
      </nav>
      <a href="#kontakt" class="cp-sign">
        <span class="cp-btn-text-wrap" aria-hidden="true">
          <span class="cp-btn-text cp-btn-text-top">Umów rozmowę</span>
          <span class="cp-btn-text cp-btn-text-bottom">Umów rozmowę</span>
        </span>
        <span class="sr-only">Umów rozmowę</span>
      </a>
    </header>

    <video class="cp-video-bg" autoplay muted loop playsinline preload="metadata" aria-hidden="true">
      <source src="/Hero-Warszaw.mp4" type="video/mp4" />
    </video>
    <div class="cp-video-overlay" aria-hidden="true"></div>

    <div class="cp-content">
      <h1 class="hero-title" :class="{ ready: heroReady }">
        <span v-for="(word, idx) in heroWords" :key="word" class="hero-word-mask" :style="{ '--d': `${idx * 180}ms` }">
          <span class="hero-word">{{ word }}</span>
        </span>
      </h1>
      <p class="hero-subtitle" :class="{ ready: heroReady }">Pokażę błędy i dam jasny plan sprzedaży.</p>
      <a href="#kontakt" class="cp-btn hero-cta" :class="{ ready: heroReady }">
        <span class="cp-btn-text-wrap" aria-hidden="true">
          <span class="cp-btn-text cp-btn-text-top">Umów konsultację</span>
          <span class="cp-btn-text cp-btn-text-bottom">Umów konsultację</span>
        </span>
        <span class="sr-only">Umów konsultację</span>
        <span class="cp-btn-arrow" aria-hidden="true">→</span>
      </a>
    </div>

  </section>
</template>

<style scoped>
.cp-hero {
  position: relative;
  min-height: min(1160px, 118svh);
  overflow: clip;
  isolation: isolate;
  padding: 152px 24px 170px;
  display: grid;
  place-items: center;
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
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 22px;
  background: transparent;
  backdrop-filter: none;
}

.cp-brand {
  display: inline-flex;
  align-items: center;
  width: clamp(86px, 9vw, 128px);
  justify-self: start;
}

.cp-brand img {
  display: block;
  width: 100%;
  height: auto;
}

.cp-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 1.8vw, 30px);
  width: max-content;
  justify-self: center;
}

.cp-nav a {
  position: relative;
  display: inline-block;
  color: #fffdf7;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.96rem;
  text-shadow: 0 3px 16px rgba(0, 0, 0, 0.68);
  -webkit-text-stroke: 0.25px rgba(0, 0, 0, 0.45);
  padding-bottom: 0.2rem;
  transition: color 0.2s ease, text-shadow 0.2s ease;
}

.cp-nav a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: rgba(221, 179, 90, 0.95);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.cp-nav a:hover::after,
.cp-nav a:focus-visible::after {
  transform: scaleX(1);
}

.cp-nav a:hover,
.cp-nav a:focus-visible {
  color: #e3be73;
  text-shadow:
    0 0 1px rgba(0, 0, 0, 0.95),
    0 3px 18px rgba(0, 0, 0, 0.85),
    0 0 12px rgba(227, 190, 115, 0.22);
  -webkit-text-stroke: 0;
  outline: none;
}

.cp-sign {
  position: relative;
  display: inline-flex;
  width: max-content;
  justify-self: end;
  align-items: center;
  justify-content: center;
  color: #f4eee2;
  text-decoration: none;
  border-radius: 0;
  border: 2px solid rgba(244, 238, 226, 0.9);
  padding: 0.72rem 1.22rem;
  font-weight: 500;
  font-size: 0.95rem;
  background: rgba(16, 14, 12, 0.14);
  box-shadow: none;
  transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease;
}

.cp-video-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -6;
}

.cp-video-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: -5;
  background:
    radial-gradient(120% 86% at 50% 4%, rgba(5, 5, 5, 0.1), rgba(5, 5, 5, 0.34)),
    linear-gradient(180deg, rgba(14, 12, 10, 0.16), rgba(14, 12, 10, 0.42));
}

.cp-content {
  width: min(100%, 1240px);
  text-align: center;
  z-index: 6;
  position: relative;
  padding-top: 0;
  margin-top: 0;
}

.cp-content h1 {
  margin: 0 auto;
  max-width: none;
  color: #f4eee2;
  font-family: "Playfair Display", serif;
  font-size: clamp(3rem, 8.2vw, 6.9rem);
  line-height: 0.9;
  letter-spacing: -0.02em;
  font-weight: 500;
  text-shadow: 0 12px 34px rgba(0, 0, 0, 0.56);
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
  font-family: "Playfair Display", serif;
  font-size: clamp(1.02rem, 2vw, 2rem);
  font-weight: 400;
  color: rgba(244, 238, 226, 0.92);
  text-shadow: 0 9px 22px rgba(0, 0, 0, 0.42);
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
  padding: 1rem 4.2rem;
  border-radius: 0;
  border: 2px solid rgba(244, 238, 226, 0.9);
  color: #f4eee2;
  text-decoration: none;
  font-weight: 500;
  font-size: 2rem;
  line-height: 1;
  background: rgba(16, 14, 12, 0.12);
  box-shadow: none;
  transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease;
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
  font-size: 1.55rem;
  line-height: 1;
  transform: translateX(0);
  opacity: 0.9;
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.32s ease;
}

.cp-btn:hover {
  filter: none;
  background: rgba(16, 14, 12, 0.26);
  border-color: rgba(244, 238, 226, 1);
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
  transform: translateX(6px);
  opacity: 1;
}

.cp-btn:focus-visible {
  outline: none;
  filter: none;
  background: rgba(16, 14, 12, 0.26);
  border-color: rgba(244, 238, 226, 1);
}

.cp-sign:hover,
.cp-sign:focus-visible {
  outline: none;
  filter: none;
  background: rgba(16, 14, 12, 0.26);
  border-color: rgba(244, 238, 226, 1);
  box-shadow: none;
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


@media (max-width: 1024px) and (min-width: 768px) {
  .cp-topbar {
    width: calc(100% - 30px);
    top: 10px;
    padding: 8px 0;
    gap: 12px;
    grid-template-columns: 1fr auto 1fr;
  }

  .cp-brand { width: clamp(76px, 10vw, 104px); }

  .cp-nav {
    gap: clamp(6px, 1.05vw, 11px);
    width: max-content;
    justify-self: center;
  }

  .cp-nav a {
    font-size: 0.72rem;
  }

  .cp-sign {
    padding: 0.56rem 0.92rem;
    font-size: 0.78rem;
  }

  .cp-sign .cp-btn-text-wrap {
    height: 1.15em;
    line-height: 1.15;
  }

  .cp-hero {
    min-height: 104svh;
    padding: 146px 18px 148px;
  }

  .cp-content {
    margin-top: 0;
  }

  .cp-content h1 {
    font-size: clamp(2.7rem, 7.4vw, 4.35rem);
  }

  .cp-content p {
    font-size: clamp(0.92rem, 1.75vw, 1.08rem);
    margin-top: 0.56rem;
  }

  .cp-btn {
    margin-top: 0.84rem;
    padding: 0.88rem 2.8rem;
    gap: 0.34rem;
    font-size: 1.55rem;
  }

  .cp-btn-text-wrap {
    height: 1.15em;
    line-height: 1.15;
  }

  .cp-btn-arrow {
    font-size: 1.2rem;
  }

}

@media (max-width: 767px) {
  .cp-topbar {
    width: calc(100% - 26px);
    top: 12px;
    padding: 8px 0;
    gap: 10px;
  }

  .cp-brand { width: 82px; }
  .cp-nav { display: none; }
  .cp-sign { padding: 0.62rem 1rem; font-size: 0.86rem; }

  .cp-hero { min-height: 105svh; padding: 148px 24px 142px; }
  .cp-content { padding-top: 0; margin-top: 0; }
}

@media (max-width: 640px) {
  .cp-hero { min-height: 95svh; padding: 122px 16px 118px; }
  .cp-content { margin-top: 0; }
  .cp-content h1 { font-size: clamp(2.3rem, 12.5vw, 3.7rem); max-width: none; white-space: nowrap; }
  .cp-content p { font-size: 1.05rem; max-width: none; white-space: nowrap; margin-top: 0.62rem; }
  .cp-btn { margin-top: 0.82rem; padding: 0.8rem 1.7rem; font-size: 1.15rem; }
  .cp-btn-arrow { font-size: 1rem; }
}
</style>
