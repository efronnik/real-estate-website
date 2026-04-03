<template>
  <div>
    <main class="kontakt-page">
      <section class="section kontakt-hero">
        <video class="kontakt-hero-video" autoplay muted loop playsinline preload="metadata" aria-hidden="true">
          <source src="/Hero-Kontakt.mp4" type="video/mp4" />
        </video>
        <div class="kontakt-hero-overlay" aria-hidden="true"></div>

        <div class="container kontakt-hero-shell">
          <p class="eyebrow">Kontakt</p>
          <h1 class="section-title">Porozmawiajmy o sprzedaży Twojej nieruchomości</h1>
          <p class="section-copy">
            Krótka konsultacja wystarczy, żeby ustalić kierunek działań i bezpieczny plan sprzedaży.
          </p>
        </div>
      </section>

      <CtaSection />
    </main>
    <FooterSection :kontakt-footer-nav-order="true" />
  </div>
</template>

<style scoped>
.kontakt-hero {
  position: relative;
  overflow: hidden;
  min-height: clamp(24rem, 56vh, 38rem);
  display: grid;
  align-items: center;
  padding: 0;
  background: #0d0f11;
}

.kontakt-hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.kontakt-hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(160deg, rgba(7, 7, 8, 0.82), rgba(7, 7, 8, 0.68)),
    radial-gradient(circle at 16% 14%, rgba(186, 152, 89, 0.24), transparent 45%);
}

.kontakt-hero-shell {
  position: relative;
  z-index: 2;
  padding: clamp(2rem, 5vh, 3.4rem) 0;
}

.kontakt-hero-shell .section-title,
.kontakt-hero-shell .section-copy {
  color: #f5efe2;
}

.kontakt-hero-shell .section-title {
  max-width: 14ch;
}

.kontakt-hero-shell .section-copy {
  max-width: 56ch;
  color: rgba(245, 239, 226, 0.9);
}

.kontakt-page :deep(.cta .container) {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}

.kontakt-page :deep(.cta .shell) {
  border-radius: 0;
}
</style>
