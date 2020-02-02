<template>
  <div class="container">
    <div class="title-container">
      <p class="title">
        <a v-bind:href="href" rel="noopener noreferrer" target="_blank">{{
          title
        }}</a>
      </p>
    </div>
    <div class="img-container">
      <img v-bind:src="img" v-bind:alt="title" class="img" />
    </div>
    <div class="description-container">
      <p class="description-text">
        {{ description }}
      </p>
      <hr class="divider" />
      <div class="links">
        <project-link
          v-for="link of links"
          v-bind:type="link.type"
          v-bind:src="link.src"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProjectLink from '~/components/ProjectLink'

export default {
  components: {
    ProjectLink
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    links: {
      type: Array,
      required: false,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template: 'title title' 'image description';
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-row-gap: 24px;
  grid-column-gap: 24px;
  background-color: var(--sidebar-color);
  padding: 24px 32px;
}

.title-container {
  grid-area: title;
  .title {
    font-size: 24px;
    font-weight: 900;
  }
}

.img-container {
  grid-area: image;
  .img {
    height: 120px;
    width: 120px;
  }
}

.description-container {
  grid-area: description;
}
.divider {
  margin-top: 24px;
  margin-bottom: 8px;
}
</style>
