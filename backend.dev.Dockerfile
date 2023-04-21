FROM node:alpine3.17 AS builder
WORKDIR /app
COPY packages/server/package.json ./
COPY yarn.lock ./
RUN yarn remove node-cron @joystream/types
RUN yarn --immutable
COPY tsconfig.json ./base.tsconfig.json
COPY packages/server/src ./src
COPY packages/server/codegen.ts ./
COPY packages/server/tsconfig.json ./
RUN sed -i 's/"extends":.*/"extends": ".\/base.tsconfig.json",/' tsconfig.json
COPY packages/server/prisma ./
RUN yarn build:local
RUN rm -rf node_modules
ENV NODE_ENV=production
RUN yarn --prod --immutable

FROM postgres:alpine3.17
WORKDIR /app
RUN apk add --no-cache nodejs
COPY --from=builder --chown=postgres /app/dist ./dist
COPY --from=builder --chown=postgres /app/node_modules ./node_modules
COPY packages/server/prisma ./prisma
COPY packages/server/docker/dev.entrypoint.sh /entrypoint.sh
COPY packages/server/docker/prisma-deploy.sh /docker-entrypoint-initdb.d/
COPY packages/server/docker/notify.sh /usr/bin/notify
COPY packages/server/docker/env.sh ./
RUN du -hd 1
ENV QUERY_NODE_ENDPOINT "https://query.joystream.org/graphql"
ENV PIONEER_URL "https://pioneerapp.xyz"
ENV STARTING_BLOCK 1
ENV APP_LOG_LEVEL "verbose"
ENV PORT 3000
EXPOSE 3000/tcp
ENTRYPOINT ["/entrypoint.sh"]
CMD ["api"]