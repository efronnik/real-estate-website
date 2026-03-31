<script setup lang="ts">
const posts = [
  {
    title: "7 sygnalow, ze cena blokuje sprzedaz",
    excerpt: "Jak odczytac dane z rynku i ustawic cene mieszkania, zanim negocjacje zaczna zabierac Twoj margines.",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
    meta: "Warszawa / analiza rynku",
    cta: "Czytaj analize"
  },
  {
    title: "Home staging premium bez przepalania budzetu",
    excerpt: "Co realnie podnosi postrzegana wartosc mieszkania i pomaga szybciej domknac decyzje klienta.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    meta: "home staging / premium",
    cta: "Zobacz checklist"
  },
  {
    title: "Dokumenty do sprzedazy: checklista eksperta",
    excerpt: "Lista formalnosci, ktora przyspiesza final i ogranicza ryzyko zerwania transakcji.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    meta: "formalnosci / bezpieczenstwo",
    cta: "Pobierz liste"
  },
  {
    title: "Negocjacje ceny: scenariusze rozmowy",
    excerpt: "Jak odpowiadac na presje klienta i utrzymac finalna cene bez utraty kontroli nad procesem.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    meta: "negocjacje / strategie",
    cta: "Czytaj poradnik"
  }
];

const featuredPost = posts[0];
const sidePosts = posts.slice(1);
</script>

<template>
  <section id="blog" class="section blog">
    <div class="container">
      <header class="reveal blog-head">
        <p class="eyebrow">Blog / artykuly</p>
        <h2 class="section-title sweep-reveal">Perspektywa ekspercka w estetyce nowoczesnego magazynu</h2>
        <p class="section-copy">
          Materialy, ktore realnie przygotowuja do sprzedazy i negocjacji. Bez ogolnikow, tylko
          decyzje, ktore poprawiaja wynik finansowy.
        </p>
      </header>

      <div class="editorial reveal">
        <div class="editorial-bg" :style="{ backgroundImage: `url(${featuredPost.image})` }">
          <div class="scan-lines" aria-hidden="true"></div>
          <div class="scan-lines-right" aria-hidden="true"></div>

          <article class="featured-copy">
            <p class="meta">{{ featuredPost.meta }}</p>
            <h3>{{ featuredPost.title }}</h3>
            <p>{{ featuredPost.excerpt }}</p>
            <a href="#" class="link-arrow">{{ featuredPost.cta }}</a>
          </article>

          <div class="dock">
            <article v-for="(post, idx) in sidePosts" :key="post.title" class="dock-card" :class="`delay-${Math.min(idx + 1, 3)}`">
              <div class="dock-thumb" :style="{ backgroundImage: `url(${post.image})` }"></div>
              <div class="dock-copy">
                <p class="meta">{{ post.meta }}</p>
                <h4>{{ post.title }}</h4>
                <a href="#" class="link-arrow">{{ post.cta }}</a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-head {
  display: grid;
  gap: 1rem;
}

.blog-head :deep(.section-title) {
  line-height: 1.08;
  padding-bottom: 0.14em;
}

.editorial {
  margin-top: 2.2rem;
  position: relative;
  padding: 0.9rem;
  background: #0b0d10;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.28rem;
}

.editorial-bg {
  position: relative;
  min-height: clamp(26rem, 52vw, 41rem);
  border-radius: 0.2rem;
  overflow: hidden;
  background-size: cover;
  background-position: center;
}

.editorial-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(6, 9, 12, 0.08), rgba(6, 9, 12, 0.52) 55%, rgba(6, 9, 12, 0.88) 100%),
    radial-gradient(80% 70% at 20% 10%, rgba(6, 9, 12, 0.2), rgba(6, 9, 12, 0.72));
  z-index: 0;
}

.scan-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0) calc(25% - 1px),
      rgba(255, 255, 255, 0.1) calc(25% - 1px),
      rgba(255, 255, 255, 0.1) 25%
    );
  opacity: 0.34;
  z-index: 1;
}

.scan-lines-right {
  position: relative;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: clamp(7rem, 18%, 11rem);
  background:
    repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.4) 0 1px,
      rgba(255, 255, 255, 0) 1px 2.1rem
    );
  opacity: 0.4;
  z-index: 2;
}

.featured-copy {
  position: absolute;
  left: clamp(1rem, 2.6vw, 2.2rem);
  bottom: clamp(1rem, 2.6vw, 2.2rem);
  width: min(40rem, calc(100% - 3rem));
  z-index: 2;
  padding: 1.1rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: linear-gradient(180deg, rgba(13, 15, 18, 0.5), rgba(13, 15, 18, 0.8));
  color: #f3eee2;
}

.featured-copy h3 {
  margin-top: 0.55rem;
  font-size: clamp(1.4rem, 2.4vw, 2.35rem);
  line-height: 0.98;
  max-width: 16ch;
}

.featured-copy p {
  margin-top: 0.62rem;
  max-width: 56ch;
  color: rgba(243, 238, 226, 0.78);
}

.dock {
  position: absolute;
  right: clamp(0.7rem, 2vw, 1.2rem);
  bottom: clamp(0.7rem, 2vw, 1.2rem);
  width: min(23rem, 34%);
  display: grid;
  gap: 0.7rem;
  z-index: 3;
}

.dock-card {
  display: grid;
  grid-template-columns: 6.2rem 1fr;
  gap: 0.7rem;
  padding: 0.55rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(8, 10, 14, 0.62);
  backdrop-filter: blur(2px);
  transition: transform 0.28s ease, border-color 0.28s ease, background 0.28s ease;
}

.dock-card:hover {
  transform: translateX(-3px);
  border-color: rgba(186, 152, 89, 0.52);
  background: rgba(8, 10, 14, 0.74);
}

.dock-thumb {
  min-height: 4.7rem;
  background-size: cover;
  background-position: center;
}

.dock-copy {
  display: grid;
  align-content: center;
  gap: 0.4rem;
}

.dock-copy h4 {
  font-size: 0.95rem;
  line-height: 1.1;
  color: #f3eee2;
}

.meta {
  font-size: 0.73rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #d5b880;
  font-weight: 700;
}

.link-arrow {
  margin-top: 0.15rem;
}

@media (max-width: 900px) {
  .editorial-bg {
    min-height: clamp(24rem, 88vw, 34rem);
  }

  .dock {
    position: relative;
    right: auto;
    bottom: auto;
    width: calc(100% - 1.6rem);
    margin: 0 auto 0.8rem;
    grid-template-columns: 1fr;
    z-index: 4;
  }

  .featured-copy {
    width: calc(100% - 1.6rem);
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: 1rem;
  }

  .scan-lines-right {
    display: none;
  }
}

@media (max-width: 680px) {
  .dock-card {
    grid-template-columns: 1fr;
  }

  .dock-thumb {
    min-height: 7.5rem;
  }
}
</style>
