<!--
  DialogueBox: a game-style dialogue box with an automatic typewriter effect.

  How it behaves:
    1. The box starts empty.
    2. When the trigger element scrolls into view, line 1 types itself letter by letter.
       (Trigger = an element near the bottom of the Character Profile,
        or the box itself when no triggerId is given.)
    3. Short pause, then line 2 types underneath (line 1 stays visible).
    4. When everything is typed, a small ▼ bobs in the corner.
    It plays only once per page visit. No clicking needed.

  Props:
    lines     – the sentences, in order. The first one is shown in bold.
    speed     – milliseconds per letter (lower = faster)
    pause     – milliseconds to wait between two lines
    triggerId – id of the element that starts the dialogue (optional)

  Example:
    <DialogueBox :lines="['Hoi!', 'Welkom.']" :speed="40" :pause="600" trigger-id="dialogue-trigger" @start="..." />
-->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  lines: { type: Array, required: true },
  speed: { type: Number, default: 40 },
  pause: { type: Number, default: 600 },
  triggerId: { type: String, default: '' },
  startDelay: { type: Number, default: 300 } // ms between the "start" event and the first letter
})

// "start" tells the parent the dialogue begins (used for the attention lines)
const emit = defineEmits(['start'])

// ---------- Reactive state (the template updates when these change) ----------
const boxElement = ref(null)  // the dialogue element in the template
// How many letters of each line are visible. All 0 at the start: [0, 0]
const typedCounts = ref(props.lines.map(() => 0))
const isFinished = ref(false) // true when all lines are typed → show ▼

// ---------- Normal variables ----------
let observer = null
let isStopped = false // set to true when the component is removed

// Small helper: wait a number of milliseconds.
// `await wait(55)` pauses the function for 55 ms.
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Type all lines, one letter at a time
async function playDialogue() {
  for (let lineIndex = 0; lineIndex < props.lines.length; lineIndex++) {
    const fullLine = props.lines[lineIndex]

    for (let letter = 0; letter < fullLine.length; letter++) {
      if (isStopped) return // component is gone: stop typing
      typedCounts.value[lineIndex]++ // show one more letter
      await wait(props.speed)
    }

    // Pause between lines (not after the last line)
    if (lineIndex < props.lines.length - 1) {
      await wait(props.pause)
    }
  }

  isFinished.value = true
}

// Reduced motion: show everything at once, without typing
function showAllLines() {
  typedCounts.value = props.lines.map((line) => line.length)
  isFinished.value = true
}

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Which element starts the dialogue? The trigger (if it exists), otherwise the box.
  const triggerElement = document.getElementById(props.triggerId) || boxElement.value

  // IntersectionObserver tells us when an element becomes visible on screen.
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect() // stop watching: it only plays once
        emit('start')         // 1. parent shows the attention lines

        if (reduceMotion) {
          showAllLines()
        } else {
          // 2. short pause so the attention lines pop in first, 3. then type
          wait(props.startDelay).then(playDialogue)
        }
      }
    },
    // rootMargin changes the "visible area" the observer uses:
    //  - top 99999px: everything ABOVE the screen also counts as visible, so the
    //    dialogue also starts when you jump or scroll fast past the trigger
    //  - bottom -15%: the trigger must be a bit above the bottom edge of the
    //    screen, so the dialogue doesn't start too early
    { rootMargin: '99999px 0px -15% 0px' }
  )
  observer.observe(triggerElement)
})

// Clean up when the component is removed
onUnmounted(() => {
  isStopped = true
  observer?.disconnect()
})
</script>

<template>
  <div class="dialogue">
    <!-- Three layers: lavender outline > thick navy border > light inside -->
    <div ref="boxElement" class="dialogue-frame pixel-corners">
      <div class="dialogue-border pixel-corners">
        <div class="dialogue-inner pixel-corners">
          <!-- Screen readers read the full text instead of letter by letter -->
          <p class="visually-hidden">{{ lines.join(' ') }}</p>

          <p class="dialogue-text" aria-hidden="true">
            <!--
              The whole sentence is always in the box, but the letters that are
              not typed yet are invisible. So the box never changes size and
              words never jump to the next line while typing.
            -->
            <span
              v-for="(line, index) in lines"
              :key="index"
              class="dialogue-line"
              :class="{ 'is-title': index === 0 }"
            >{{ line.slice(0, typedCounts[index]) }}<span class="untyped">{{ line.slice(typedCounts[index]) }}</span></span>
          </p>

          <!-- ▼ only when all lines are typed -->
          <span v-if="isFinished" class="next-arrow" aria-hidden="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialogue {
  /* ===== Colours of the box (from the pixel-art reference) ===== */
  --dialogue-outline: #a99bf0; /* lavender pixel outline */
  --dialogue-border: #26286a;  /* thick dark navy border */
  --dialogue-line: #c4bdf0;    /* thin lavender line inside */
  --dialogue-fill: #e9e7f1;    /* very light lavender background */
  --dialogue-text: #1d1f4d;    /* dark navy text */
  --dialogue-arrow: #1d1f4d;   /* ▼ colour */
  --step: 4px;                 /* size of the pixel "steps" in the corners */

  width: 100%;
  max-width: 1167px;
  margin: 0 auto;
  /* soft purple glow around the box (drop-shadow follows the pixel corners) */
  filter: drop-shadow(0 0 12px rgba(156, 140, 240, 0.4));
}

/* The pixel corners come from the shared .pixel-corners class in main.css */

/* Layer 1: lavender pixel outline */
.dialogue-frame {
  padding: 5px;
  background-color: var(--dialogue-outline);
}

/* Layer 2: thick dark navy border */
.dialogue-border {
  padding: 10px;
  background-color: var(--dialogue-border);
}

/* Layer 3: the light inside with a thin lavender line */
.dialogue-inner {
  position: relative; /* for the arrow */
  min-height: 135px;  /* the box always has room for both lines */
  padding: 30px 60px;
  background-color: var(--dialogue-fill);
  box-shadow: inset 0 0 0 3px var(--dialogue-line);
  color: var(--dialogue-text);
}

.dialogue-line {
  display: block;
  font-size: clamp(18px, 2vw, 26px);
  line-height: 1.5;
}

/* First sentence slightly bolder than the second */
.dialogue-line.is-title {
  font-weight: 600;
}

/* ---------- Bouncing ▼ ---------- */
/* A triangle made with borders: only the top border has a colour */
.next-arrow {
  position: absolute;
  right: 46px;
  bottom: 20px;
  width: 0;
  height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-top: 16px solid var(--dialogue-arrow);
  /* steps(1): the arrow jumps between two positions instead of sliding,
     just like the ▼ in classic handheld games */
  animation: bob 0.8s steps(1) infinite;
}

/* Up / down by 4px */
@keyframes bob {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(4px);
  }
}

/* Letters that are not typed yet: they take up space, but are invisible */
.untyped {
  visibility: hidden;
}

/* Hidden on screen, but read by screen readers */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* ---------- Responsive ---------- */
@media (max-width: 760px) {
  .dialogue-frame {
    padding: 4px;
  }
  .dialogue-border {
    padding: 7px;
  }
  .dialogue-inner {
    min-height: 120px;
    padding: 22px 26px 44px;
  }
  .next-arrow {
    right: 24px;
    bottom: 16px;
    border-left-width: 10px;
    border-right-width: 10px;
    border-top-width: 12px;
  }
}

/* ---------- Reduced motion: arrow stays still ---------- */
@media (prefers-reduced-motion: reduce) {
  .next-arrow {
    animation: none;
  }
}
</style>
