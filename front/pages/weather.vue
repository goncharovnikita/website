<template>
  <div class="layout">
    <sidebar active="weather"></sidebar>
    <div class="content">
      <div class="title-container"><content-title>Погода</content-title></div>
      <div v-if="!error" class="weather-container">
        <div class="weather-box">
          <span class="temperature">{{ temperature }}</span>
          <client-only>
            <p class="updated-title">Обновлено: <date v-bind:date="date" /></p>
          </client-only>
        </div>
      </div>

      <div v-else class="weather-container">
        <div class="weather-box">
          <p class="error-message">Some error occurred</p>
          <app-button @click="reloadPage" text="Reload page"></app-button>
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
import Button from '~/components/Button'

export default {
  components: {
    Sidebar,
    Date,
    ContentTitle,
    'app-button': Button
  },
  async asyncData({ env }) {
    try {
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

      return { temperature, date: dt, error: false }
    } catch {
      return { error: true }
    }
  },

  methods: {
    reloadPage() {
      document.location.reload()
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
  grid-template-columns: 300px 700px;
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

.error-message {
  color: var(--error-color);
  font-size: 2rem;
  line-height: 2rem;
  text-align: center;
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
