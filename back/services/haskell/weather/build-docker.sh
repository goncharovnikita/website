#!/bin/bash
SERVER=goncharovnikita/website:weather-server
docker build --rm -f Dockerfile.server -t $SERVER . && \
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD" && \
docker push $SERVER
