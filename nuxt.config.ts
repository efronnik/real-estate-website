export default defineNuxtConfig({
  devtools: { enabled: false },
  experimental: {
    appManifest: false
  },
  css: ["~/assets/css/main.css"],
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 800,
        ignored: [
          "**/.git/**",
          "**/.output/**",
          "**/.nuxt/**",
          "**/.tmp/**",
          "**/node_modules/**",
          "**/.cursor/**"
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
            "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        }
      ]
    }
  }
});
