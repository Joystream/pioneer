![Pioneer](https://user-images.githubusercontent.com/247363/116713796-699da780-a9d5-11eb-82b1-a42bccd642d7.png)


# Pioneer

[![CI](https://github.com/Joystream/pioneer/actions/workflows/CI.yml/badge.svg)](https://github.com/Joystream/pioneer/actions/workflows/CI.yml)

Governance application for the Joystream DAO platform.

## Deployed version

- The live production is available on [https://pioneerapp.xyz/)
- Components preview and testing from `dev` branch, is available on [https://pioneer-2-storybook.vercel.app/](https://pioneer-2-storybook.vercel.app/).

The deployed version can interact with two backends:

- Joystream testnet – A deployed testnet.
- Local – [A Joystream ecosystem running locally](docs/testenv.md).

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

## Production

To run a Pioneer instance check the [admin documentation](docs/admin.md)

## Packages

The project's monorepo contains packages:

- [packages/ui](packages/ui) – The main Pioneer 2.0 package
- [packages/types](packages/types) – A copy of [@joystream/types](https://github.com/Joystream/joystream/tree/master/types) checked out from the `master` branch.
- [packages/metadata-protobuf](packages/metadata-protobuf) – A copy [@joystream/metadata-protobuf](https://github.com/Joystream/joystream/tree/master/metadata-protobuf) checked out from an `master` branch.
- [packages/markdown-editor](packages/markdown-editor) – A CKEditor 5 build used as Markdown editor.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details

For community development board view this [Public board](https://github.com/orgs/Joystream/projects/55), managed by DAO Builders Working Group
To participate, reach out to Builders Working Group Lead on Discord


## License

See [LICENSE](LICENSE) for details
