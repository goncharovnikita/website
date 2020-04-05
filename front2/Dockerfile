FROM node:12.13.0-alpine3.10 as builder

WORKDIR /app

COPY . /app

RUN npm install

ARG apiBaseUrl=https://api.goncharovnikita.com

ARG requestWeatherUrl=/weather/

ENV API_BASE_URL=${apiBaseUrl}

ENV REQUEST_WEATHER_URL=${requestWeatherUrl}

RUN npm run build

FROM node:12.13.0-alpine3.10 as worker

WORKDIR /app

COPY --from=builder /app/.next .next

COPY --from=builder /app/public public

COPY --from=builder /app/node_modules node_modules

COPY --from=builder /app/package.json package.json

RUN ls -la

CMD ["npm", "run", "start", "--", "-H", "0.0.0.0"]
