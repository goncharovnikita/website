#!/bin/bash
TAG=goncharovnikita/website:run-base
docker build --rm -f Dockerfile.base -t $TAG . && \
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD" && \
docker push $TAG
