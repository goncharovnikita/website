#!/bin/bash
TAG=goncharovnikita/website:$TRAVIS_BRANCH
docker build --rm -f Dockerfile -t $TAG . && \
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD" && \
docker push $TAG
