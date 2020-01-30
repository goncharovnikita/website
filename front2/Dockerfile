FROM node:12.13.0-alpine3.10 as builder

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

FROM node:12.13.0-alpine3.10 as worker

WORKDIR /app

COPY --from=builder /app/.nuxt .

COPY --from=builder /app/node_modules .

COPY --from=builder /app/package.json .

CMD ["npm", "run", "start"]
