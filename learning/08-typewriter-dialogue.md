# 8. Typewriter dialogue (DialogueBox.vue)

The retro dialogue box between the Character Profile and Projects
types its text letter by letter, like in classic handheld RPGs.
It plays automatically, once, when you scroll to it.

## The idea in 4 steps

1. **Wait until it's visible**: `IntersectionObserver`
2. **Type letters**: an `async` function with a small `wait()` helper
3. **Show the ▼**: `v-if="isFinished"` + a CSS bounce
4. **Clean up**: `onUnmounted`

## 1. IntersectionObserver: "is it on screen?"

```js
observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    observer.disconnect() // only once!
    playDialogue()
  }
}, { threshold: 0.5 })

observer.observe(boxElement.value)
```

The browser calls our function when 50% of the box is visible.
We `disconnect()` right away, so scrolling up and down never restarts it.
This runs in `onMounted`, because the element only exists in the
browser after the component is mounted.

## 2. The typewriter: async/await + wait()

```js
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function playDialogue() {
  for (let lineIndex = 0; lineIndex < props.lines.length; lineIndex++) {
    for (const letter of props.lines[lineIndex]) {
      typedLines.value[lineIndex] += letter // add one letter
      await wait(props.speed)                // wait 55 ms
    }
    if (lineIndex < props.lines.length - 1) {
      await wait(props.pause)                // wait 600 ms between lines
    }
  }
  isFinished.value = true                    // show the ▼
}
```

- `wait(55)` returns a *Promise* that is done after 55 ms.
- `await` pauses **only this function**, not the page, so the visitor
  can keep scrolling normally.
- `typedLines` is a `ref` holding `['', '']`. Every added letter
  updates the screen automatically.
- Line 1 stays visible, because each line has its own string in the array.

## 3. The bouncing ▼

```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(4px); }
}
```

It only exists in the page when `isFinished` is `true` (`v-if`).

## 4. Cleaning up

```js
onUnmounted(() => {
  isStopped = true      // the typing loop checks this and stops
  observer?.disconnect()
})
```

## Accessibility

- **Reduced motion**: both lines appear at once and the ▼ doesn't move.
- **Screen readers**: they get the full text from a visually hidden `<p>`.
  The typed text has `aria-hidden="true"`, so it isn't read out
  letter by letter.

## Changing the text, speed and pause

In `AboutSection.vue`:

```js
const lines = ['Oh daar ben je!', 'Ik laat je mijn projecten zien!']
```

```vue
<DialogueBox :lines="lines" :speed="55" :pause="600" />
```

- `speed`: milliseconds per letter. Lower = faster.
- `pause`: milliseconds between line 1 and line 2.
- The bounce: change `4px` / `1s` in `@keyframes bounce` in `DialogueBox.vue`.
