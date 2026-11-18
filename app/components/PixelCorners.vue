<!--
  PixelCorners: draws the four small corner brackets you see
  around the "Explore my work" button and the character image.
  Put it inside an element that has `position: relative`.
-->
<template>
  <span class="corner top-left" aria-hidden="true" />
  <span class="corner top-right" aria-hidden="true" />
  <span class="corner bottom-left" aria-hidden="true" />
  <span class="corner bottom-right" aria-hidden="true" />
</template>

<style scoped>
.corner {
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: var(--color-accent);
  border-style: solid;
  border-width: 0;
}

/* Each corner only shows two of its four borders */
.top-left {
  top: -8px;
  left: -8px;
  border-top-width: 1px;
  border-left-width: 1px;
}
.top-right {
  top: -8px;
  right: -8px;
  border-top-width: 1px;
  border-right-width: 1px;
}
.bottom-left {
  bottom: -8px;
  left: -8px;
  border-bottom-width: 1px;
  border-left-width: 1px;
}
.bottom-right {
  bottom: -8px;
  right: -8px;
  border-bottom-width: 1px;
  border-right-width: 1px;
}
</style>
