<!--
  ContactSection: there is no Figma design for this yet,
  so it uses the same card style as the Character Profile.
  TODO: the addresses below use my name, but are not my real accounts yet.
  Replace `text` and `href` with my real e-mail, LinkedIn and GitHub links.
-->
<script setup>
const contacts = [
  { label: 'E-mail', text: 'marie-lou@email.nl', href: 'mailto:marie-lou@email.nl' },
  { label: 'LinkedIn', text: 'linkedin.com/in/marie-lou', href: 'https://www.linkedin.com/' },
  { label: 'GitHub', text: 'github.com/marie-lou', href: 'https://github.com/' }
]
</script>

<template>
  <section id="contact" class="contact container">
    <SectionGlow color="purple" x="50%" y="55%" />
    <h2 class="section-title">Contact</h2>
    <p class="section-subtitle">Ready for the next level? Let's talk.</p>

    <div class="contact-card">
      <a
        v-for="item in contacts"
        :key="item.label"
        :href="item.href"
        class="contact-link"
        target="_blank"
        rel="noopener"
      >
        <span class="contact-label">{{ item.label }}</span>
        <span class="contact-text">{{ item.text }}</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding-top: 80px;
  padding-bottom: 160px;
}

.contact-card {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 700px;
  margin: 64px auto 0;
  padding: 56px 64px;
  border: 1px solid var(--color-border-dark);
}

.contact-link {
  display: flex;
  flex-direction: column;
}

.contact-label {
  font-size: 20px;
  color: var(--color-text-muted);
}

.contact-text {
  font-size: clamp(20px, 2.4vw, 28px);
  font-weight: 500;
  overflow-wrap: anywhere; /* long links wrap on small screens */
}

.contact-link:hover .contact-text {
  color: var(--color-accent-light);
}

@media (max-width: 600px) {
  .contact-card {
    padding: 32px 24px;
  }
}
</style>
