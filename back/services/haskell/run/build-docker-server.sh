#!/bin/bash
TAG=goncharovnikita/website:run-server

docker build --rm -f Dockerfile.server -t $TAG . && \
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD" && \
docker push $TAG
