<script setup lang="ts">
const scrollToTop = () => {
  if (!import.meta.client) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <button class="to-top" type="button" aria-label="Wróć na górę" @click="scrollToTop">
    <span aria-hidden="true">↑</span>
  </button>
</template>

<style scoped>
.to-top {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 40;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid rgba(244, 238, 226, 0.9);
  background: rgba(16, 14, 12, 0.82);
  color: #f4eee2;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.to-top span {
  font-family: "Segoe UI Symbol", "Arial Unicode MS", Arial, sans-serif;
  font-size: 1.25rem;
  line-height: 1;
}

.to-top:hover,
.to-top:focus-visible {
  border-color: var(--gold);
  color: var(--gold);
  transform: translateY(-2px);
  outline: none;
}
</style>
