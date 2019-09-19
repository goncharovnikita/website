#!/bin/bash
docker build --rm -f Dockerfile --build-arg  -t goncharovnikita/website:website . && \
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD" && \
docker push goncharovnikita/website:front
