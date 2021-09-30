![Pioneer](https://user-images.githubusercontent.com/247363/116713796-699da780-a9d5-11eb-82b1-a42bccd642d7.png)


# Pioneer

[![Netlify Status](https://api.netlify.com/api/v1/badges/d870546e-6452-42d6-81d2-7a625637d6a4/deploy-status)](https://app.netlify.com/sites/pioneer-2/deploys)
[![CI](https://github.com/Joystream/pioneer/actions/workflows/CI.yml/badge.svg)](https://github.com/Joystream/pioneer/actions/workflows/CI.yml)

Governance application for the Joystream DAO platform.

## Preview build

The preview build, deployed from the main branch, is available on [https://pioneer-2.netflify.app/](https://pioneer-2.netflify.app/).
Components preview and testing from main branch, is available on [https://pioneer-2-storybook.netlify.app/](https://pioneer-2-storybook.netlify.app/).

The deployed version can interact with two backends:

- Olympia testnet – A deployed Olympia testnet.
- Local – A local a Joystream node and a mocked version of the query-node.

## Quickstart

After cloning the repository run:

```shell
## Install npm packages
yarn

## Build all the sub-packages
yarn build

## To start local development server
yarn start

## To start local storybook instance
yarn storybook

## To run tests
yarn test
```

## Development

For development documentation see [Dev Readme](docs/README.md)

## Packages

The project's monorepo contains packages:

- [packages/ui](packages/ui) – The main Pioneer 2.0 package
- [packages/types](packages/types) – A copy of [@joystream/types](https://github.com/Joystream/joystream/tree/olympia/types) checked out from an Olympia dev branch.
- [packages/metadata-protobuf](packages/metadata-protobuf) – A copy [@joystream/metadata-protobuf](https://github.com/Joystream/joystream/tree/olympia/metadata-protobuf) checked out from an Olympia dev branch.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details


## License

See [LICENSE](LICENSE) for details
