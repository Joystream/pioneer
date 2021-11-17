# Markdown editor for Pioneer

This package contains [CKEditor 5](https://ckeditor.com/ckeditor-5/) build configuration for Pioneer 2. This package also holds the distribution version of the editor that is used by the Pioneer app.

## Development

The built version of the package is distributed in `dist` folder. Any change to code (adding or removing editor plugins) requires rebuilding the distributed version.

To rebuild the editor run:

```shell
yarn workspace @joystream/markdown-editor build
```

### Updating dependencies

To update dependencies:

1. Update all `@ckeditor/*` packages to the same version (dev packages has different versioning than core plugins).
2. Run `yarn install` to update npm packages & regenreate `yarn.lock`.
3. Run `yarn workspace @joystream/markdown-editor build` to rebuild the `dist` folder.
