#!/bin/sh
set -x

if [ ! -f .env ]; then
  sed 's/^QUERY_NODE_ENDPOINT: .*/QUERY_NODE_ENDPOINT: "http:\/\/graphql-server:8081\/graphql"/' .env.dev > .env
fi
yarn docker down
docker network create joystream_default 2> /dev/null
yarn docker -f docker-compose.yml -f compose.network.yml up
