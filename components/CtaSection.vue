<script setup lang="ts">
const form = reactive({
  name: "",
  email: "",
  phone: "",
  city: "",
  message: ""
});

const submitted = ref(false);

const submitForm = () => {
  submitted.value = true;
};
</script>

<template>
  <section id="kontakt" class="section cta">
    <div class="container">
      <div class="shell reveal">
        <div class="copy">
          <div class="map-overlay"></div>
          <p class="vertical-label">Kontakt</p>
          <div class="copy-inner">
            <p class="eyebrow">Konsultacja / Wspolpraca</p>
            <h2>Warszawa, Polska</h2>
            <p>
              Pracujemy lokalnie, ale prowadzimy proces end-to-end. Dostajesz strategię, egzekucję
              i bezpieczny finał sprzedaży.
            </p>
          </div>
        </div>

        <form class="form reveal delay-1" @submit.prevent="submitForm">
          <label>
            Imie i nazwisko
            <input v-model="form.name" type="text" placeholder="Jan Kowalski" required />
          </label>

          <label>
            E-mail
            <input v-model="form.email" type="email" placeholder="jan@email.com" required />
          </label>

          <label>
            Telefon
            <input v-model="form.phone" type="tel" placeholder="+48 000 000 000" required />
          </label>

          <label>
            Miasto / dzielnica
            <input v-model="form.city" type="text" placeholder="Warszawa, Mokotow" required />
          </label>

          <label>
            Krotki opis mieszkania i sytuacji
            <textarea
              v-model="form.message"
              rows="4"
              placeholder="Metraz, liczba pokoi, standard, planowany termin sprzedazy..."
            />
          </label>

          <button type="submit">
            <span class="form-btn-text-wrap" aria-hidden="true">
              <span class="form-btn-text form-btn-text-top">Wyslij zapytanie</span>
              <span class="form-btn-text form-btn-text-bottom">Wyslij zapytanie</span>
            </span>
            <span class="sr-only">Wyslij zapytanie</span>
          </button>
          <p v-if="submitted" class="form-success">
            Dziekuje. Formularz jest gotowy do podlaczenia pod CRM lub automatyzacje e-mail.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(245, 240, 232, 0.7));
}

.cta :deep(.container) {
  width: min(1380px, calc(100% - 2.4rem));
}

.shell {
  border-radius: 0.35rem;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  background: #0b0d10;
  color: #f4efe4;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 26px 56px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
}

.copy {
  position: relative;
  min-height: 38rem;
  background:
    linear-gradient(165deg, rgba(19, 19, 19, 0.84), rgba(19, 19, 19, 0.62)),
    url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80")
      center / cover no-repeat;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.map-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 90% at 80% 10%, rgba(186, 152, 89, 0.22), rgba(186, 152, 89, 0)),
    linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25));
}

.vertical-label {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.72);
  z-index: 2;
}

.copy-inner {
  position: absolute;
  left: clamp(2.6rem, 5vw, 4.2rem);
  bottom: clamp(1.4rem, 3vw, 2.2rem);
  right: clamp(1.2rem, 3vw, 2rem);
  display: grid;
  gap: 0.75rem;
  z-index: 2;
}

.copy-inner h2 {
  font-size: clamp(2.1rem, 5vw, 3.8rem);
  line-height: 0.95;
  margin: 0;
  color: var(--gold);
  letter-spacing: -0.03em;
}

.copy-inner p:last-child {
  margin: 0;
  max-width: 40ch;
  color: rgba(246, 241, 230, 0.84);
  font-size: 0.98rem;
}

.form {
  padding: clamp(1.3rem, 2.6vw, 2rem);
  display: grid;
  align-content: center;
  gap: 0.8rem;
  background: #0b0d10;
}

.form label {
  display: grid;
  gap: 0.55rem;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.74);
}

.form input,
.form textarea {
  width: 100%;
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.26);
  background: transparent;
  padding: 0.55rem 0.15rem 0.6rem;
  font: inherit;
  color: #f4efe4;
  resize: vertical;
}

.form input:focus,
.form textarea:focus {
  outline: none;
  border-bottom-color: rgba(186, 152, 89, 0.95);
}

.form button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.8rem;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--gold);
  font-weight: 700;
  padding: 0.9rem 0;
  border-bottom: 1px solid rgba(186, 152, 89, 0.82);
  cursor: pointer;
  transition: letter-spacing 0.25s ease, border-color 0.25s ease;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.form button:hover {
  letter-spacing: 0.16em;
  border-bottom-color: rgba(186, 152, 89, 1);
}

.form-btn-text-wrap {
  position: relative;
  display: inline-grid;
  overflow: hidden;
  height: 1.2em;
  line-height: 1.2;
}

.form-btn-text {
  grid-area: 1 / 1;
  display: inline-block;
  transition: transform 0.56s cubic-bezier(0.22, 1, 0.36, 1);
}

.form-btn-text-top {
  transform: translateY(0);
}

.form-btn-text-bottom {
  transform: translateY(120%);
}

.form button:hover .form-btn-text-top,
.form button:focus-visible .form-btn-text-top {
  transform: translateY(-120%);
}

.form button:hover .form-btn-text-bottom,
.form button:focus-visible .form-btn-text-bottom {
  transform: translateY(0);
}

.form button:focus-visible {
  outline: none;
  border-bottom-color: rgba(186, 152, 89, 1);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.form-success {
  font-size: 0.84rem;
  color: #8ad09e;
}

@media (max-width: 1024px) and (min-width: 768px) {
  .shell {
    grid-template-columns: 1fr;
  }

  .copy {
    min-height: 24rem;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .vertical-label {
    display: none;
  }

  .copy-inner {
    left: 1.2rem;
    right: 1.2rem;
    bottom: 1.2rem;
  }

  .form {
    padding: 1.4rem 1.2rem;
  }
}

@media (max-width: 920px) {
  .shell {
    grid-template-columns: 1fr;
  }

  .copy {
    min-height: 23rem;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .vertical-label {
    display: none;
  }

  .copy-inner {
    left: 1rem;
    right: 1rem;
  }
}
</style>
