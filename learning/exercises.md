# Exercises

Small changes to practise with. Keep `npm run dev` running and check the
browser after every save. Use `git diff` to see what you changed, and
`git restore <file>` to undo if something breaks.

## Easy

1. **Change a stat.** In `CharacterProfile.vue`, set "Creativiteit" to
   `95`. Then add a fourth stat, for example `{ label: 'Coding', value: 60 }`.
   *(Concept: arrays + v-for)*

2. **Add a project.** In `data/projects.js`, add a fourth project with
   its own title and description. Notice which side it appears on, and why.
   *(Concept: data file + `index % 2`)*

3. **Change the accent colour.** In `main.css`, change `--color-accent`
   to another colour. Which parts of the site change?
   *(Concept: CSS variables)*

## Medium

4. **Add a real project image.** Put an image in `public/images/`, then
   set `image: '/images/your-file.png'` on one project.
   *(Concept: v-if / v-else)*

5. **Add a menu link** for the Character Profile section. Which id does
   it need? *(Concept: anchors + arrays)*

6. **Show tool names.** Change the tools in `CharacterProfile.vue` to real
   names (Figma, VS Code, ...), and show `{{ tool.name }}` inside each square.

## Challenge

7. **New prop for ProjectCard.** Add a `year` to every project in
   `projects.js` and show it in the card under the title.
   *(Concept: props + objects)*

8. **Make a `SectionTitle` component** that takes `title` and `subtitle`
   as props, and use it in `ProjectsSection` and `ContactSection`
   instead of the `<h2>` + `<p>`.
   *(Concept: creating and reusing your own component)*

9. **Stat bar colour.** Give `StatBar` an optional `color` prop
   (default `var(--color-accent)`) and use it for the fill.

10. **Tune the night sky.** Make the stars twinkle slower (8–14s), add a
    `SectionGlow` to the About section, and try `:parallax-speed="0.2"`.
    Then turn on "reduce motion" in your OS and check that everything stops.
    *(Concept: CSS animations, props, prefers-reduced-motion)*

11. **Dialogue tweaks.** Add a third sentence to the dialogue. Then make
    the typing pause a little longer after `!` or `,`.
    Tip: in `playDialogue`, change `await wait(props.speed)` so it waits
    longer when `letter === '!'`.
    *(Concept: async/await, conditions)*
