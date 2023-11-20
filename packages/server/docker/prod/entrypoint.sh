#!/bin/sh

set -e

export PATH=$PATH:/app/node_modules/.bin

case "$1" in
    api)
        cd /app
        until prisma migrate deploy; do
          echo "Waiting for the db to be ready..."
          sleep 1
        done
        node ./dist/common/scripts/startApi
    ;;

    *)
        exec "$@"
    ;;
esac
