<script setup lang="ts">
withDefaults(
  defineProps<{
    prefooterKicker?: string;
    prefooterTitle?: string;
    prefooterCopy?: string;
    prefooterTall?: boolean;
    showHomeLinkInFooter?: boolean;
    replaceErrorsLinkWithAbout?: boolean;
    replaceCalculatorLinkWithHome?: boolean;
    calculatorFooterNavOrder?: boolean;
    replaceContactLinkWithHome?: boolean;
    kontaktFooterNavOrder?: boolean;
    poradnikFooterNavOrder?: boolean;
  }>(),
  {
    prefooterKicker: "Koniec przewijania? Zróbmy pierwszy krok.",
    prefooterTitle: "Sprzedaj mieszkanie spokojnie i na dobrych warunkach.",
    prefooterCopy: "",
    prefooterTall: false,
    showHomeLinkInFooter: false,
    replaceErrorsLinkWithAbout: false,
    replaceCalculatorLinkWithHome: false,
    calculatorFooterNavOrder: false,
    replaceContactLinkWithHome: false,
    kontaktFooterNavOrder: false,
    poradnikFooterNavOrder: false
  }
);

const year = new Date().getFullYear();
</script>

<template>
  <div class="footer-stack">
    <section class="prefooter-stage" :class="{ 'prefooter-stage--tall': prefooterTall }" aria-label="Sekcja końcowa">
      <div class="prefooter-sticky" :class="{ 'prefooter-sticky--tall': prefooterTall }">
        <div class="prefooter-shell" :class="{ 'prefooter-shell--tall': prefooterTall }">
          <p class="prefooter-kicker">{{ prefooterKicker }}</p>
          <h2>{{ prefooterTitle }}</h2>
          <p v-if="prefooterCopy" class="prefooter-copy">{{ prefooterCopy }}</p>
          <a href="#kontakt" class="prefooter-btn">
            <span class="prefooter-btn-text-wrap" aria-hidden="true">
              <span class="prefooter-btn-text prefooter-btn-text-top">Umów konsultację</span>
              <span class="prefooter-btn-text prefooter-btn-text-bottom">Umów konsultację</span>
            </span>
            <span class="sr-only">Umów konsultację</span>
            <span class="prefooter-btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>

    <footer class="site-footer">
      <div class="container footer-shell">
        <div class="footer-brand">
          <a href="/" class="footer-logo" aria-label="FIND home">
            <img src="/LOGO.png" alt="FIND" />
          </a>
          <p class="footer-copy">
            Eksperckie wsparcie właściciela mieszkania: od strategii ceny po bezpieczny podpis.
          </p>
        </div>

        <div class="footer-links">
          <template v-if="poradnikFooterNavOrder">
            <a href="/">Główna</a>
            <a href="/o-mnie">O mnie</a>
            <a href="/bledy">Błędy</a>
            <a href="/kalkulator">Kalkulator</a>
            <a href="/kontakt">Kontakt</a>
          </template>
          <template v-else-if="kontaktFooterNavOrder">
            <a href="/">Główna</a>
            <a href="/o-mnie">O mnie</a>
            <a href="/bledy">Błędy</a>
            <a href="/poradnik">Poradnik</a>
            <a href="/kalkulator">Kalkulator</a>
          </template>
          <template v-else-if="calculatorFooterNavOrder">
            <a href="/">Główna</a>
            <a href="/o-mnie">O mnie</a>
            <a href="/bledy">Błędy</a>
            <a href="/poradnik">Poradnik</a>
            <a href="/kontakt">Kontakt</a>
          </template>
          <template v-else>
            <a href="/">Główna</a>
            <a v-if="!replaceErrorsLinkWithAbout" href="/o-mnie">O mnie</a>
            <a v-if="replaceErrorsLinkWithAbout" href="/o-mnie">O mnie</a>
            <a v-else href="/bledy">Błędy</a>
            <a href="/poradnik">Poradnik</a>
            <a v-if="replaceCalculatorLinkWithHome" href="/">Kalkulator</a>
            <a v-else href="/kalkulator">Kalkulator</a>
            <a v-if="replaceContactLinkWithHome" href="/">Kontakt</a>
            <a v-else href="/kontakt">Kontakt</a>
          </template>
        </div>

        <div class="footer-social">
          <a href="#" aria-label="Instagram">
            <span class="social-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect>
                <circle cx="12" cy="12" r="4.1"></circle>
                <circle cx="17.35" cy="6.65" r="1"></circle>
              </svg>
            </span>
            Instagram
          </a>
          <a href="#" aria-label="Facebook">
            <span class="social-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M14.2 8.1h2.2V4.5h-2.6c-3 0-4.6 1.8-4.6 4.9v2H6.8v3.7h2.4V20h3.8v-4.9h2.9l.5-3.7h-3.4V9.8c0-1 .4-1.7 1.6-1.7Z"></path>
              </svg>
            </span>
            Facebook
          </a>
          <a href="#" aria-label="LinkedIn">
            <span class="social-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="4" y="9.2" width="3.4" height="10.8"></rect>
                <circle cx="5.7" cy="5.8" r="1.6"></circle>
                <path d="M10 9.2h3.3v1.5c.6-1 1.8-1.8 3.6-1.8 3 0 4.1 2 4.1 5.1V20h-3.5v-5.3c0-1.7-.6-2.6-1.9-2.6-1.5 0-2.2 1.1-2.2 2.6V20H10V9.2Z"></path>
              </svg>
            </span>
            LinkedIn
          </a>
        </div>
      </div>

      <div class="container footer-bottom">
        <p>© {{ year }} FIND. Wszelkie prawa zastrzeżone.</p>
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

.prefooter-stage--tall {
  min-height: 68vh;
}

.prefooter-sticky--tall,
.prefooter-shell--tall {
  height: 60vh;
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

.prefooter-copy {
  max-width: 60ch;
  color: rgba(243, 236, 222, 0.92);
}

.prefooter-btn {
  margin-top: 0.92rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.42rem;
  padding: 0.86rem 1.45rem;
  border-radius: 0;
  color: #f4eee2;
  background: rgba(16, 14, 12, 0.12);
  border: 2px solid rgba(244, 238, 226, 0.9);
  font-weight: 500;
  font-size: 0.94rem;
  line-height: 1.1;
  box-shadow: none;
  text-decoration: none;
  transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease;
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
  transform: none;
  border-color: rgba(244, 238, 226, 1);
  background: rgba(16, 14, 12, 0.26);
  filter: none;
  box-shadow: none;
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
  font-size: 1.15rem;
  line-height: 1;
  transform: translateX(0);
  opacity: 0.9;
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.32s ease;
}

.prefooter-btn:hover .prefooter-btn-arrow,
.prefooter-btn:focus-visible .prefooter-btn-arrow {
  transform: translateX(6px);
  opacity: 1;
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
  display: inline-flex;
  align-items: center;
  width: clamp(90px, 9vw, 130px);
}

.footer-logo img {
  display: block;
  width: 100%;
  height: auto;
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
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  position: relative;
  padding-bottom: 0.08rem;
  color: rgba(19, 19, 19, 0.9);
  font-size: 0.92rem;
}

.social-ico {
  display: inline-flex;
  width: 1.12rem;
  height: 1.12rem;
  color: var(--gold);
  transform: translateY(-0.01em);
}

.social-ico svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.footer-links a::after,
.footer-social a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: var(--gold);
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

.footer-links a:hover,
.footer-links a:focus-visible,
.footer-social a:hover,
.footer-social a:focus-visible {
  color: var(--gold);
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
