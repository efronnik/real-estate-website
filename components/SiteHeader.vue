<template>
  <header class="site-topbar">
    <a href="/" class="site-brand" aria-label="FIND home">
      <img src="/LOGO.png" alt="FIND" />
    </a>

    <nav class="site-nav" aria-label="Primary navigation">
      <a href="/">Główna</a>
      <a href="/o-mnie">O mnie</a>
      <a href="/bledy">Błędy</a>
      <a href="/poradnik">Poradnik</a>
      <a href="/kalkulator">Kalkulator</a>
      <a href="/kontakt">Kontakt</a>
    </nav>

    <div class="site-spacer" aria-hidden="true"></div>
  </header>
</template>

<style scoped>
.site-topbar {
  position: relative;
  width: min(1280px, calc(100% - 54px));
  margin: 10px auto 0;
  z-index: 60;
  padding: 8px 2px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 22px;
}

.site-brand {
  display: inline-flex;
  align-items: center;
  width: clamp(86px, 9vw, 128px);
  justify-self: start;
}

.site-brand img {
  display: block;
  width: 100%;
  height: auto;
}

.site-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 1.8vw, 30px);
  width: max-content;
  justify-self: center;
}

.site-spacer {
  justify-self: end;
  width: clamp(86px, 9vw, 128px);
}

.site-nav a {
  position: relative;
  display: inline-block;
  color: rgba(31, 31, 31, 0.94);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.93rem;
  padding-bottom: 0.2rem;
}

.site-nav a::after {
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

.site-nav a:hover,
.site-nav a:focus-visible {
  color: var(--gold);
}

.site-nav a:hover::after,
.site-nav a:focus-visible::after {
  transform: scaleX(1);
}

@media (max-width: 1024px) and (min-width: 768px) {
  .site-topbar {
    width: calc(100% - 30px);
    gap: 12px;
  }

  .site-brand { width: clamp(76px, 10vw, 104px); }
  .site-spacer { width: clamp(76px, 10vw, 104px); }
  .site-nav { gap: clamp(6px, 1.05vw, 11px); }
  .site-nav a { font-size: 0.72rem; }
}

@media (max-width: 767px) {
  .site-topbar {
    width: calc(100% - 26px);
    margin-top: 12px;
    padding: 8px 0;
    gap: 10px;
  }

  .site-brand { width: 82px; }
  .site-spacer { width: 82px; }
  .site-nav { display: none; }
}
</style>
