const path = require('path')

const webpack = require('webpack')

const resolve = {
  extensions: ['.tsx', '.ts', '.js'],
  fallback: {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
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

module.exports = {
  resolve,
  plugins,
}
