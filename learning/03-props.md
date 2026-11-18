# 3. Props: passing data to a component

**Props** are like function parameters, but for components.
The *parent* gives data, the *child* uses it.

## Example: StatBar

The child declares which props it accepts (`StatBar.vue`):

```js
defineProps({
  label: { type: String, required: true },
  value: { type: Number, required: true }
})
```

The parent passes them in (`CharacterProfile.vue`):

```vue
<StatBar label="Creativiteit" :value="80" />
```

- `label="Creativiteit"` → passes the **text** "Creativiteit"
- `:value="80"` → the `:` means "this is JavaScript", so it passes the
  **number** 80 (without `:` it would be the text "80")

Inside the child you can use the props directly in the template:
`{{ label }}` and `value`.

## Example: ProjectCard

Here a whole object is passed:

```vue
<ProjectCard :project="project" />
```

and the card reads `project.title`, `project.description`, `project.image`.

## Rule to remember

Data flows **down** (parent → child). A child should not change its
props. If something needs to change, change it in the parent (or in
the data file).
