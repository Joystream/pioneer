/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const { styles } = require('@ckeditor/ckeditor5-dev-utils')
const webpack = require('webpack')

const resolve = {
  extensions: ['.tsx', '.ts', '.js'],
  fallback: {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    path: false,
  },
  alias: {
    '@': path.resolve(__dirname, '../src'),
  },
}

const plugins = [
  new webpack.ProvidePlugin({
    Buffer: ['buffer', 'Buffer'],
    process: 'process/browser.js',
  }),
]

const rules = [
  {
    test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
    use: ['raw-loader'],
  },
  {
    test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
    use: [
      {
        loader: 'style-loader',
        options: {
          injectType: 'singletonStyleTag',
          attributes: {
            'data-cke': true,
          },
        },
      },
      {
        loader: 'postcss-loader',
        options: styles.getPostCssConfig({
          themeImporter: {
            themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
          },
          minify: true,
        }),
      },
    ],
  },
]

module.exports = {
  resolve,
  plugins,
  rules,
}
