<!--
  CharacterProfile: the "game character" card about me.
  Left: my isometric character. Right: name, focus, tools and stats.
  The moon/clouds and hibiscus flowers are decoration images.
-->
<script setup>
// Data for the stat bars (values from the Iteration 5 design).
// Change a number to change the bar and its % label.
const stats = [
  { label: 'Creativiteit', value: 78 },
  { label: 'UX Design', value: 92 },
  { label: 'Development', value: 63 }
]

// Tool slots ("inventory"). `size` = logo size in px, so logos with a
// different shape (Figma is tall, VS Code is square) look equally big.
const tools = [
  { name: 'Figma', icon: '/images/tool-figma.png', size: 46 },
  { name: 'VS Code', icon: '/images/tool-vscode.png', size: 38 }
]
</script>

<template>
  <section id="profile" class="profile-wrapper container">
    <SectionGlow color="purple" x="25%" y="50%" size="900px" />

    <!-- Invisible marker at 78% of this section: when it scrolls into view,
         the dialogue below starts typing (see DialogueBox trigger-id) -->
    <span id="dialogue-trigger" class="dialogue-trigger" aria-hidden="true" />
    <div class="profile-card">
      <!-- Decorations (alt="" because they are only decoration) -->
      <!-- Top-left: moon + clouds. Bottom-left and top-right: flowers + leaves.
           All three get the class "decor-faded" (70% opacity). -->
      <img src="/images/decor-moon.png" alt="" class="decor decor-moon decor-faded float-slow" />
      <img src="/images/decor-flowers-left.png" alt="" class="decor decor-bottom-left decor-faded" />
      <img src="/images/decor-flowers-right.png" alt="" class="decor decor-right decor-faded float-gentle" />

      <!-- Character directly on the dark background, with a soft glow + sparkles -->
      <div class="character-frame">
        <span class="character-glow" aria-hidden="true" />

        <svg
          v-for="n in 4"
          :key="n"
          :class="`character-sparkle sparkle-${n}`"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
        </svg>

        <img src="/images/character-profile.svg" alt="Mijn isometrische character" class="character" />

        <!-- The 4 corner brackets from the design (no background box) -->
        <PixelCorners />
      </div>

      <div class="profile-info">
        <h2 class="profile-title">Character Profile</h2>

        <dl class="profile-list">
          <dt>Naam</dt>
          <dd>Marie-lou Kwidama</dd>

          <dt>Focus</dt>
          <dd>UX/UI Design</dd>

          <dt>Tools</dt>
          <dd class="tools">
            <!-- .tool = glow + hover movement, the two inner layers = pixel slot -->
            <span v-for="tool in tools" :key="tool.name" class="tool" :title="tool.name">
              <span class="tool-slot pixel-corners">
                <span class="tool-slot-inner pixel-corners">
                  <img
                    v-if="tool.icon"
                    :src="tool.icon"
                    :alt="tool.name"
                    class="tool-icon"
                    :style="{ width: tool.size + 'px', height: tool.size + 'px' }"
                  />
                </span>
              </span>
            </span>
          </dd>
        </dl>

        <div class="stats">
          <p class="stats-title">Player stats</p>
          <!-- delay: each bar starts a little later than the one above it -->
          <StatBar
            v-for="(stat, index) in stats"
            :key="stat.label"
            :label="stat.label"
            :value="stat.value"
            :delay="index * 150"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.profile-wrapper {
  padding-top: 40px;
  padding-bottom: 120px;
}

/* Marker for the dialogue: starts at the bottom ~22% of the section */
.dialogue-trigger {
  position: absolute;
  top: 78%;
  left: 0;
  width: 1px;
  height: 1px;
}

.profile-card {
  position: relative; /* decorations are positioned inside this card */
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  padding: 108px 60px 175px 116px;
  border: 1px solid var(--color-border-dark);
}

/* ---- Decorations ---- */
.decor {
  position: absolute;
  pointer-events: none; /* you can click "through" them */
  z-index: 1;
}

/* Moon + clouds: top-left corner (same place as before) */
.decor-moon {
  top: -40px;
  left: -28px;
  width: 470px;
}

/* Flowers + leaves: in the bottom-left corner, sticking out over
   the left and bottom edge of the card (like the top-right flower) */
.decor-bottom-left {
  bottom: -70px;
  left: -70px;
  width: 470px; /* same size as before */
}

.decor-right {
  top: -150px;
  right: -28px;
  width: 240px;
}

/* Moon, clouds, flowers and leaves: 70% visible, so they blend in */
.decor-faded {
  opacity: 0.7;
}

/* Very slow floating. Different speeds and delays,
   so the decorations never move at the same time. */
.float-slow {
  animation: float 9s ease-in-out infinite;
}

.float-gentle {
  animation: float 7s ease-in-out -3s infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

/* ---- Character ---- */
/* The frame keeps the same size as the old rectangle (500 × 524),
   so the layout doesn't move. It's just invisible now. */
.character-frame {
  /* ===== Change the glow and sparkles here ===== */
  --glow-color-inner: rgba(120, 100, 200, 0.22); /* purple centre */
  --glow-color-outer: rgba(82, 120, 178, 0.1);   /* blue edge */
  --sparkle-color: #bdcbfd;
  --sparkle-opacity: 0.6;
  /* ============================================= */

  position: relative;
  align-self: start;
  display: grid;
  place-items: center; /* centre the character in the frame */
  width: 100%;
  max-width: 500px;
  aspect-ratio: 500 / 524;
}

.character {
  position: relative; /* stays above the glow */
  width: 64%;         /* same size the character had inside the old image */
}

/* Soft glow: a radial gradient that fades out to transparent */
.character-glow {
  position: absolute;
  inset: 5%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--glow-color-inner) 0%,
    var(--glow-color-outer) 45%,
    transparent 70%
  );
}

/* Tiny sparkles around the character */
.character-sparkle {
  position: absolute;
  fill: var(--sparkle-color);
  opacity: var(--sparkle-opacity);
  animation: sparkle-twinkle 5s ease-in-out infinite;
}
.sparkle-1 { top: 12%; left: 14%; width: 12px; height: 12px; }
.sparkle-2 { top: 22%; right: 12%; width: 9px; height: 9px; animation-delay: -2s; }
.sparkle-3 { bottom: 20%; right: 16%; width: 11px; height: 11px; animation-delay: -3.5s; }
.sparkle-4 { bottom: 30%; left: 10%; width: 7px; height: 7px; animation-delay: -1s; }

/* Slow fade in and out (subtle, not distracting) */
@keyframes sparkle-twinkle {
  0%,
  100% {
    opacity: calc(var(--sparkle-opacity) * 0.3);
  }
  50% {
    opacity: var(--sparkle-opacity);
  }
}

@media (prefers-reduced-motion: reduce) {
  .character-sparkle,
  .float-slow,
  .float-gentle {
    animation: none;
  }
}

/* ---- Info ---- */
.profile-info {
  position: relative;
  z-index: 2;
}

.profile-title {
  font-size: clamp(30px, 3vw, 40px);
  font-weight: 600;
}

.profile-list {
  margin: 40px 0 0;
  padding-left: 10px;
}

.profile-list dt {
  font-size: 28px;
  color: var(--color-text-muted);
}

.profile-list dd {
  margin: 0 0 28px;
  font-size: 28px;
  font-weight: 500;
}

.tools {
  display: flex;
  gap: 20px;
  margin-top: 12px !important;
}

/* ---------- Tool slots (RPG inventory style) ---------- */
/* Outer element: only the hover movement and the glow.
   The glow is a filter here, because clip-path on the slot would cut off a box-shadow. */
.tool {
  --step: 3px; /* size of the pixel corners (used by .pixel-corners) */
  display: block;
  transition: transform 0.2s ease, filter 0.2s ease;
}

.tool:hover {
  transform: translateY(-3px);
  filter: drop-shadow(0 0 8px rgba(156, 140, 240, 0.55));
}

/* Layer 1: purple pixel border (2px of purple around the navy inside) */
.tool-slot {
  display: block;
  width: 72px;
  height: 72px;
  padding: 2px;
  background-color: #6b5fb5;
}

/* Layer 2: dark navy inside, logo in the centre */
.tool-slot-inner {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background-color: #0b1430;
}

.tool-icon {
  object-fit: contain; /* keep the logo's own proportions */
}

@media (prefers-reduced-motion: reduce) {
  .tool {
    transition: none;
  }
  .tool:hover {
    transform: none;
  }
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 60px;
  padding-left: 12px;
}

.stats-title {
  font-size: 20px;
  color: var(--color-text-muted);
}

/* ---------- Responsive ---------- */
@media (max-width: 1100px) {
  .profile-card {
    padding: 80px 40px 120px;
    gap: 48px;
  }
  .decor-moon {
    width: 340px;
  }
  .decor-bottom-left {
    width: 340px;
    bottom: -50px;
    left: -50px;
  }
}

@media (max-width: 900px) {
  .profile-card {
    grid-template-columns: 1fr;
    padding: 64px 24px 80px;
  }
  .character-frame {
    justify-self: center;
    width: 100%;
  }
  .decor-moon {
    width: 220px;
  }
  /* One column: in the bottom corner the flower would cover the
     Player Stats, so here it stays next to the character (under the moon) */
  .decor-bottom-left {
    width: 220px;
    top: 58px;
    bottom: auto;
    left: -28px;
  }
  .decor-right {
    width: 150px;
    top: -80px;
  }
}

@media (max-width: 480px) {
  .profile-list dt,
  .profile-list dd {
    font-size: 22px;
  }
  .tool-slot {
    width: 60px;
    height: 60px;
  }
  .tool-icon {
    transform: scale(0.85); /* logos a bit smaller in the smaller slots */
  }
}
</style>
