/* eslint-disable @typescript-eslint/no-var-requires */
const cp = require('child_process')
const path = require('path')

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
        ...shared.rules,
        {
          test: /\.js$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: { plugins: [['babel-plugin-styled-components', { displayName: true }]] },
            },
          ],
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
