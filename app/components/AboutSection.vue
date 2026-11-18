<!--
  AboutSection: the moment between the Character Profile and Projects.
  My character stands above a retro dialogue box that "talks" to the visitor.
  When the dialogue starts, three attention lines pop up next to my head
  and the character does a small hop.
  Change the sentences in the `lines` array below.
-->
<script setup>
import { ref } from 'vue'

// The dialogue, in order. The first line is shown a bit bolder.
const lines = ['Oh daar ben je!', 'Ik laat je mijn projecten zien!']

// Becomes true when the dialogue starts (the DialogueBox sends a "start" event)
const isTalking = ref(false)
</script>

<template>
  <section id="about" class="about container">
    <!-- The class "is-talking" starts the pop-in and hop animations -->
    <div class="speaker" :class="{ 'is-talking': isTalking }">
      <img src="/images/character-profile.svg" alt="Mijn character" class="about-character" />

      <!-- Three short "!" lines, like in classic games -->
      <svg class="attention-lines" viewBox="0 0 32 32" aria-hidden="true">
        <line x1="6" y1="14" x2="9" y2="3" />
        <line x1="13" y1="19" x2="23" y2="9" />
        <line x1="16" y1="27" x2="29" y2="24" />
      </svg>
    </div>

    <!-- speed = ms per letter, pause = ms between the two lines,
         trigger-id = the invisible marker near the bottom of the Character Profile -->
    <DialogueBox
      :lines="lines"
      :speed="40"
      :pause="600"
      trigger-id="dialogue-trigger"
      @start="isTalking = true"
    />
  </section>
</template>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
  padding-top: 120px;
  padding-bottom: 160px;
}

/* Wrapper around the character, so the lines can be placed next to the head */
.speaker {
  position: relative;
}

.about-character {
  width: 140px; /* size of the standing character in the Iteration 5 design */
  /*
    Purple outline that follows the character's shape:
    drop-shadow uses the transparent PNG/SVG shape, not the rectangle.
    Four small shadows (right, left, down, up) form a 2px outline,
    the last, blurry one is the soft glow.
  */
  filter:
    drop-shadow(2px 0 0 var(--outline-color))
    drop-shadow(-2px 0 0 var(--outline-color))
    drop-shadow(0 2px 0 var(--outline-color))
    drop-shadow(0 -2px 0 var(--outline-color))
    drop-shadow(0 0 10px rgba(156, 140, 240, 0.45));
  --outline-color: #c9bfff; /* lavender */
}

/* ---------- Attention lines ---------- */
.attention-lines {
  position: absolute;
  top: -14px;
  right: -30px;
  width: 36px;
  height: 36px;
  stroke: #f2efff;
  stroke-width: 3;
  stroke-linecap: square; /* square ends look more "pixel" */
  transform: scale(0);    /* hidden until the dialogue starts */
  transform-origin: bottom left;
}

/* ---------- Animations when the dialogue starts ---------- */
.is-talking .attention-lines {
  animation: pop-in 0.35s ease-out forwards;
}

.is-talking .about-character {
  animation: hop 0.4s ease-out;
}

/* Grow a bit too big, then settle: a quick, playful "pop" */
@keyframes pop-in {
  0% {
    transform: scale(0);
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* A small jump up and back down */
@keyframes hop {
  0%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
}

/* Reduced motion: lines simply appear, no hop */
@media (prefers-reduced-motion: reduce) {
  .is-talking .attention-lines {
    animation: none;
    transform: scale(1);
  }
  .is-talking .about-character {
    animation: none;
  }
}

/* ---------- Responsive ---------- */
@media (max-width: 760px) {
  .about {
    gap: 40px;
    padding-top: 64px;
    padding-bottom: 96px;
  }
  .about-character {
    width: 100px;
  }
  .attention-lines {
    top: -12px;
    right: -24px;
    width: 28px;
    height: 28px;
  }
}
</style>
