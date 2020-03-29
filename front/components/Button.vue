<template>
  <button @click="onClick" class="button">
    <span>{{ text }}</span>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },

  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  border: none;
  color: white;
  margin: 0;
  padding: 12px;
  background-color: var(--accent-color);
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: filter 100ms ease-in;

  &:hover {
    filter: drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.5));
  }
}
</style>
