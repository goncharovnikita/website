<template>
  <div class="layout">
    <sidebar></sidebar>
    <div class="content">
      <div class="title-container"><content-title>Погода</content-title></div>
      <div class="weather-container">
        <div class="weather-box">
          <span class="temperature">{{ temperature }}</span>
          <client-only>
            <p class="updated-title">Обновлено: <date v-bind:date="date" /></p>
          </client-only>
        </div>
      </div>

      <div class="footer-container">
        <nuxt-link to="/" class="footer-title">На главную</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Sidebar from '~/components/Sidebar'
import Date from '~/components/Date'
import ContentTitle from '~/components/ContentTitle'

export default {
  components: {
    Sidebar,
    Date,
    ContentTitle
  },
  async asyncData({ env }) {
    const reqUrl = env.apiBaseUrl + env.requestWeatherUrl
    const {
      data: { tInt, upZero, dt }
    } = await axios.get(reqUrl)

    const temperature = (() => {
      if (upZero) {
        return `+${tInt}`
      }

      return `-${tInt}`
    })()

    return { temperature, date: dt }
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
  z-index: 199;

  @media (max-width: 600px) {
    display: grid;
    grid-template-areas: 'content';
    grid-template-columns: 100%;
    z-index: 199;
    background-size: cover;
  }
}

.sidebar {
  @media (max-width: 600px) {
    display: none !important;
  }
}

.content {
  grid-area: content;
  display: grid;
  grid-template-areas: 'title' 'body';
  grid-template-rows: auto 1fr;

  @media (max-width: 600px) {
    grid-template-areas: 'title' 'body' 'footer';
    grid-template-rows: auto 1fr auto;
  }
}

.title-container {
  grid-area: title;
}

.weather-container {
  grid-area: body;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .weather-box {
    display: grid;
    grid-row-gap: 24px;
    background-color: var(--sidebar-color);
    padding: 57px 24px;

    @media (max-width: 600px) {
      width: 100%;
    }

    .temperature {
      color: var(--primary-color);
      font-size: 8rem;
      line-height: 8rem;
      text-align: center;
    }

    .updated-title {
      text-align: center;
    }
  }
}

.footer-container {
  grid-area: footer;
  padding: 22px;
  text-align: center;
  display: none;

  @media (max-width: 600px) {
    display: block;
  }

  .footer-title {
    color: var(--accent-color);
    text-align: center;
    font-size: 20px;
  }
}
</style>
