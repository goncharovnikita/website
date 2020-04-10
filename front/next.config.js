const path = require("path");
const withOptimizedImages = require("next-optimized-images");

module.exports = withOptimizedImages({
    optimizeImagesInDev: true,
    mozjpeg: {
        quality: 70,
        progressive: true
    },
    publicRuntimeConfig: {
        apiBaseUrl: "https://api.goncharovnikita.com",
        requestWeatherUrl: process.env.REQUEST_WEATHER_URL || "/weather",
        requestWeatherHistoryUrl: process.env.REQUEST_WEATHER_HISTORY_URL || "/weather/history"
    },
    webpack(config) {
        config.resolve.alias.images = path.join(__dirname, "assets/images");
        return config;
    }
});
