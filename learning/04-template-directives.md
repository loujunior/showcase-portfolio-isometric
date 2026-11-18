# 4. Template directives: v-for, v-if, :bind

Directives are special attributes that start with `v-`. They let the
HTML react to your JavaScript data.

## `{{ }}`: show a value

```vue
<h3>{{ project.title }}</h3>
```

## `v-for`: repeat an element for every item in a list

```vue
<a v-for="link in links" :key="link.href" :href="link.href">
  {{ link.label }}
</a>
```

This creates one `<a>` per item in `links`. `:key` must be unique;
Vue uses it to keep track of each item.

With an index (`ProjectsSection.vue`):

```vue
<div v-for="(project, index) in projects" :key="project.id">
```

## `v-if` / `v-else`: show something only when a condition is true

```vue
<img v-if="project.image" :src="project.image" />
<div v-else class="placeholder" />
```

If a project has an image, show it; otherwise show the blue box.

## `:attribute`: bind an attribute to JavaScript

`:` is short for `v-bind:`. Examples from the project:

```vue
:src="project.image"                     <!-- attribute from data -->
:style="{ width: value + '%' }"          <!-- inline style from data -->
:class="{ 'is-right': index % 2 === 1 }" <!-- add class when true -->
```

`index % 2 === 1` means "index is odd" (1, 3, 5...), so every
second project card gets the class `is-right` and moves to the right.
