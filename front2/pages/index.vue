<template>
  <div class="layout">
    <sidebar></sidebar>
    <div class="content-container">
      <content-title>Проекты</content-title>
      <div class="projects-list">
        <project-card
          v-for="project in projectCards"
          v-bind:title="project.title"
          v-bind:description="project.description"
          v-bind:href="project.href"
          v-bind:img="project.img"
          v-bind:links="project.links"
        ></project-card>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar'
import ContentTitle from '~/components/ContentTitle'
import ProjectCard from '~/components/ProjectCard'

export default {
  components: {
    Sidebar,
    ContentTitle,
    ProjectCard
  },
  data() {
    return {
      projectCards: [
        {
          title: 'ReactVPN',
          description:
            'ReactVPN - это мобильное приложение, позволяющее создать быстрое VPN соединение с одним из многих серверов по всему миру',
          href: 'https://reactvpn.com',
          img: require('../static/images/reactvpn-logo.png'),
          links: [
            {
              type: 'web',
              src: 'https://reactvpn.com'
            }
          ]
        },
        {
          title: 'Parfumsearch',
          description:
            'Parsumsearch - быстрый и удобный поиск духов по брендам, нотам и названиям',
          href: 'https://parfumsearch.com',
          img: require('../static/images/parfumsearch-logo.png'),
          links: [
            {
              type: 'web',
              src: 'https://parfumsearch.com'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  opacity: 1;
  min-height: 100vh;
  display: grid;
  grid-template-areas: 'sidebar content';
  grid-template-columns: 30% 70%;
  grid-template-rows: 100% 100%;
  z-index: 199;

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 100%;
    z-index: 199;
    background-size: cover;
  }
}

.content-container {
  grid-area: content;
}
.projects-list {
  padding: 0 41px;
  display: grid;
  grid-row-gap: 24px;
}
</style>
