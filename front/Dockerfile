FROM mhart/alpine-node:8.9.1 as builder

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/public /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
