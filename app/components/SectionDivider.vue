<!--
  SectionDivider: a small decorative line between two sections.
  A fading line – a pixel diamond with two tiny dots – a fading line.
  No props: just place <SectionDivider /> between sections.
-->
<template>
  <div class="divider" aria-hidden="true">
    <span class="line line-left" />
    <span class="dot" />
    <span class="diamond" />
    <span class="dot" />
    <span class="line line-right" />
  </div>
</template>

<style scoped>
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  max-width: 560px;
  margin: 0 auto;
  padding: 0 var(--page-padding);
  opacity: 0.6; /* keep it subtle */
}

/* The lines fade out towards the ends */
.line {
  flex: 1;
  height: 1px;
}
.line-left {
  background: linear-gradient(to right, transparent, var(--color-accent));
}
.line-right {
  background: linear-gradient(to left, transparent, var(--color-accent));
}

.diamond {
  width: 8px;
  height: 8px;
  background-color: var(--color-accent-light);
  transform: rotate(45deg);
}

.dot {
  width: 3px;
  height: 3px;
  background-color: var(--color-accent);
}
</style>
