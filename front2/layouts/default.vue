<template>
  <div>
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Roboto Mono', 'Merriweather-Regular', 'Source Sans Pro',
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

html,
body,
#__nuxt {
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

h1,
h2,
h3,
p {
  margin: 0;
}

@font-face {
  src: url('~assets/fonts/Merriweather-Regular.ttf');
  font-family: 'Merriweather-Regular';
}

@font-face {
  src: url('~assets/fonts/Quicksand-Regular.ttf');
  font-family: 'Quicksand-Regular';
}

* {
  --primary-color: #1d2228;
  --sidebar-color: #f2f2f2;
  --accent-color: #fb8122;
  --deep-blue: #004080;
  --typeface-color: #a3c2c2;

  --titles-font: 'Roboto Mono';
  --typeface-font: 'Roboto Mono';
}

* {
  margin: 0;
  padding: 0;
  font-family: var(--typeface-font);
}

#__layout {
  background-color: var(--primary-color);
  height: 100%;
}
</style>
