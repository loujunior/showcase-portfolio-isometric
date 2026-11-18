<!--
  ProjectCard: shows ONE project (layout from the Iteration 5 design).
  - An image frame with a thick blue border that sticks out over the card.
  - The card with title, type label, description and (optional) extra info.

  Props:
    project – one object from /data/projects.js
    reverse – true = image on the right (used for every 2nd card)
-->
<script setup>
defineProps({
  project: { type: Object, required: true },
  reverse: { type: Boolean, default: false }
})
</script>

<template>
  <article class="project" :class="{ 'is-reverse': reverse }">
    <!-- Image frame (empty dark box when there is no image yet) -->
    <div class="project-frame">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="project.imageAlt || project.title"
        class="project-image"
      />
    </div>

    <!-- The card with the text -->
    <div class="project-card">
      <span v-if="project.type" class="project-type">{{ project.type }}</span>

      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>

      <!-- Extra info: only shown when the project has it -->
      <ul v-if="project.features" class="project-features">
        <li v-for="feature in project.features" :key="feature" class="feature">
          {{ feature }}
        </li>
      </ul>

      <dl v-if="project.role || project.tech" class="project-meta">
        <template v-if="project.role">
          <dt>Mijn rol</dt>
          <dd>{{ project.role }}</dd>
        </template>
        <template v-if="project.tech">
          <dt>Tech stack</dt>
          <dd>{{ project.tech }}</dd>
        </template>
      </dl>
    </div>
  </article>
</template>

<style scoped>
/* ---------- Layout: frame + card next to each other ---------- */
.project {
  display: flex;
  align-items: center; /* frame sticks out above AND below the card */
  max-width: 1277px;
}

/* Every 2nd project: image on the right, text aligned right */
.project.is-reverse {
  flex-direction: row-reverse;
  text-align: right;
}

/* ---------- Image frame ---------- */
.project-frame {
  position: relative;
  z-index: 1; /* lies on top of the card border */
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 415px;
  height: 330px;
  background-color: var(--color-bg);
  border: 7px solid var(--color-border-dark);
  border-radius: 17px;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

/* The Gear phone is drawn tilted, like in the design */
.project-image {
  width: 42%;
  transform: rotate(-17.5deg);
}

/* ---------- Card ---------- */
.project-card {
  position: relative; /* for the type label */
  flex: 1;
  min-height: 265px;
  margin-left: -7px; /* overlaps the frame border by 7px, like in Figma */
  padding: 28px 32px 24px;
  border: 1px solid var(--color-border-dark);
  border-radius: 10px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.is-reverse .project-card {
  margin-left: 0;
  margin-right: -7px;
}

.project-title {
  padding-right: 130px; /* room for the type label */
  font-size: clamp(24px, 2.4vw, 32px);
  font-weight: 500;
}

.is-reverse .project-title {
  padding-right: 0;
}

.project-description {
  max-width: 640px;
  margin-top: 28px;
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.is-reverse .project-description {
  margin-left: auto; /* keep right-aligned text against the right side */
}

/* Purple label in the top-right corner */
.project-type {
  position: absolute;
  top: 26px;
  right: 20px;
  min-width: 107px;
  padding: 4px 14px;
  border-radius: 10px;
  background-color: #43325e;
  font-size: 14px;
  text-align: center;
}

/* ---------- Extra info (features, role, tech) ---------- */
.project-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}

.feature {
  padding: 3px 12px;
  border: 1px solid var(--color-accent);
  border-radius: 8px;
  font-size: 14px;
  color: var(--color-accent-light);
}

.project-meta {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2px 16px;
  margin: 12px 0 0;
  font-size: 15px;
}

.project-meta dt {
  color: var(--color-text-muted);
}

.project-meta dd {
  margin: 0;
}

/* ---------- Hover: subtle glow + image frame moves up ---------- */
.project:hover .project-card {
  border-color: var(--color-accent);
  box-shadow: 0 0 18px rgba(82, 120, 178, 0.25);
}

.project:hover .project-frame {
  transform: translateY(-4px);
  border-color: #16407f; /* slightly brighter blue */
}

@media (prefers-reduced-motion: reduce) {
  .project-frame,
  .project-card {
    transition: none;
  }
  .project:hover .project-frame {
    transform: none;
  }
}

/* ---------- Responsive: frame on top, card below ---------- */
@media (max-width: 900px) {
  .project,
  .project.is-reverse {
    flex-direction: column;
    align-items: stretch;
    text-align: left;
    max-width: 560px;
    margin: 0 auto;
  }
  .project-frame {
    width: 100%;
    height: auto;
    aspect-ratio: 415 / 330;
  }
  .project-card,
  .is-reverse .project-card {
    margin: -7px 0 0; /* overlap the frame border from below */
    min-height: 0;
  }
  .is-reverse .project-description {
    margin-left: 0;
  }
}

@media (max-width: 600px) {
  .project-card {
    padding: 24px 20px;
  }
  .project-type {
    position: static; /* label goes above the title on small screens */
    display: inline-block;
    margin-bottom: 12px;
  }
  .project-title {
    padding-right: 0;
  }
  .project-description {
    margin-top: 16px;
    font-size: 16px;
  }
}
</style>
