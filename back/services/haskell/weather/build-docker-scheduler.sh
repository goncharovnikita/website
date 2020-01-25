#!/bin/bash
TAG=goncharovnikita/website:weather-scheduler

docker build --rm -f Dockerfile.scheduler -t $TAG . && \
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD" && \
docker push $TAG
