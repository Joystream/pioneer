/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const webpack = require('webpack')

const resolve = {
  extensions: ['.tsx', '.ts', '.js'],
  fallback: {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    path: false,
    fs: false,
  },
  alias: {
    '@': path.resolve(__dirname, '../src'),
    'react/jsx-runtime': require.resolve('react/jsx-runtime'),
  },
}

const plugins = [
  new webpack.ProvidePlugin({
    Buffer: ['buffer', 'Buffer'],
    process: 'process/browser.js',
  }),
]

const rules = []

module.exports = {
  resolve,
  plugins,
  rules,
}
