# 1. How the project is organised

```
nuxt.config.ts          ← settings: global CSS, page title, Google Fonts
app/
├─ app.vue              ← the root: places all sections in order
├─ assets/css/main.css  ← global styles (colours, fonts, .container)
├─ data/projects.js     ← plain data: the list of projects
└─ components/          ← one .vue file per piece of the page
public/images/          ← images, reachable at /images/name.png
```

## What is Nuxt?

Nuxt is a framework built **on top of Vue**. Vue builds the components;
Nuxt adds handy things around it, like:

- **Auto-imports**: every file in `components/` can be used directly.
  `components/HeroSection.vue` becomes `<HeroSection />` in `app.vue`,
  without an `import` line.
- **`public/` folder**: a file at `public/images/room.png` is available
  at the URL `/images/room.png`. That's why the `<img>` tags use
  `src="/images/room.png"`.
- **`~` alias**: `~/data/projects.js` means "start at the `app/` folder".

## One page, many sections

This site is a *single page*. Each section has an `id`
(`id="projects"`), and the menu links point to it (`href="#projects"`).
Clicking a link scrolls to the element with that id. That is standard
HTML, no JavaScript needed. `scroll-behavior: smooth` in `main.css`
makes the scroll animated.
