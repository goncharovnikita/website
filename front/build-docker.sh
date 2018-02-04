#!/bin/sh

docker build --rm -f Dockerfile -t goncharovnikita/website:front . && \
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD" && \
docker push goncharovnikita/website:front