/* eslint-disable @typescript-eslint/no-var-requires */
const cp = require('child_process')
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const dotenv = require('dotenv')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const shared = require('./dev/webpack.shared')

const version = cp.execSync('git rev-parse --short HEAD').toString().trim()

dotenv.config()

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development'
  const envVariables = Object.entries(process.env)
    .filter(([key]) => key.startsWith('REACT_APP_'))
    .map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])

  const imageBlacklist = [...(env.blacklist ?? []), ...(process.env.REACT_APP_BLACKLISTED_IMAGES?.split(/\s+/) ?? [])]

  const plugins = [
    ...shared.plugins,
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      GIT_VERSION: JSON.stringify(version),
      IS_DEVELOPMENT: isDevelopment,
      ...Object.fromEntries(envVariables),
      'process.env.REACT_APP_BLACKLISTED_IMAGES': `'${imageBlacklist.join(' ')}'`,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/app/assets/favicon.svg',
          to: '',
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: { configFile: 'src/tsconfig.json' },
    }),
  ]

  return {
    mode: argv.mode,
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
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
          exclude: [/node_modules/],
        },
        {
          test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf|svg|webp)$/,
          use: ['file-loader'],
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
        {
          test: /\.md$/,
          use: 'raw-loader',
        },
      ],
    },
    resolve: shared.resolve,
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
      globalObject: 'this',
      pathinfo: false,
    },
    optimization: {
      runtimeChunk: true,
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    stats: 'minimal',
    devServer: {
      historyApiFallback: true,
      host: '0.0.0.0',
      client: {
        logging: 'error',
        progress: true,
        overlay: true,
      },
    },
  }
}
