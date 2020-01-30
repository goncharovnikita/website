<template>
  <div>
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

@font-face {
  src: url('/fonts/Merriweather-Regular.ttf');
  font-family: 'Merriweather-Regular';
}

@font-face {
  src: url('/fonts/Quicksand-Regular.ttf');
  font-family: 'Quicksand-Regular';
}

* {
  --primary-color: #e6f3ff;
  --sidebar-color: #e6f3ffe8;
  --accent-color: #66b5ff;
  --deep-blue: #004080;
  --typeface-color: #a3c2c2;

  --titles-font: 'Merriweather-Regular';
  --typeface-font: 'Quicksand-Regular';
}

* {
  margin: 0;
  padding: 0;
  font-family: var(--typeface-font);
}
</style>
