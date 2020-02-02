<template>
  <div class="layout-index">
    <sidebar></sidebar>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar'

export default {
  components: {
    Sidebar
  }
}
</script>

<style lang="scss">
.layout-index {
  opacity: 1;
  min-height: 100vh;
  display: grid;
  grid-template-areas: 'sidebar content';
  grid-template-columns: 30% 70%;
  grid-template-rows: 100% 100%;
  z-index: 199;

  @media (max-width: 600px) {
    display: grid;
    grid-template-areas: 'content';
    grid-template-columns: 100%;
    z-index: 199;
    background-size: cover;
  }
}
</style>
