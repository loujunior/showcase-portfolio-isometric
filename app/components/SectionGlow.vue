<!--
  SectionGlow: a very soft coloured light behind a section.
  Put it as the first thing inside a <section>.

  Props:
    color – 'blue' or 'purple'
    x, y  – position of the centre inside the section (CSS values, e.g. '75%')
    size  – diameter of the glow (e.g. '700px')

  Example:
    <SectionGlow color="purple" x="20%" y="40%" />
-->
<script setup>
defineProps({
  color: { type: String, default: 'blue' },
  x: { type: String, default: '50%' },
  y: { type: String, default: '50%' },
  size: { type: String, default: '700px' }
})
</script>

<template>
  <div
    class="glow"
    :class="`glow-${color}`"
    :style="{ left: x, top: y, width: size, height: size }"
    aria-hidden="true"
  />
</template>

<style scoped>
.glow {
  position: absolute;
  z-index: -1;                       /* behind the section content */
  transform: translate(-50%, -50%);  /* x/y = the centre of the glow */
  border-radius: 50%;
  pointer-events: none;
}

/* ===== Change the glow colours / strength here ===== */
/* rgba(red, green, blue, opacity): keep opacity low (0.05–0.15) */
.glow-blue {
  background: radial-gradient(circle, rgba(82, 120, 178, 0.14) 0%, transparent 70%);
}

.glow-purple {
  background: radial-gradient(circle, rgba(120, 90, 170, 0.12) 0%, transparent 70%);
}

/* Smaller glows on phones */
@media (max-width: 600px) {
  .glow {
    max-width: 420px;
    max-height: 420px;
  }
}
</style>
