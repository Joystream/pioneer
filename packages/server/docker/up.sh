#!/bin/sh
set -x

if [ ! -f .env ]; then
  sed 's/^QUERY_NODE_ENDPOINT: .*/QUERY_NODE_ENDPOINT: "http:\/\/graphql-server:8081\/graphql"/' .env.dev > .env
fi
docker network create joystream_default 2> /dev/null
yarn docker down
yarn docker up
