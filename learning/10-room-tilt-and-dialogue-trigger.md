# 10. Room tilt and the dialogue trigger

## Room tilt (HeroSection.vue)

The room tilts a tiny bit towards your mouse.

### 1. Mouse position as a number from -0.5 to 0.5

```js
const box = roomWrapper.value.getBoundingClientRect()
mouseX = (event.clientX - box.left) / box.width - 0.5
mouseY = (event.clientY - box.top) / box.height - 0.5
```

`clientX - box.left` = how many pixels from the left edge of the room.
Divided by the width gives 0 (left) … 1 (right). Minus 0.5 gives
-0.5 … 0.5, so the centre of the room is 0.

### 2. requestAnimationFrame: update once per frame

`mousemove` can fire more than 100 times per second, but the screen only
draws ~60 frames per second. So we only *ask* for an update, and the
browser calls `applyTilt` right before it draws the next frame:

```js
if (!frameRequest) {
  frameRequest = requestAnimationFrame(applyTilt)
}
```

### 3. CSS transform

```js
const rotateY = mouseX * 2 * MAX_ROTATE   // -2.5° … 2.5°
roomImage.value.style.transform =
  `perspective(900px) rotateX(...) rotateY(...) translate(...)`
```

The image moves, the **wrapper** stays where it is. That way the tilt
never overwrites the position/size styles (they are on the wrapper).

### 4. Back to the start

On `mouseleave` we remove the transform, and `transition: transform 0.4s`
in the CSS makes the room glide back.

### 5. Only for a real mouse

```js
window.matchMedia('(hover: hover) and (pointer: fine)').matches
```

is `false` on phones and tablets, so the room stays still there.

The tilt deliberately does **not** check `prefers-reduced-motion`.
It only moves while the visitor moves the mouse over it, by a few
pixels, so it never moves on its own. (First it did check it, and that
is why it never worked on a PC where Windows "Animation effects" is off:
that setting makes the browser report "reduce motion".)

**Change the strength:** `MAX_ROTATE` and `MAX_MOVE` at the top of the script.

## Dialogue trigger (CharacterProfile.vue + DialogueBox.vue)

The dialogue should start *before* you see the box, while you are still
reading the bottom of the Character Profile.

1. `CharacterProfile.vue` has an invisible marker at 78% of its height:
   `<span id="dialogue-trigger" class="dialogue-trigger" />`
2. `AboutSection.vue` tells the dialogue to watch that marker:
   `<DialogueBox trigger-id="dialogue-trigger" />`
3. `DialogueBox.vue` observes it:

```js
observer = new IntersectionObserver(callback, {
  rootMargin: '0px 0px -15% 0px'
})
```

`rootMargin: -15%` at the bottom makes the "visible area" a bit smaller,
so the marker must be a little above the bottom of the screen. That
stops it from starting too early.

The real `rootMargin` is `'99999px 0px -15% 0px'`. The huge top margin
means "everything above the screen also counts as visible". Why?
An IntersectionObserver only calls you when the state *changes*. If you
jump past the marker (menu link, fast scrolling), it goes from "below the
screen" straight to "above the screen" and never counted as visible, so
the dialogue would never start. With the big top margin, "above the
screen" counts as visible too, so the jump still triggers it.

**Earlier / later start:** change `top: 78%` of `.dialogue-trigger`,
or the `-15%` in `rootMargin`.

## The "start" event and the attention lines

`DialogueBox` tells its parent when it starts, with an **event**:

```js
const emit = defineEmits(['start'])
emit('start')
```

`AboutSection` listens and sets a `ref`:

```vue
<DialogueBox @start="isTalking = true" />
<div class="speaker" :class="{ 'is-talking': isTalking }">
```

The class `is-talking` starts two CSS animations: the three lines
`pop-in` (scale 0 → 1.2 → 1) and the character does a small `hop`.
The dialogue waits `startDelay` (300 ms) so the lines appear first.

This is the opposite direction of props: **props** go parent → child,
**events** go child → parent.

## Purple outline that follows the character

```css
filter:
  drop-shadow(2px 0 0 #c9bfff)    /* right */
  drop-shadow(-2px 0 0 #c9bfff)   /* left  */
  drop-shadow(0 2px 0 #c9bfff)    /* down  */
  drop-shadow(0 -2px 0 #c9bfff)   /* up    */
  drop-shadow(0 0 10px rgba(156, 140, 240, 0.45)); /* glow */
```

`box-shadow` would draw around the *rectangle* of the image.
`drop-shadow` follows the *visible pixels* of a transparent image, so
four sharp shadows in four directions make an outline, and one blurry
shadow makes the glow.

## No jumping text while typing

The full sentence is always in the box. The part that is not typed yet
is hidden with `visibility: hidden` (it still takes up space):

```vue
{{ line.slice(0, typedCounts[index]) }}<span class="untyped">{{ line.slice(typedCounts[index]) }}</span>
```

So the box never changes height, and a long word never jumps to the next
line halfway through typing.

## The ▼ arrow

```css
animation: bob 0.8s steps(1) infinite;
```

`steps(1)` makes the arrow *jump* between two positions instead of
sliding smoothly, just like the arrow in classic handheld games.
