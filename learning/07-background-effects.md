# 7. Background effects: stars, glows, parallax

Three small components make the background feel magical:

| Component | Where | What it does |
|---|---|---|
| `AtmosphereBackground` | once in `app.vue` | twinkling stars + parallax sparkles |
| `SectionGlow` | inside a section | soft blue/purple light behind it |
| `SectionDivider` | between sections in `app.vue` | thin line with a pixel diamond |

## How the twinkling works (CSS animation)

```css
@keyframes twinkle {
  0%, 100% { opacity: 0.1; }
  50%      { opacity: 0.7; }
}
.star { animation-name: twinkle; animation-iteration-count: infinite; }
```

`@keyframes` describes the steps; the browser animates between them.
Each star gets its own `animation-duration` (4–10s) and a negative
`animation-delay`, so they don't all blink at the same moment.

Animating only `opacity` (and `transform`) is cheap for the browser,
so it stays smooth on phones.

## Why not `Math.random()`?

Nuxt renders the page on the **server** first, then Vue takes over in
the **browser** ("hydration"). With `Math.random()` both sides would
put the stars in different places and Vue would show warnings.
`seededRandom(seed)` always returns the same number for the same seed.

## How parallax works (a little JavaScript)

```js
window.addEventListener('scroll', onScroll, { passive: true })

function updateParallax() {
  const offset = window.scrollY * props.parallaxSpeed
  nearLayer.value.style.transform = `translate3d(0, ${-offset}px, 0)`
}
```

The page scrolls at full speed; the sparkle layer moves at only 8%
of that speed. The difference makes it look "far away".
`requestAnimationFrame` makes sure we update at most once per frame.

## The glows

A `radial-gradient` that goes from a see-through colour in the middle
to `transparent` at the edge. It sits at `z-index: -1` so it is behind
the section's content.

## `prefers-reduced-motion`

Some people get dizzy from motion and turn it off in their device
settings. We respect that:

- CSS: `@media (prefers-reduced-motion: reduce) { .star { animation: none; } }`
- JS: `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
  → parallax is not started.

## Where to change things

| What | Where |
|---|---|
| star colour, glow, min/max opacity | CSS variables at the top of `.atmosphere` in `AtmosphereBackground.vue` |
| twinkle speed | `duration:` line in the `stars` list (now 4–10s) |
| number of stars / sparkles | `<AtmosphereBackground :star-count="60" :sparkle-count="5" />` |
| parallax speed or off | `:parallax-speed="0.15"` or `:parallax="false"` |
| sparkle colour/opacity | `--sparkle-color`, `--sparkle-opacity` |
| glow colours / strength | `.glow-blue` / `.glow-purple` in `SectionGlow.vue` |
| glow position per section | the `<SectionGlow x=".." y=".." size=".." />` tag in that section |
| everything off | remove `<AtmosphereBackground />` from `app.vue` |
