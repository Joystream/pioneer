# Running the Joystream ecosystem locally

## Prepare the dev environment

### 1. Install tools

This guide assumes that [docker](https://www.docker.com/) is installed.

### 2. Clone the Joystream repository

```shell
git clone https://github.com/Joystream/joystream.git
```

### 3. Find the relevant `joystream-node` image tag

1. To target the `master` branch pick the latest workflow run from: https://github.com/Joystream/joystream/actions/workflows/joystream-node-docker-dev.yml?query=branch%3Amaster
2. In the job column choose either the `STAGING` or `PLAYGROUND` jobs. `STAGING` uses the same chain parameters as the `Joystream testnet` while `PLAYGROUND` has value simplifying testing (like shorter elections cycles)
3. Click on the `Check if we have pre-built image on Dockerhub` step to view the image tag.
   E.g in: `Run export IMAGE_EXISTS=$(docker manifest inspect joystream/node:1e27c1330d5a67f347789a7849ea2176ec89702a > /dev/null ; echo $?)`, `1e27c1330d5a67f347789a7849ea2176ec89702a` is the tag we are looking for.

### 3. Write the proper `joystream-node` image tag into `.env` file

In the `.env` file at the root of the `joystream` repo, find the line which contains `# JOYSTREAM_NODE_TAG=latest` and replace it by `JOYSTREAM_NODE_TAG={IMAGE-TAG}` (`{IMAGE-TAG}` being the image tag found on the previous step).

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
