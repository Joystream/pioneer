#!/usr/bin/env bash

export POSTGRES_USER=${POSTGRES_USER:="postgres"}
export POSTGRES_DB=${POSTGRES_DB:=POSTGRES_USER}
if [ -z "$POSTGRES_PASSWORD" ]; then
    export DATABASE_URL="postgresql://${POSTGRES_USER}@localhost/${POSTGRES_DB}?host=/var/run/postgresql/"
else
    export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost/${POSTGRES_DB}?host=/var/run/postgresql/"
fi

export APP_SECRET_KEY=${APP_SECRET_KEY:=${POSTGRES_PASSWORD:="pioneer"}}