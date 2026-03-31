export default defineNuxtConfig({
  devtools: { enabled: false },
  experimental: {
    appManifest: false
  },
  css: ["~/assets/css/main.css"],
  vite: {
    server: {
      watch: {
        ignored: [
          "**/.git/**",
          "**/.output/**",
          "**/.nuxt/**",
          "**/.tmp/**",
          "**/node_modules/**"
        ]
      }
    }
  },
  app: {
    head: {
      title: "Ekspert Nieruchomosci - Sprzedaj mieszkanie szybciej",
      meta: [
        {
          name: "description",
          content:
            "Nowoczesny landing page eksperta nieruchomosci, ktory pomaga szybko i poprawnie sprzedac mieszkanie."
        }
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        }
      ]
    }
  }
});
