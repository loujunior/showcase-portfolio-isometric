<!--
  HeroSection: the first thing visitors see.
  Left: title, intro text and button. Right: the isometric room.
  The room tilts a tiny bit towards the mouse (only on devices with a mouse).
-->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ===== Change the strength of the room tilt here =====
const MAX_ROTATE = 2.5 // degrees, at the very edge of the room
const MAX_MOVE = 4     // pixels, at the very edge of the room
// =====================================================

const roomWrapper = ref(null) // the box that listens to the mouse
const roomImage = ref(null)   // the image that moves

let canTilt = false     // false on phones/tablets (no mouse)
let frameRequest = null // the pending requestAnimationFrame (or null)
let mouseX = 0          // -0.5 (left edge) … 0 (centre) … 0.5 (right edge)
let mouseY = 0          // -0.5 (top edge)  … 0 (centre) … 0.5 (bottom edge)

function handleMouseMove(event) {
  if (!canTilt) return

  // Mouse position relative to the room, as a number from -0.5 to 0.5
  const box = roomWrapper.value.getBoundingClientRect()
  mouseX = (event.clientX - box.left) / box.width - 0.5
  mouseY = (event.clientY - box.top) / box.height - 0.5

  // Update at most once per frame (mousemove can fire 100+ times per second)
  if (!frameRequest) {
    frameRequest = requestAnimationFrame(applyTilt)
  }
}

function applyTilt() {
  frameRequest = null
  // mouseX * 2 goes from -1 to 1, so the values stay between -MAX and +MAX
  const rotateY = mouseX * 2 * MAX_ROTATE
  const rotateX = -mouseY * 2 * MAX_ROTATE
  const moveX = mouseX * 2 * MAX_MOVE
  const moveY = mouseY * 2 * MAX_MOVE

  roomImage.value.style.transform =
    `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ` +
    `translate(${moveX}px, ${moveY}px)`
}

function handleMouseLeave() {
  if (frameRequest) cancelAnimationFrame(frameRequest)
  frameRequest = null
  roomImage.value.style.transform = '' // CSS transition glides it back
}

onMounted(() => {
  // Only devices with a mouse or touchpad ("any-" also counts laptops with
  // a touchscreen AND a touchpad). Phones and tablets keep the room still.
  //
  // Note: this tilt deliberately does NOT check prefers-reduced-motion.
  // It only moves a few pixels while the visitor moves the mouse over it
  // themselves, so it never moves on its own.
  canTilt = window.matchMedia('(any-hover: hover) and (any-pointer: fine)').matches
})

onUnmounted(() => {
  if (frameRequest) cancelAnimationFrame(frameRequest)
})
</script>

<template>
  <section id="home" class="hero container">
    <SectionGlow color="blue" x="75%" y="50%" size="800px" />
    <div class="hero-text">
      <h1 class="hero-title">
        Welcome<br />
        to my world
      </h1>

      <p class="hero-intro">
        Een creatieveling die zich verdiept in ideeën, ontwerpen en ervaringen.
      </p>

      <!-- The outer span holds the corner brackets, the link is the blue button -->
      <span class="hero-button-frame">
        <a href="#projects" class="hero-button">
          Explore my work
          <span class="arrow" aria-hidden="true">&rarr;</span>
        </a>
        <PixelCorners />
      </span>
    </div>

    <!-- The wrapper keeps the position; only the image inside moves -->
    <div
      ref="roomWrapper"
      class="hero-room-wrapper"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <img
        ref="roomImage"
        src="/images/room.png"
        alt="Isometrische kamer waarin ik achter mijn computer zit, met een poster en een raam met maanlicht"
        class="hero-room"
      />
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr; /* two equal columns */
  align-items: center;
  gap: 40px;
  padding-top: 160px;
  padding-bottom: 160px;
  padding-left: 100px;
}

.hero-title {
  font-family: var(--font-title);
  font-weight: 400;
  font-size: clamp(32px, 4.4vw, 64px);
  line-height: 1.6;
  white-space: nowrap; /* keep "TO MY WORLD" on one line */
  text-transform: uppercase;
  color: var(--color-accent);
}

.hero-intro {
  max-width: 600px;
  margin-top: 40px;
  font-size: clamp(20px, 2.2vw, 32px);
  line-height: 1.5;
}

.hero-button-frame {
  position: relative; /* needed for the PixelCorners */
  display: inline-block;
  margin-top: 80px;
  padding: 4px;
  border: 1px solid var(--color-accent);
}

.hero-button {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 20px 24px 20px 60px;
  background-color: var(--color-accent);
  font-size: clamp(20px, 2vw, 28px);
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.hero-button:hover {
  background-color: #6a8fca;
}

.arrow {
  font-size: 1.4em;
  line-height: 1;
  transition: transform 0.2s ease;
}

/* The arrow slides a few pixels to the right on hover */
.hero-button:hover .arrow {
  transform: translateX(6px);
}

/* Wrapper: takes care of size and position in the grid */
.hero-room-wrapper {
  width: 100%;
  max-width: 560px;   /* room size in the Iteration 5 design */
  justify-self: end;
  margin-right: 54px; /* room ends ~80px from the right edge, like in Figma */
}

/* Image: only the tilt (transform is set by JavaScript) */
.hero-room {
  width: 100%;
  transition: transform 0.4s ease-out; /* smooth following + smooth return */
}

/* ---------- Responsive ---------- */
@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr; /* one column: text above, room below */
    padding: 64px var(--page-padding);
    text-align: center;
  }
  .hero-intro {
    margin-left: auto;
    margin-right: auto;
  }
  .hero-button-frame {
    margin-top: 48px;
  }
  .hero-room-wrapper {
    justify-self: center;
    margin-right: 0;
  }
}

@media (max-width: 480px) {
  .hero-button {
    padding: 16px 24px;
    gap: 16px;
  }
}
</style>
