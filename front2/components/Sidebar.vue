<template>
  <div class="sidebar">
    <div class="sidebar-avatar">
      <img src="~/static/images/avatar.jpg" alt="" class="avatar" />
    </div>
    <div class="credentials">
      <h3><n-link to="/">Goncharov Nikita</n-link></h3>
    </div>
    <div class="menu">
      <ul class="menu-list">
        <li v-for="item of menuItems">
          <nuxt-link
            v-bind:to="item.src"
            v-bind:class="{ active: item.active }"
            >{{ item.title }}</nuxt-link
          >
        </li>
      </ul>
    </div>
    <div class="sidebar-footer">
      <div class="icons-container">
        <a href="https://github.com/goncharovnikita"
          ><img class="icon-img" src="~/assets/icons/github.svg" alt=""
        /></a>
        <a href="https://medium.com/@cashalot"
          ><img class="icon-img" src="~/assets/icons/medium.svg" alt=""
        /></a>
        <a href="https://twitter.com/jamberspof"
          ><img class="icon-img" src="~/assets/icons/twitter.svg" alt=""
        /></a>
      </div>
    </div></div
></template>

<script>
export default {
  props: {
    active: {
      type: String,
      required: true
    }
  },
  computed: {
    menuItems() {
      return [
        {
          id: 'projects',
          title: 'Проекты',
          src: '/',
          active: false
        },
        {
          id: 'weather',
          title: 'Погода',
          src: '/weather',
          active: false
        }
      ].map((item) => {
        return {
          ...item,
          active: item.id === this.active
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  grid-area: sidebar;
  background-color: var(--sidebar-color);
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-template-areas: 'avatar' 'credentials' 'info' 'side-footer';
  overflow-y: hidden;
  opacity: 0.8;
}
.sidebar-avatar {
  height: 100%;
  grid-area: avatar;
  min-width: 0;
  display: grid;
  grid-template-columns: 25% 50% 25%;
  grid-template-areas: '. avatar-photo .';
  padding: 41px 12px;
}
.menu {
  grid-area: info;
  padding: 36px;

  &-list {
    list-style-type: none;
    font-size: 20px;
    li {
      margin-bottom: 12px;
      a {
        text-decoration: none;
        color: #000000;
        &.active {
          font-weight: bold;
          border-bottom: 2px solid #000000;
        }
      }
    }
  }
}
.avatar {
  height: 140px;
  grid-area: avatar-photo;
  width: initial;
  align-self: center;
  border-radius: 25px;
  justify-self: center;
}
.credentials {
  grid-area: credentials;
  align-self: center;
  justify-self: center;
  background-color: var(--primary-color);
  width: 100%;
  padding: 19px 0;

  h3 {
    font-weight: bold;
    color: var(--accent-color);
    margin: 0;
    text-align: center;
    font-weight: 500;
    font-size: 24px;
    a {
      text-decoration: none;
      color: var(--accent-color);
    }
  }
}
.sidebar-footer {
  padding-bottom: 41px;
  grid-area: side-footer;
  width: 100%;
  justify-self: center;

  @media (max-width: 600px) {
    padding-bottom: 21px;
  }
}
.icons-container {
  display: flex;
  justify-content: center;
}
.icon-img {
  height: 36px;
  width: auto;
  margin: 0 29px;
}
</style>
