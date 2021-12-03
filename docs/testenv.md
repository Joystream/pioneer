# Running the Joystream ecosystem locally

The Pioneer 2 is targeted for the Olympia release and it is compatible with the runtime from the `olympia` branch.

```
https://github.com/Joystream/joystream/tree/olympia
```

However, the current version of Pioneer 2 is ahead of the olympia branch in terms of the query-node support. While the query-node related features are under development, we track the most recent changes at:

```
https://github.com/thesan/joystream/tree/debug-pioneer-elections
```
In order to use the compatible version of the Joystream ecosystem

## Prepare the dev environment

### 1. Install tools

This guide assumes that [docker](https://www.docker.com/) is installed.

### 2. Checkout integration branch

```shell
git origin add thesan https://github.com/thesan/joystream/tree/olympia
git fetch
git checkout debug-pioneer-elections
```

### 3. Install dependencies

Run `yarn install` inside the main repo. The full setup is not need (especially if you'd like to avoid using Volta).

### 4. Fetch proper `joystream-node` image

```shell
docker pull joystream/node:258e839bac52701553b5ded593b0359dd3296ee8
docker tag joystream/node:258e839bac52701553b5ded593b0359dd3296ee8 joystream/node:latest
```

## Run the ecosystem

All the below commands should be run inside `joystream` repo.

### 0. Rebuild the packages

In order to build required packages run the below command. This step is only needed after updating the branch.

```shell
yarn run build:packages
```

### 1. Run the joystream node image

```shell
docker-compose up -d joystream-node
```

### 2. Run the query-node services

```shell
yarn workspace query-node-root start
```

## Full restart

In order to do a full restart and clear the services state execute:

```shell
docker-compose rm -vsf joystream-node
yarn workspace query-node-root kill

docker-compose up -d joystream-node
yarn workspace query-node-root start
```
