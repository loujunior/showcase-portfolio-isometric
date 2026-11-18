// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Global stylesheet: loaded on every page
  css: ['~/assets/css/main.css'],

  // Things that go inside <head> of the HTML page
  app: {
    head: {
      htmlAttrs: { lang: 'nl' },
      title: 'Marie-lou Kwidama | Portfolio',
      meta: [
        { name: 'description', content: 'Portfolio van Marie-lou Kwidama, Front End Developer.' }
      ],
      link: [
        // Pixel fonts from Google Fonts (swap these if you use other fonts in Figma)
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&family=Silkscreen&family=Share+Tech+Mono&display=swap'
        }
      ]
    }
  }
})
