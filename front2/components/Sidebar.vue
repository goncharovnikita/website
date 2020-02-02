<template>
  <div class="sidebar">
    <div class="sidebar-avatar">
      <img src="~/static/images/avatar.jpg" alt="" class="avatar" />
    </div>
    <div class="credentials">
      <h3><n-link to="/">Goncharov Nikita</n-link></h3>
    </div>
    <div class="menu"></div>
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

<style lang="scss">
.sidebar {
  height: 100%;
  grid-area: sidebar;
  background-color: var(--sidebar-color);
  display: grid;
  grid-template-rows: auto 5% 1fr 7%;
  grid-template-areas: 'avatar' 'credentials' 'info' 'side-footer';
  grid-gap: 10px;
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
    a {
      text-decoration: none;
      color: var(--accent-color);
    }
  }
}
.sidebar-footer {
  grid-area: side-footer;
  width: 100%;
  justify-self: center;
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
