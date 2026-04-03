<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const rootEl = ref<HTMLElement | null>(null);
const progress = ref(0);

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

let rafId = 0;
const updateProgress = () => {
  if (!rootEl.value || !import.meta.client) return;

  const rect = rootEl.value.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const total = rect.height + vh;
  const offset = vh - rect.top;
  progress.value = clamp(offset / total, 0, 1);
};

const onScroll = () => {
  if (rafId) return;
  rafId = window.requestAnimationFrame(() => {
    updateProgress();
    rafId = 0;
  });
};

onMounted(() => {
  updateProgress();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  if (rafId) window.cancelAnimationFrame(rafId);
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
});

const titleAccentOpacity = computed(() => clamp((progress.value - 0.12) / 0.26, 0.22, 1));
const bodyOpacity = computed(() => clamp((progress.value - 0.34) / 0.28, 0.2, 1));

const arrowOpacity = (idx: number) => computed(() => {
  const start = 0.16 + idx * 0.1;
  return clamp((progress.value - start) / 0.16, 0.12, 1);
});

const arrows = [
  {
    title: "Ekspert",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
    opacity: arrowOpacity(0)
  },
  {
    title: "Wnetrze",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    opacity: arrowOpacity(1)
  },
  {
    title: "Prezentacja",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    opacity: arrowOpacity(2)
  },
  {
    title: "Finalizacja",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=1200&q=80",
    opacity: arrowOpacity(3)
  }
];
</script>

<template>
  <section ref="rootEl" class="section story">
    <div class="container">
      <p class="story-title">
        To nie jest tylko
        <span :style="{ opacity: titleAccentOpacity }">o sprzedaży mieszkania.</span>
      </p>

      <div class="arrow-row">
        <article
          v-for="item in arrows"
          :key="item.title"
          class="arrow-card"
          :style="{ '--bg': `url(${item.image})`, opacity: item.opacity.value }"
        >
          <span>{{ item.title }}</span>
        </article>
      </div>

      <p class="story-copy" :style="{ opacity: bodyOpacity }">
        To kwestia tozsamosci. Postepu. Wyjscia z impasu.<br />
        Nie szukasz tylko miejsca.
        <span>Szukasz dopasowania. W tym wlasnie pomagamy.</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.story {
  background: #f3f3f1;
  color: #181818;
  padding-top: clamp(3.6rem, 8vw, 5.2rem);
  padding-bottom: clamp(3.6rem, 8vw, 5.4rem);
}

.story-title {
  text-align: center;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.02;
  font-size: clamp(1.7rem, 4.1vw, 3.4rem);
}

.story-title span {
  color: #9b9b9e;
  transition: opacity 0.25s ease;
}

.arrow-row {
  margin: 1.6rem auto 0;
  width: min(760px, 100%);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.45rem;
}

.arrow-card {
  position: relative;
  min-height: clamp(12.8rem, 22vw, 16.2rem);
  clip-path: polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%, 30% 50%);
  overflow: hidden;
  background-image:
    linear-gradient(170deg, rgba(12, 12, 12, 0.15), rgba(12, 12, 12, 0.45)),
    var(--bg);
  background-size: cover;
  background-position: center;
  transition: opacity 0.3s ease;
}

.arrow-card span {
  position: absolute;
  left: 18%;
  bottom: 12%;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 700;
}

.story-copy {
  margin-top: 1.35rem;
  text-align: center;
  font-size: clamp(0.9rem, 1.55vw, 1.45rem);
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.02em;
  transition: opacity 0.3s ease;
  max-width: 38ch;
  margin-left: auto;
  margin-right: auto;
}

.story-copy span {
  color: #9d9da0;
}


@media (max-width: 1024px) and (min-width: 768px) {
  .arrow-row {
    gap: 0.06rem;
  }
}

@media (max-width: 767px) {
  .arrow-row {
    grid-template-columns: repeat(2, 1fr);
    width: min(520px, 100%);
  }
}

@media (max-width: 680px) {
  .arrow-row {
    grid-template-columns: 1fr;
  }

  .arrow-card {
    clip-path: polygon(0 0, 78% 0, 100% 50%, 78% 100%, 0 100%, 22% 50%);
  }
}
</style>
