<!--
  StatBar: one "Player stats" bar with a % label.
  The bar starts empty and fills up once, when it scrolls into view.

  Props:
    - label: the text in front of the bar
    - value: a number from 0 to 100 (how full the bar is)
    - delay: milliseconds to wait before filling (for a small "one after another" effect)
  Usage: <StatBar label="Creativiteit" :value="78" :delay="150" />
-->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: Number, required: true },
  delay: { type: Number, default: 0 }
})

const barElement = ref(null) // the bar in the template
const isFilled = ref(false)  // false = empty bar, true = filled to `value`
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect() // only once: no restart when scrolling a bit
        setTimeout(() => {
          isFilled.value = true // the CSS transition does the animation
        }, props.delay)
      }
    },
    { threshold: 0.5 } // half of the bar must be visible
  )
  observer.observe(barElement.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="stat">
    <span class="stat-label">{{ label }}</span>

    <!-- role + aria-* tell screen readers this is a progress bar -->
    <div
      ref="barElement"
      class="stat-track"
      role="progressbar"
      :aria-label="label"
      :aria-valuenow="value"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <!-- width is 0% until the bar is visible, then `value`% -->
      <div class="stat-fill" :style="{ width: (isFilled ? value : 0) + '%' }" />
    </div>

    <span class="stat-value">{{ value }}%</span>
  </div>
</template>

<style scoped>
.stat {
  display: grid;
  grid-template-columns: 170px minmax(0, 408px) auto;
  align-items: center;
  gap: 12px;
}

.stat-label {
  font-size: 20px;
  font-weight: 500;
}

.stat-track {
  height: 22px;
  border: 1px solid var(--color-accent);
  border-radius: 6px;
  overflow: hidden; /* keeps the fill inside the rounded corners */
}

.stat-fill {
  height: 100%;
  background-color: var(--color-accent);
  border-radius: 5px;
  /* the animation: width changes smoothly in 1 second */
  transition: width 1s ease-out;
}

.stat-value {
  font-size: 16px;
  color: var(--color-text-muted);
}

/* Small screens: smaller label column */
@media (max-width: 480px) {
  .stat {
    grid-template-columns: 110px 1fr auto;
    gap: 8px;
  }
  .stat-label {
    font-size: 16px;
  }
}

/* Reduced motion: bar is filled immediately, without sliding */
@media (prefers-reduced-motion: reduce) {
  .stat-fill {
    transition: none;
  }
}
</style>
