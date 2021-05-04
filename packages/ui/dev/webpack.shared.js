const path = require('path')

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

module.exports = {
  resolve,
}
