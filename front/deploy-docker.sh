#!/bin/bash
docker build --rm -f Dockerfile --build-arg  -t goncharovnikita/treader:website . && \
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD" && \
docker push goncharovnikita/website:front
