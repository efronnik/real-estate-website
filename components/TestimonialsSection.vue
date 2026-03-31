<script setup lang="ts">
const reviews = [
  {
    quote:
      "Mieszkanie sprzedane w 19 dni, a caly proces byl poukladany i przewidywalny od pierwszego spotkania.",
    author: "Alicja i Piotr, Gdansk"
  },
  {
    quote:
      "Najwieksza roznica? Profesjonalne negocjacje. Finalna cena byla wyzsza niz zakladalam na starcie.",
    author: "Monika, Warszawa"
  },
  {
    quote:
      "Bez chaosu i bez nerwow. Otrzymalismy konkretny plan i wsparcie az do podpisania aktu.",
    author: "Tomasz, Krakow"
  }
];
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">Zaufanie klientow</p>
        <h2>Skutecznosc widoczna w liczbach i decyzjach klientow</h2>
        <p>Prawdziwe historie sprzedazy, w ktorych liczyla sie cena, czas i spokoj calego procesu.</p>
      </div>
      <div class="review-grid">
        <article v-for="(item, idx) in reviews" :key="item.author" class="review-card reveal" :style="{ '--d': `${idx * 90}ms` }">
          <p class="review-quote">"{{ item.quote }}"</p>
          <p class="review-author">{{ item.author }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
