<script setup lang="ts">
const current = ref(1);

const reviews = [
  {
    quote: "W końcu mieliśmy plan. Sprzedaż przestała być chaosem i domknęła się szybciej, niż zakładaliśmy.",
    author: "Daniela A.",
    verified: "Zweryfikowana opinia"
  },
  {
    quote: "Największa różnica? Spokój i konkretne decyzje na każdym etapie. Czuć, że proces jest pod kontrolą.",
    author: "Tina H.",
    verified: "Zweryfikowana opinia"
  },
  {
    quote: "Profesjonalna prezentacja i bardzo dobrze poprowadzone negocjacje. Finalna cena była wyższa niż zakładałam.",
    author: "Sandra D.",
    verified: "Zweryfikowana opinia"
  }
];

const next = () => {
  current.value = (current.value + 1) % reviews.length;
};

const prev = () => {
  current.value = (current.value - 1 + reviews.length) % reviews.length;
};

const indexAt = (offset: number) => {
  const len = reviews.length;
  return (current.value + offset + len) % len;
};
</script>

<template>
  <section class="section trust">
    <div class="container">
      <div class="trust-shell reveal">
        <div class="trust-head">
          <p class="eyebrow">Dlaczego klienci ufają</p>
          <h2 class="section-title">Dowody, nie obietnice</h2>
        </div>

        <div class="trust-stats">
          <article class="stat reveal delay-1">
            <strong>100+</strong>
            <p>przeprowadzonych procesów sprzedaży</p>
          </article>
          <article class="stat reveal delay-2">
            <strong>4.9/5</strong>
            <p>średnia ocena współpracy klientów</p>
          </article>
          <article class="stat reveal delay-3">
            <strong>1:1</strong>
            <p>opiekun prowadzący od diagnozy do finału</p>
          </article>
        </div>

        <div class="trust-slider reveal delay-1">
          <div class="slider-head">
            <h3>Opinie klientów</h3>
            <div class="controls">
              <button type="button" @click="prev" aria-label="Poprzednia opinia">←</button>
              <button type="button" @click="next" aria-label="Następna opinia">→</button>
            </div>
          </div>

          <div class="track">
            <article class="quote-card side">
              <p class="stars">★★★★★</p>
              <blockquote>{{ reviews[indexAt(-1)].quote }}</blockquote>
              <footer>
                <strong>{{ reviews[indexAt(-1)].author }}</strong>
                <span>{{ reviews[indexAt(-1)].verified }}</span>
              </footer>
            </article>

            <article class="quote-card center">
              <p class="stars">★★★★★</p>
              <blockquote>{{ reviews[indexAt(0)].quote }}</blockquote>
              <footer>
                <strong>{{ reviews[indexAt(0)].author }}</strong>
                <span>{{ reviews[indexAt(0)].verified }}</span>
              </footer>
            </article>

            <article class="quote-card side">
              <p class="stars">★★★★★</p>
              <blockquote>{{ reviews[indexAt(1)].quote }}</blockquote>
              <footer>
                <strong>{{ reviews[indexAt(1)].author }}</strong>
                <span>{{ reviews[indexAt(1)].verified }}</span>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust {
  min-height: 100vh;
}

.trust-shell {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  min-height: 100vh;
  padding: clamp(2rem, 4vh, 3rem) clamp(1.2rem, 4vw, 4.5rem);
  border: 1px solid rgba(255, 255, 255, 0.14);
  background:
    linear-gradient(130deg, rgba(13, 13, 13, 0.96), rgba(25, 25, 25, 0.9)),
    radial-gradient(circle at 18% 20%, rgba(196, 160, 88, 0.14), transparent 40%);
}

.trust-head {
  display: grid;
  gap: 1rem;
}

.trust-head .section-title {
  color: #f3efe6;
}

.trust-head .eyebrow {
  color: var(--gold);
}

.trust-stats {
  margin-top: 1.35rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.stat {
  padding: 1.2rem 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.04);
}

.stat strong {
  font-size: clamp(1.9rem, 4.4vw, 2.8rem);
  line-height: 0.95;
  color: #f6f2ea;
}

.stat p {
  margin-top: 0.55rem;
  color: rgba(246, 242, 234, 0.76);
  font-size: 1.02rem;
}

.trust-quotes {
  margin-top: 0.85rem;
}

.trust-slider {
  margin-top: 1.4rem;
  padding: 1.4rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(8, 8, 8, 0.28);
  overflow: hidden;
}

.slider-head {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.slider-head h3 {
  margin: 0;
  font-size: clamp(1.9rem, 3.2vw, 2.35rem);
  font-weight: 500;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #f3efe6;
}

.controls {
  display: inline-flex;
  gap: 0.5rem;
}

.controls button {
  width: 2.95rem;
  height: 2.95rem;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.95);
  cursor: pointer;
  transition: transform 0.25s ease;
}

.controls button:hover {
  transform: translateY(-1px);
}

.track {
  margin-top: 1.35rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  align-items: stretch;
}

.quote-card {
  min-height: 15rem;
  padding: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.28);
  transition: transform 0.35s ease, background 0.35s ease;
}

.quote-card.side {
  background: rgba(16, 16, 16, 0.76);
  color: #f2f2ee;
}

.quote-card.center {
  background: rgba(248, 248, 244, 0.96);
  color: #171717;
  transform: translateY(-3px);
}

.quote-card blockquote {
  margin: 0.65rem 0 0;
  font-size: 1.22rem;
  line-height: 1.4;
}

.stars {
  margin: 0;
  letter-spacing: 0.08em;
  color: #c4a058;
}

.quote-card footer {
  margin-top: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quote-card footer span {
  color: #c4a058;
  font-size: 0.8rem;
}

@media (max-width: 900px) {
  .trust-shell {
    padding: 1.3rem 1rem;
  }

  .trust-stats {
    grid-template-columns: 1fr;
  }

  .slider-head {
    justify-content: space-between;
  }

  .slider-head h3 {
    font-size: 1.6rem;
  }

  .track {
    grid-template-columns: 1fr;
  }

  .quote-card.side {
    display: none;
  }

  .quote-card.center {
    transform: none;
  }
}
</style>
