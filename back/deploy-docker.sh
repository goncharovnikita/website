#!/bin/bash

curl -H "Content-Type: application/json" --data '{"docker_tag": "back"}' -X POST https://registry.hub.docker.com/u/repgarage/refrigerator/trigger/636f13dd-5526-4c58-a4bf-109679ce7df1/