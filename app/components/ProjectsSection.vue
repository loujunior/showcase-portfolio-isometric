<!--
  ProjectsSection: the title plus a list of ProjectCards.
  The projects come from /data/projects.js.
  Images alternate left / right like in the Figma design (see ProjectCard).
-->
<script setup>
import { projects } from '~/data/projects.js'
</script>

<template>
  <section id="projects" class="projects container">
    <SectionGlow color="blue" x="50%" y="10%" size="800px" />
    <SectionGlow color="purple" x="85%" y="70%" />
    <h2 class="section-title">Select a project</h2>
    <p class="section-subtitle">
      Every project has a story.<br />
      Choose one to explore.
    </p>

    <div class="project-list">
      <!-- index is 0, 1, 2 ... every 2nd card (index 1, 3, ...) gets its image on the right -->
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.id"
        :project="project"
        :reverse="index % 2 === 1"
      />
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding-top: 64px;
  padding-bottom: 160px;
}

/* Spacing from the Iteration 5 design */
.project-list {
  display: flex;
  flex-direction: column;
  gap: 220px;
  margin-top: 150px;
  padding: 0 30px;
}

/* ---------- Responsive ---------- */
@media (max-width: 1100px) {
  .project-list {
    gap: 140px;
    margin-top: 120px;
    padding: 0;
  }
}

@media (max-width: 900px) {
  .project-list {
    gap: 64px;
    margin-top: 64px;
  }
}
</style>
