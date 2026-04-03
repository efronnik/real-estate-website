<script setup lang="ts">
const poradnikPaths = [
  {
    label: "01",
    title: "Start sprzedaży (0-14 dni)",
    text: "Od audytu mieszkania po publikację oferty. Kolejność decyzji, które budują dobry start i tempo zapytań.",
    hero: "Start",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    label: "02",
    title: "Oferta już wisi, brak efektu",
    text: "Plan naprawczy dla ogłoszeń, które nie generują wartościowych leadów: cena, komunikat i ekspozycja.",
    hero: "Naprawa",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    label: "03",
    title: "Negocjacje i obrona ceny",
    text: "Przygotowanie argumentów, granic ustępstw i scenariusza rozmów, aby nie oddawać marży pod presją.",
    hero: "Obrona",
    image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    label: "04",
    title: "Finalizacja i bezpieczeństwo",
    text: "Checklista dokumentów, terminów i przekazania nieruchomości, żeby domknąć transakcję spokojnie i bez opóźnień.",
    hero: "Final",
    image: "https://images.pexels.com/photos/48195/document-agreement-documents-sign-48195.jpeg?auto=compress&cs=tinysrgb&w=1800"
  }
];
</script>

<template>
  <div>
    <main>
      <section class="section poradnik-hero">
        <video class="poradnik-hero-video" autoplay muted loop playsinline preload="metadata" aria-hidden="true">
          <source src="/Hero-Blog.mp4" type="video/mp4" />
        </video>
        <div class="poradnik-hero-overlay" aria-hidden="true"></div>

        <div class="container poradnik-hero-shell">
          <p class="eyebrow">Poradnik</p>
          <h1 class="section-title">Blog i poradnik sprzedaży mieszkania</h1>
          <p class="section-copy">
            Zebrane w jednym miejscu: wycena, przygotowanie oferty, dokumenty, podatki i negocjacje.
            Treści ułożone tak, aby przeprowadzić Cię od decyzji o sprzedaży do bezpiecznej finalizacji.
          </p>
        </div>
      </section>

      <BlogSection :show-header="false" :full-bleed="true" />

      <ProcessSection
        class="poradnik-process"
        eyebrow="Jak korzystać z poradnika"
        title="Ścieżki czytania zamiast listy błędów"
        :steps="poradnikPaths"
      />

      <section class="section poradnik-structure">
        <div class="container">
          <div class="surface faq-box">
            <h3>FAQ: najczęstsze pytania właścicieli mieszkań</h3>

            <article class="faq-item">
              <h4>Od czego zacząć sprzedaż mieszkania, żeby nie tracić czasu?</h4>
              <p>
                Zacznij od krótkiego audytu: realna cena startowa, plan przygotowania mieszkania i harmonogram publikacji.
                Bez tej kolejności ogłoszenie często trafia na rynek zbyt wcześnie i od razu traci dynamikę.
              </p>
            </article>

            <article class="faq-item">
              <h4>Ile czasu dać ofercie, zanim zmieniać cenę?</h4>
              <p>
                Najpierw analizuj dane z pierwszych 7-14 dni: liczba zapytań, jakość rozmów i reakcje po prezentacjach.
                Dopiero na tej podstawie podejmuj decyzję o korekcie ceny, zdjęć albo opisu.
              </p>
            </article>

            <article class="faq-item">
              <h4>Jakie dokumenty przygotować przed publikacją ogłoszenia?</h4>
              <p>
                Minimum to komplet dokumentów własności i dokumentów potrzebnych do bezpiecznej finalizacji.
                Im wcześniej to zrobisz, tym mniejsze ryzyko opóźnień oraz słabszej pozycji negocjacyjnej pod koniec procesu.
              </p>
            </article>

            <article class="faq-item">
              <h4>Czy home staging i profesjonalne zdjęcia naprawdę robią różnicę?</h4>
              <p>
                Tak, bo pierwsza decyzja kupującego zapada w ogłoszeniu. Dobrze przygotowane wnętrze i spójne zdjęcia
                podnoszą liczbę jakościowych zapytań i skracają czas dochodzenia do spotkania.
              </p>
            </article>

            <article class="faq-item">
              <h4>Jak negocjować, żeby nie oddać ceny na starcie?</h4>
              <p>
                Ustal przed rozmowami warunki graniczne i kolejność ustępstw. Dzięki temu odpowiadasz spokojnie na presję
                kupującego i bronisz ceny argumentami, a nie emocjami.
              </p>
            </article>

            <article class="faq-item">
              <h4>Kiedy warto skonsultować sprzedaż z ekspertem?</h4>
              <p>
                Najlepiej na starcie albo wtedy, gdy oferta jest aktywna, ale nie daje efektu. To momenty, w których
                zmiana strategii najszybciej poprawia wynik sprzedaży i ogranicza koszt czasu.
              </p>
            </article>
          </div>
        </div>
      </section>

    </main>
    <FooterSection
      :poradnik-footer-nav-order="true"
      prefooter-kicker="Potrzebujesz strategii dopasowanej do Twojego mieszkania?"
      prefooter-title="Umów krótką rozmowę i sprawdźmy, jakie działania najszybciej poprawią wynik sprzedaży."
      :prefooter-tall="true"
    />
  </div>
</template>

<style scoped>
.poradnik-hero {
  position: relative;
  overflow: hidden;
  min-height: clamp(24rem, 56vh, 38rem);
  display: grid;
  align-items: center;
  padding: 0;
  background: #0d0f11;
}

.poradnik-hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.poradnik-hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(160deg, rgba(7, 7, 8, 0.82), rgba(7, 7, 8, 0.68)),
    radial-gradient(circle at 16% 14%, rgba(186, 152, 89, 0.24), transparent 45%);
}

.poradnik-hero-shell {
  position: relative;
  z-index: 2;
  display: grid;
  gap: 0.8rem;
  padding: clamp(2rem, 5vh, 3.4rem) 0;
}

.poradnik-hero-shell .section-title,
.poradnik-hero-shell .section-copy {
  color: #f5efe2;
}

.poradnik-hero-shell .section-title {
  max-width: 13ch;
}

.poradnik-hero-shell .section-copy {
  max-width: 56ch;
  color: rgba(245, 239, 226, 0.9);
}

.poradnik-structure {
  background: #f1ede6;
}

.poradnik-process :deep(.service-row::before) {
  background-image:
    linear-gradient(160deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.74)),
    var(--bg);
}

.poradnik-process :deep(.service-info p:last-child) {
  color: rgba(247, 242, 232, 0.95);
  font-size: 1.02rem;
  line-height: 1.58;
  max-width: 62ch;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.34);
}

.faq-box {
  margin-top: clamp(1.1rem, 2.4vw, 1.6rem);
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding: clamp(1.3rem, 3vw, 2rem) clamp(1rem, 3vw, 2.2rem);
  border: 1px solid rgba(255, 255, 255, 0.14);
  background:
    linear-gradient(130deg, rgba(13, 13, 13, 0.96), rgba(25, 25, 25, 0.9)),
    radial-gradient(circle at 18% 20%, rgba(196, 160, 88, 0.14), transparent 40%);
}

.faq-box h3 {
  margin-bottom: 0.95rem;
  color: #f3efe6;
  font-size: clamp(1.55rem, 3vw, 2.2rem);
  line-height: 1.05;
  letter-spacing: -0.015em;
}

.faq-item {
  padding: 1rem 1.05rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(8, 8, 8, 0.28);
}

.faq-item + .faq-item {
  margin-top: 0.72rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.faq-item h4 {
  margin-bottom: 0.45rem;
  color: #f6f2ea;
  font-size: clamp(1.04rem, 1.5vw, 1.28rem);
  line-height: 1.24;
}

.faq-item p {
  color: rgba(246, 242, 234, 0.8);
  line-height: 1.56;
}


@media (max-width: 900px) {
  .poradnik-process :deep(.service-info p:last-child) {
    font-size: 0.98rem;
  }
}
</style>
