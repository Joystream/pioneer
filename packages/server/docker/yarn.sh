#!/bin/sh

docker run \
  --rm -it \
  -v "$(pwd)/package.json:/app/package.json" \
  -v "$(pwd)/docker/yarn.lock:/app/yarn.lock" \
  -w /app \
  node:20-alpine \
  sh -c "yarn $@"
