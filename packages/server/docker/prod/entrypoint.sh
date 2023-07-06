#!/bin/sh

export PATH=$PATH:/app/node_modules/.bin

case "$1" in
    api)
        cd /app
        prisma migrate deploy 
        node ./dist/common/scripts/startApi
    ;;

    *)
        exec "$@"
    ;;
esac