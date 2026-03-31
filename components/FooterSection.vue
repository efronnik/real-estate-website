<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <div class="footer-stack">
    <section class="prefooter-stage" aria-label="Sekcja koncowa">
      <div class="prefooter-sticky">
        <div class="prefooter-shell">
          <p class="prefooter-kicker">Koniec przewijania? Zrobmy pierwszy krok.</p>
          <h2>Sprzedaj mieszkanie spokojnie i na dobrych warunkach.</h2>
          <a href="#kontakt" class="prefooter-btn">
            <span class="prefooter-btn-text-wrap" aria-hidden="true">
              <span class="prefooter-btn-text prefooter-btn-text-top">Umow konsultacje</span>
              <span class="prefooter-btn-text prefooter-btn-text-bottom">Umow konsultacje</span>
            </span>
            <span class="sr-only">Umow konsultacje</span>
            <span class="prefooter-btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>

    <footer class="site-footer">
      <div class="container footer-shell">
        <div class="footer-brand">
          <p class="footer-logo">FIND Ekspert Sprzedazy</p>
          <p class="footer-copy">
            Eksperckie wsparcie wlasciciela mieszkania: od strategii ceny po bezpieczny podpis.
          </p>
        </div>

        <div class="footer-links">
          <a href="#bledy">Bledy</a>
          <a href="#jak-pomagam">Jak pomagam</a>
          <a href="#blog">Artykuly</a>
          <a href="#kontakt">Kontakt</a>
        </div>

        <div class="footer-social">
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="Facebook">Facebook</a>
          <a href="#" aria-label="LinkedIn">LinkedIn</a>
        </div>
      </div>

      <div class="container footer-bottom">
        <p>© {{ year }} FIND Ekspert Sprzedazy. Wszelkie prawa zastrzezone.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.footer-stack {
  position: relative;
}

.prefooter-stage {
  position: relative;
  min-height: 60vh;
  z-index: 3;
}

.prefooter-sticky {
  position: sticky;
  top: 0;
  height: 54vh;
  width: 100vw;
  margin-left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}

.prefooter-shell {
  height: 54vh;
  display: grid;
  align-content: center;
  justify-items: center;
  text-align: center;
  gap: 1rem;
  padding: clamp(1.4rem, 4vw, 2.6rem);
  background:
    linear-gradient(160deg, rgba(12, 14, 18, 0.8), rgba(12, 14, 18, 0.74)),
    url("https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=80")
      center / cover no-repeat;
}

.prefooter-kicker {
  font-size: 0.74rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(243, 236, 222, 0.74);
}

.prefooter-shell h2 {
  color: #f5efe2;
  font-size: clamp(2rem, 5vw, 4.3rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
  max-width: 16ch;
}

.prefooter-btn {
  margin-top: 0.92rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.42rem;
  padding: 0.86rem 1.45rem;
  border-radius: 999px;
  color: var(--paper);
  background: linear-gradient(180deg, #2a2620, #191715);
  border: 1px solid rgba(255, 255, 255, 0.26);
  font-weight: 700;
  font-size: 0.94rem;
  line-height: 1.1;
  box-shadow: 0 12px 28px rgba(19, 19, 19, 0.3);
  transition: transform 0.25s ease, border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.18s ease, filter 0.18s ease;
}

.prefooter-btn-text-wrap {
  position: relative;
  display: inline-grid;
  overflow: hidden;
  height: 1.2em;
  line-height: 1.2;
  vertical-align: middle;
}

.prefooter-btn-text {
  grid-area: 1 / 1;
  display: inline-block;
  transition: transform 0.56s cubic-bezier(0.22, 1, 0.36, 1);
}

.prefooter-btn-text-top {
  transform: translateY(0);
}

.prefooter-btn-text-bottom {
  transform: translateY(120%);
}

.prefooter-btn:hover,
.prefooter-btn:focus-visible {
  transform: translateY(-2px);
  border-color: rgba(186, 152, 89, 0.8);
  background: linear-gradient(180deg, #2a2620, #191715);
  filter: brightness(1.03);
  box-shadow: 0 13px 29px rgba(19, 19, 19, 0.34);
  outline: none;
}

.prefooter-btn:hover .prefooter-btn-text-top,
.prefooter-btn:focus-visible .prefooter-btn-text-top {
  transform: translateY(-120%);
}

.prefooter-btn:hover .prefooter-btn-text-bottom,
.prefooter-btn:focus-visible .prefooter-btn-text-bottom {
  transform: translateY(0);
}

.prefooter-btn-arrow {
  display: inline-block;
  font-size: 1rem;
  line-height: 1;
  transform: translateX(0);
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.prefooter-btn:hover .prefooter-btn-arrow,
.prefooter-btn:focus-visible .prefooter-btn-arrow {
  transform: translateX(2px);
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

.site-footer {
  position: sticky;
  bottom: 0;
  z-index: 1;
  min-height: 32vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(2.4rem, 5vw, 3.4rem) 0 1.6rem;
  background: linear-gradient(180deg, rgba(244, 241, 234, 0.35), rgba(236, 231, 220, 0.72));
  border-top: 1px solid var(--line);
  margin-top: 0;
}

.footer-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) repeat(2, minmax(0, 0.8fr));
  gap: clamp(1rem, 2.5vw, 2rem);
  align-items: start;
}

.footer-logo {
  font-size: clamp(1rem, 1.4vw, 1.3rem);
  letter-spacing: -0.02em;
  font-weight: 700;
  color: var(--ink);
}

.footer-copy {
  margin-top: 0.7rem;
  max-width: 44ch;
  color: var(--muted);
  font-size: 0.96rem;
}

.footer-links,
.footer-social {
  display: grid;
  gap: 0.52rem;
}

.footer-links a,
.footer-social a {
  width: fit-content;
  position: relative;
  padding-bottom: 0.08rem;
  color: rgba(19, 19, 19, 0.9);
  font-size: 0.92rem;
}

.footer-links a::after,
.footer-social a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: rgba(19, 19, 19, 0.75);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-links a:hover::after,
.footer-links a:focus-visible::after,
.footer-social a:hover::after,
.footer-social a:focus-visible::after {
  transform: scaleX(1);
}

.footer-bottom {
  margin-top: 1.6rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--soft-line);
}

.footer-bottom p {
  color: rgba(19, 19, 19, 0.72);
  font-size: 0.82rem;
  letter-spacing: 0.05em;
}

@media (max-width: 900px) {
  .prefooter-stage {
    min-height: 56vh;
  }

  .prefooter-sticky {
    height: 48vh;
  }

  .prefooter-shell {
    height: 48vh;
  }

  .site-footer {
    min-height: 30vh;
  }

  .footer-shell {
    grid-template-columns: 1fr 1fr;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 640px) {
  .prefooter-stage {
    min-height: 50vh;
  }

  .prefooter-sticky {
    top: 0;
    height: 44vh;
  }

  .prefooter-shell {
    height: 44vh;
  }

  .site-footer {
    min-height: 28vh;
  }

  .prefooter-shell h2 {
    max-width: 14ch;
  }

  .footer-shell {
    grid-template-columns: 1fr;
  }
}
</style>
