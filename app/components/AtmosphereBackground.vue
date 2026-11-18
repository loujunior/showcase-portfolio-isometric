<!--
  AtmosphereBackground: the magical night-sky layer behind the whole site.

  It has two layers:
    1. far stars  – tiny pixels that slowly fade in and out (pure CSS)
    2. near sparkles – a few ✦ shapes that move a little slower than
       the page when you scroll (parallax, a few lines of JavaScript)

  Usage in app.vue:
    <AtmosphereBackground />                    (everything on)
    <AtmosphereBackground :parallax="false" />  (no parallax)
    <AtmosphereBackground :star-count="0" />    (no stars)
  Remove the tag completely to disable the background effects.

  Colours, opacity and speed: see the CSS variables in `.atmosphere` below.
-->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  starCount: { type: Number, default: 40 },     // how many twinkling stars
  sparkleCount: { type: Number, default: 10 },  // how many parallax sparkles
  parallax: { type: Boolean, default: true },   // turn parallax on/off
  parallaxSpeed: { type: Number, default: 0.08 } // 0 = still, 0.2 = faster
})

// A "fake random" number between 0 and 1 based on a seed.
// We don't use Math.random(), because the server and the browser would
// get different numbers and Vue would complain (hydration mismatch).
// Same seed = always the same number, so the stars stay in place.
// We round to 3 decimals because the server (Node) and the browser can
// differ in the very last digits of Math.sin.
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return Math.round((x - Math.floor(x)) * 1000) / 1000
}

// Build the list of stars once. Each star gets a position, size and timing.
const stars = Array.from({ length: props.starCount }, (_, i) => ({
  id: i,
  top: seededRandom(i + 1) * 100,          // % from the top
  left: seededRandom(i + 101) * 100,       // % from the left
  size: 1 + Math.round(seededRandom(i + 201) * 2),     // 1, 2 or 3px
  brightness: 0.5 + Math.round(seededRandom(i + 801) * 5) / 10, // 0.5–1: some stars dimmer
  twinkles: seededRandom(i + 901) > 0.35,              // about 2 out of 3 stars twinkle
  duration: 4 + Math.round(seededRandom(i + 301) * 6), // 4–10 seconds per twinkle
  delay: -Math.round(seededRandom(i + 401) * 10)       // negative = start mid-animation
}))

const sparkles = Array.from({ length: props.sparkleCount }, (_, i) => ({
  id: i,
  top: seededRandom(i + 501) * 100,
  left: seededRandom(i + 601) * 100,
  size: 8 + Math.round(seededRandom(i + 701) * 8) // 8–16px
}))

// ---------- Parallax ----------
const nearLayer = ref(null) // reference to the sparkle layer in the template
let ticking = false

function updateParallax() {
  // Move the layer up a little as you scroll down.
  // transform is cheap for the browser (no layout recalculation).
  const offset = window.scrollY * props.parallaxSpeed
  nearLayer.value.style.transform = `translate3d(0, ${-offset}px, 0)`
  ticking = false
}

function onScroll() {
  // requestAnimationFrame: update at most once per frame (smooth + light)
  if (!ticking) {
    ticking = true
    requestAnimationFrame(updateParallax)
  }
}

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!props.parallax || reduceMotion) return

  window.addEventListener('scroll', onScroll, { passive: true })
  updateParallax()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <!-- aria-hidden: screen readers skip this, it's only decoration -->
  <div class="atmosphere" aria-hidden="true">
    <!-- Layer 1: far twinkling stars -->
    <div class="stars">
      <span
        v-for="star in stars"
        :key="star.id"
        class="star"
        :class="{ 'is-static': !star.twinkles }"
        :style="{
          '--brightness': star.brightness,
          top: star.top + '%',
          left: star.left + '%',
          width: star.size + 'px',
          height: star.size + 'px',
          animationDuration: star.duration + 's',
          animationDelay: star.delay + 's'
        }"
      />
    </div>

    <!-- Layer 2: near sparkles that move with parallax -->
    <div ref="nearLayer" class="sparkles">
      <svg
        v-for="sparkle in sparkles"
        :key="sparkle.id"
        class="sparkle"
        viewBox="0 0 16 16"
        :style="{
          top: sparkle.top + '%',
          left: sparkle.left + '%',
          width: sparkle.size + 'px',
          height: sparkle.size + 'px'
        }"
      >
        <!-- a 4-point star like the ✦ sparkles in the Figma design -->
        <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.atmosphere {
  /* ===== Change the look here ===== */
  --star-color: #bdcbfd;            /* light blue from the design */
  --star-glow: rgba(147, 170, 252, 0.6);
  --star-min-opacity: 0.1;          /* darkest point of a twinkle */
  --star-max-opacity: 0.7;          /* brightest point of a twinkle */
  --sparkle-color: #93aafc;
  --sparkle-opacity: 0.25;
  /* ================================= */

  position: fixed;   /* stays put while the page scrolls */
  inset: 0;          /* top/right/bottom/left: 0 → covers the screen */
  z-index: -1;       /* behind all content */
  overflow: hidden;
  pointer-events: none; /* clicks go through to the page */
}

/* ---------- Layer 1: stars ---------- */
.stars {
  position: absolute;
  inset: 0;
}

.star {
  position: absolute;
  background-color: var(--star-color);
  box-shadow: 0 0 4px var(--star-glow); /* soft glow around the pixel */
  opacity: var(--star-min-opacity);
  animation-name: twinkle;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  /* duration and delay are set per star in the template */
}

/* --brightness (0.5–1) is set per star, so not every star is equally bright */
@keyframes twinkle {
  0%,
  100% {
    opacity: calc(var(--star-min-opacity) * var(--brightness));
  }
  50% {
    opacity: calc(var(--star-max-opacity) * var(--brightness));
  }
}

/* Stars that don't twinkle: just a calm, dim dot */
.star.is-static {
  animation: none;
  opacity: calc(0.35 * var(--brightness));
}

/* ---------- Layer 2: parallax sparkles ---------- */
.sparkles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* taller than the screen, so there are still sparkles after moving up */
  height: calc(100% + 600px);
  will-change: transform; /* hint to the browser: this layer will move */
}

.sparkle {
  position: absolute;
  fill: var(--sparkle-color);
  opacity: var(--sparkle-opacity);
}

/* ---------- Mobile: fewer stars ---------- */
@media (max-width: 600px) {
  .star:nth-child(2n) {
    display: none; /* hide every second star */
  }
}

/* ---------- Accessibility ---------- */
/* People who ask their device for less motion get still stars */
@media (prefers-reduced-motion: reduce) {
  .star {
    animation: none;
    opacity: calc(0.4 * var(--brightness));
  }
}
</style>
