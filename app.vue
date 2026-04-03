<script setup lang="ts">
const route = useRoute();
const showGlobalHeader = computed(() => route.path !== "/");
</script>

<template>
  <div>
    <SiteHeader v-if="showGlobalHeader" />
    <NuxtPage />
    <CookieBanner />
    <ScrollTopButton />
  </div>
</template>
