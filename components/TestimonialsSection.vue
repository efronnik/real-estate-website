<script setup lang="ts">
const reviews = [
  {
    quote:
      "Mieszkanie sprzedane w 19 dni, a cały proces był poukładany i przewidywalny od pierwszego spotkania.",
    author: "Alicja i Piotr, Gdańsk"
  },
  {
    quote:
      "Największa różnica? Profesjonalne negocjacje. Finalna cena była wyższa niż zakładałam na starcie.",
    author: "Monika, Warszawa"
  },
  {
    quote:
      "Bez chaosu i bez nerwów. Otrzymaliśmy konkretny plan i wsparcie aż do podpisania aktu.",
    author: "Tomasz, Kraków"
  }
];
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <p class="eyebrow">Zaufanie klientów</p>
        <h2>Skuteczność widoczna w liczbach i decyzjach klientów</h2>
        <p>Prawdziwe historie sprzedaży, w których liczyła się cena, czas i spokój całego procesu.</p>
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
