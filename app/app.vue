<!--
  app.vue is the root of the website.
  It only places the sections in the right order.
  Nuxt finds the components in /components automatically,
  so we don't need any import statements.
-->
<template>
  <div>
    <!-- Stars + parallax sparkles behind everything.
         Remove this line to turn the background effects off. -->
    <AtmosphereBackground />

    <SiteHeader />

    <main>
      <HeroSection />
      <CharacterProfile />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider />
      <ContactSection />
    </main>
  </div>
</template>
