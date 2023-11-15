FROM node:20-alpine3.18 AS builder
WORKDIR /app

COPY packages/server/package.json ./
COPY packages/server/docker/yarn.lock ./
RUN yarn --immutable

COPY tsconfig.json ./base.tsconfig.json
COPY packages/server/tsconfig.json ./
RUN sed -i 's/"extends":.*/"extends": ".\/base.tsconfig.json",/' tsconfig.json

COPY packages/server/prisma ./
COPY packages/server/codegen.ts ./
COPY packages/server/src ./src
RUN yarn build:local

RUN rm -rf node_modules
ENV NODE_ENV=production
RUN yarn --prod --immutable
RUN yarn prisma generate

FROM postgres:16.0-alpine3.18
WORKDIR /app
RUN apk add --no-cache nodejs

COPY --from=builder --chown=postgres /app/dist ./dist
COPY --from=builder --chown=postgres /app/node_modules ./node_modules
COPY packages/server/prisma ./prisma
COPY packages/server/docker/dev/entrypoint.sh /entrypoint.sh
COPY packages/server/docker/dev/notify.sh /usr/bin/notify
COPY packages/server/docker/dev/env.sh ./
COPY packages/server/docker/dev/prisma-deploy.sh /docker-entrypoint-initdb.d/

ENV QUERY_NODE_ENDPOINT "https://query.joystream.org/graphql"
ENV PIONEER_URL "https://pioneerapp.xyz"
ENV STARTING_BLOCK 1
ENV APP_LOG_LEVEL "verbose"
ENV PORT 3000
EXPOSE 3000/tcp

ENTRYPOINT ["/entrypoint.sh"]
CMD ["api"]
