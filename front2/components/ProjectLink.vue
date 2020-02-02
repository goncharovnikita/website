<template>
  <a
    v-bind:href="src"
    class="project-link-container"
    rel="noopener noreferrer"
    target="blank"
  >
    <img v-bind:src="img" class="icon" alt="" />
    <span class="type">{{ typeText }}</span>
  </a>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default() {
        return 'web'
      }
    }
  },
  computed: {
    img() {
      switch (this.type) {
        default:
          return require('../assets/icons/safari.svg')
      }
    },
    typeText() {
      switch (this.type) {
        default:
          return 'Web'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.project-link-container {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 12px;
  text-decoration: none;
  color: #000000;

  .icon {
    height: 20px;
    width: 20px;
  }
}
</style>
