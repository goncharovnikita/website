module.exports = {
    publicRuntimeConfig: {
        apiBaseUrl: "https://api.goncharovnikita.com",
        requestWeatherUrl:
            process.env.REQUEST_WEATHER_URL || "/weather"
    }
};
