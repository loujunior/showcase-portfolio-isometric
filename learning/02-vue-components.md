# 2. Vue components

A component is a reusable piece of the page in its own `.vue` file.
Every `.vue` file has (up to) three parts:

```vue
<script setup>
  // JavaScript: data and logic for this component
  const links = [{ label: 'Home', href: '#home' }]
</script>

<template>
  <!-- HTML: what the component shows -->
  <nav>...</nav>
</template>

<style scoped>
  /* CSS: only applies to THIS component (because of "scoped") */
  nav { display: flex; }
</style>
```

## Why split the page into components?

- **Easier to read**: `HeroSection.vue` only contains the hero.
- **Easier to change**: a bug in the header? Open `SiteHeader.vue`.
- **Reusable**: `StatBar` is written once and used 3 times;
  `ProjectCard` once and used 4 times.

## `scoped` styles

With `<style scoped>`, a class like `.title` in one component does not
affect a `.title` in another. Vue adds a hidden attribute to make each
component's CSS private. Global styles (used everywhere) live in
`assets/css/main.css` instead.

## Components in this project

| Component | What it does |
|---|---|
| `SiteHeader` | logo/name + menu |
| `HeroSection` | "Welcome to my world" + room image |
| `PixelCorners` | the 4 small corner brackets (reused twice) |
| `CharacterProfile` | profile card with tools and stats |
| `StatBar` | one stat bar + % label, fills when visible (reused 3×) |
| `AboutSection` | character + dialogue box |
| `DialogueBox` | retro dialogue box with typewriter text |
| `AtmosphereBackground` | stars + parallax sparkles behind the page |
| `SectionGlow` | soft coloured light behind a section |
| `SectionDivider` | decorative line between sections |
| `ProjectsSection` | title + list of cards |
| `ProjectCard` | one project: image frame + card, can be reversed (reused 3×) |
| `ContactSection` | contact links |
