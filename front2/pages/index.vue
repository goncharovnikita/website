<template>
  <div class="layout">
    <div class="sidebar">
      <div class="sidebar-avatar">
        <img src="~/assets/images/avatar.jpg" alt="" class="avatar" />
      </div>
      <div class="credentials">
        <h3>Goncharov Nikita</h3>
      </div>
      <div class="sidebar-footer">
        <div class="flex">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="scss">
.layout {
  opacity: 1;
  height: 100vh;
  display: grid;
  grid-template-areas: 'sidebar content';
  grid-template-rows: 100% 100%;
  z-index: 199;

  @media (min-width: 600px) {
    display: grid;
    grid-template-areas: 'sidebar content';
    grid-template-columns: 33% 67%;
    z-index: 199;
    background-size: cover;
  }
}
.sidebar {
  height: 100%;
  grid-area: sidebar;
  background-color: var(--primary-color);
  display: grid;
  grid-template-rows: 25% 5% 1fr 7%;
  grid-template-areas: 'avatar' 'credentials' 'info' 'side-footer';
  grid-gap: 10px;
  overflow-y: hidden;
  opacity: 0.8;
}
.sidebar-avatar {
  grid-area: avatar;
  min-width: 0;
  display: grid;
  grid-template-columns: 25% 50% 25%;
  grid-template-areas: '. avatar-photo .';
  padding: 12px;
}
.avatar {
  grid-area: avatar-photo;
  width: initial;
  height: 100%;
  align-self: center;
  border-radius: 50%;
  justify-self: center;
}
.credentials {
  grid-area: credentials;
  font-family: var(--titles-font);
  align-self: center;
  justify-self: center;
}
.sidebar-footer {
  grid-area: side-footer;
  width: 50%;
  justify-self: center;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.icon-img {
  height: 5vh;
  width: auto;
}
</style>
