<!--
  SiteHeader: the rounded bar at the top with my name and the menu.
  The menu links point to section ids (#home, #projects, ...)
  so the browser scrolls down to that section.
-->
<script setup>
// The menu items live in an array, so adding a link = adding one line.
const links = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
]
</script>

<template>
  <header class="site-header">
    <a href="#home" class="brand">
      <img src="/images/avatar.png" alt="" class="brand-avatar" />
      <div>
        <p class="brand-name">M. Kwidama</p>
        <p class="brand-role">Front End Developer</p>
      </div>
    </a>

    <nav class="nav" aria-label="Hoofdmenu">
      <!-- v-for repeats the <a> for every item in the links array -->
      <a v-for="link in links" :key="link.href" :href="link.href" class="nav-link">
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: var(--page-width);
  min-height: 121px;
  margin: 0 auto;
  padding: 0 180px 0 12px;
  border: 3px solid var(--color-accent);
  border-radius: 40px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 24px;
}

.brand-avatar {
  width: 68px;
  height: 68px;
  image-rendering: pixelated; /* keeps the pixel art sharp */
}

.brand-name {
  font-size: 18px;
}

.brand-role {
  font-size: 18px;
  color: var(--color-accent);
}

.nav {
  display: flex;
  gap: 100px;
}

.nav-link {
  font-size: 26px;
  font-weight: 500;
}

.nav-link:hover {
  color: var(--color-accent-light);
}

/* ---------- Responsive ---------- */
@media (max-width: 1200px) {
  .site-header {
    padding-right: 40px;
  }
  .nav {
    gap: 40px;
  }
}

/* On small screens the menu goes under the name */
@media (max-width: 760px) {
  .site-header {
    flex-direction: column;
    padding: 16px;
    border-radius: 24px;
  }
  .nav {
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .nav-link {
    font-size: 20px;
  }
}
</style>
