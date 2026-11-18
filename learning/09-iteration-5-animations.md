# 9. Iteration 5: stat bars, card hover and floating decorations

## Stat bars that fill when visible (StatBar.vue)

Two simple pieces work together:

**1. JavaScript decides *when*:**

```js
const isFilled = ref(false)

observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    observer.disconnect()                       // only once
    setTimeout(() => { isFilled.value = true }, props.delay)
  }
}, { threshold: 0.5 })
```

**2. CSS decides *how*:**

```vue
<div class="stat-fill" :style="{ width: (isFilled ? value : 0) + '%' }" />
```

```css
.stat-fill { transition: width 1s ease-out; }
```

The width jumps from `0%` to `78%` in the data, and `transition` makes
the browser animate that change smoothly. The `delay` prop (0, 150,
300 ms) makes the bars start one after another.

- Speed: change `1s` in `.stat-fill`.
- Values: the `stats` array in `CharacterProfile.vue`.

## Alternating project cards (ProjectCard.vue)

`ProjectsSection` passes `:reverse="index % 2 === 1"` to every 2nd card.
In CSS, `flex-direction: row-reverse` then puts the image on the right:

```css
.project            { display: flex; }               /* image | card */
.project.is-reverse { flex-direction: row-reverse; } /* card | image */
```

The image frame "sticks out" of the card because the frame is taller
(330px) than the card (265px) and they are centred vertically
(`align-items: center`). `margin-left: -7px` makes them overlap by the
width of the frame border.

## Hover effect

```css
.project:hover .project-card  { border-color: var(--color-accent); box-shadow: 0 0 18px rgba(82, 120, 178, 0.25); }
.project:hover .project-frame { transform: translateY(-4px); }
```

`transition` on both elements makes it smooth. Only `transform`,
`border-color` and `box-shadow` change, so nothing else on the page moves.

## Floating decorations (CharacterProfile.vue)

```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}
.float-slow   { animation: float 9s ease-in-out infinite; }
.float-gentle { animation: float 7s ease-in-out -3s infinite; }
```

Different durations (9s / 7s) and a negative delay (`-3s`) make sure the
moon and the flower never move at the same moment.

## Stars with different sizes and brightness (AtmosphereBackground.vue)

Each star gets a `--brightness` CSS variable (0.5–1). The keyframes
multiply the opacity with it:

```css
opacity: calc(var(--star-max-opacity) * var(--brightness));
```

About one third of the stars don't twinkle at all (`.is-static`), which
makes the sky feel calmer.

## Reduced motion

All of these stop or appear instantly when the visitor has
"reduce motion" turned on (`@media (prefers-reduced-motion: reduce)`).
