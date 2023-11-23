#!/usr/bin/env bash

export PATH=$PATH:/app/node_modules/.bin
. /app/env.sh

case "$1" in
    api)
        docker-entrypoint.sh postgres &

        prismaClient=/app/node_modules/.prisma/client/index.js
        while grep -oh "@prisma/client did not initialize yet." $prismaClient ; do
            sleep 1
        done

        node /app/dist/common/scripts/startApi
    ;;

    postgres)
        docker-entrypoint.sh postgres
    ;;


    *)
        exec "$@"
    ;;
esac