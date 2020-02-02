<template
  ><div class="container">
    <h2 class="title">
      <slot />
    </h2>
    <hr class="divider" /></div
></template>

<style lang="scss" scoped>
.container {
  padding: 20px 41px;
}
.title {
  color: white;
  margin-bottom: 14px;
}
.divider {
  height: 3px;
  background-color: #000000;
  border: none;
}
</style>
