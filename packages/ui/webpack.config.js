const cp = require('child_process')
const path = require('path')

const { styles } = require('@ckeditor/ckeditor5-dev-utils')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const shared = require('./dev/webpack.shared')

const version = cp.execSync('git rev-parse --short HEAD').toString().trim()

module.exports = (env, argv) => {
  const plugins = [
    ...shared.plugins,
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      GIT_VERSION: JSON.stringify(version),
      IS_DEVELOPMENT: argv.mode === 'development',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/app/assets/favicon.svg',
          to: '',
        },
      ],
    }),
  ]

  return {
    entry: './src',
    devtool: 'source-map',
    plugins: plugins,
    module: {
      rules: [
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
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader'],
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
      ],
    },
    resolve: shared.resolve,
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      globalObject: 'this',
    },
    devServer: {
      historyApiFallback: true,
      host: '0.0.0.0',
      stats: 'errors-only',
      overlay: true,
    },
  }
}
