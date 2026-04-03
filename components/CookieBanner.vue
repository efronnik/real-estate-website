<script setup lang="ts">
const visible = ref(false);

const CONSENT_KEY = "cookie-consent-v1";

onMounted(() => {
  const saved = localStorage.getItem(CONSENT_KEY);
  visible.value = saved === null;
});

const saveConsent = (value: "accepted" | "rejected") => {
  localStorage.setItem(CONSENT_KEY, value);
  visible.value = false;
};
</script>

<template>
  <Transition name="cookie-fade">
    <aside v-if="visible" class="cookie-banner" role="dialog" aria-label="Ustawienia plików cookie">
      <p>
        Używamy plików cookie, aby poprawić działanie strony. Możesz zaakceptować lub odrzucić dodatkowe cookie.
        <a href="/polityka-prywatnosci">Polityka prywatności</a>
      </p>

      <div class="cookie-actions">
        <button type="button" class="cookie-btn cookie-btn-ghost" @click="saveConsent('rejected')">Odrzuć</button>
        <button type="button" class="cookie-btn" @click="saveConsent('accepted')">Akceptuj</button>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.cookie-banner {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 80;
  width: min(34rem, calc(100vw - 2rem));
  border: 1px solid rgba(244, 238, 226, 0.34);
  background: rgba(12, 12, 12, 0.95);
  color: #f4eee2;
  padding: 0.95rem;
  display: grid;
  gap: 0.8rem;
}

.cookie-banner p {
  margin: 0;
  line-height: 1.45;
  font-size: 0.92rem;
}

.cookie-banner a {
  color: var(--gold);
  text-decoration: underline;
  text-underline-offset: 0.16em;
}

.cookie-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.55rem;
}

.cookie-btn {
  border: 1px solid rgba(244, 238, 226, 0.9);
  background: rgba(16, 14, 12, 0.1);
  color: #f4eee2;
  padding: 0.54rem 0.95rem;
  cursor: pointer;
}

.cookie-btn-ghost {
  border-color: rgba(244, 238, 226, 0.36);
}

.cookie-btn:hover,
.cookie-btn:focus-visible {
  border-color: var(--gold);
  color: var(--gold);
  outline: none;
}

.cookie-fade-enter-active,
.cookie-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.cookie-fade-enter-from,
.cookie-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
