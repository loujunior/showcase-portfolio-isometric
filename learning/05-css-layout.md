# 5. CSS: variables, flexbox and grid

## CSS variables (custom properties)

Defined once in `main.css`:

```css
:root {
  --color-accent: #5278b2;
}
```

Used anywhere:

```css
.hero-title { color: var(--color-accent); }
```

Change the value in `:root` and every place that uses it updates.
All colours and fonts from the Figma design are variables.

## Flexbox: items in a row (or column)

```css
.nav {
  display: flex;
  gap: 100px;              /* space between items */
}
.site-header {
  display: flex;
  justify-content: space-between; /* push items to both ends */
  align-items: center;            /* center vertically */
}
```

Use flexbox for **one direction**: a menu, a row of tool squares,
a list of links.

## Grid: columns

```css
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr; /* two equal columns */
}
```

`1fr` = "one fraction of the free space". Use grid when you think in
**columns** (text left, image right).

## `position: relative` + `absolute`

The flowers and corner brackets are placed with:

```css
.profile-card { position: relative; }   /* the reference box */
.decor-left   { position: absolute; top: -40px; left: -28px; }
```

An `absolute` element is positioned relative to the nearest parent
with `position: relative`.

## `clamp()`: font sizes that scale

```css
font-size: clamp(40px, 6vw, 80px);
```

= "6% of the screen width, but never smaller than 40px and never
bigger than 80px".
