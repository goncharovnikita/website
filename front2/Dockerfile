FROM node:12.13.0-alpine3.10 as builder

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

FROM node:12.13.0-alpine3.10 as worker

WORKDIR /app

COPY --from=builder /app/.nuxt .nuxt

COPY --from=builder /app/node_modules node_modules

COPY --from=builder /app/package.json package.json

RUN ls -la

CMD ["npm", "run", "start", "--", "--H", "0.0.0.0"]
