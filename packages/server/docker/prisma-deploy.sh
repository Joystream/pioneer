#!/usr/bin/env bash

cd /app
prisma migrate deploy 
prisma generate