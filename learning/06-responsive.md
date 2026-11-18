# 6. Responsive design with media queries

The Figma design is 1440px wide. On a phone (≈375px) that doesn't fit,
so some CSS changes when the screen gets smaller.

## Media queries

```css
@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr; /* 2 columns → 1 column */
  }
}
```

The rules inside only apply when the screen is **900px wide or less**.

## Breakpoints used in this project

| Width | What changes |
|---|---|
| ≤ 1200px | menu items get closer together |
| ≤ 900px | hero, profile and projects become one column |
| ≤ 760px | menu moves below the name; speech bubble goes under the character |
| ≤ 600px | project card: image above the text |
| ≤ 480px | smaller text and buttons |

Each component keeps its own media queries at the bottom of its
`<style>` block, under the comment `/* ---------- Responsive ---------- */`.

## How to test

- In the browser: press **F12**, then the phone/tablet icon
  (device toolbar), and pick a device or drag the width.
- Check there is **no horizontal scrollbar** at any width.
