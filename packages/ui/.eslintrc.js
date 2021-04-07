const baseConfig = require('../../.eslintrc.json')

const config = {
  ...baseConfig,
}

config.rules['import/no-restricted-paths'] = [
  'error',
  {
    zones: [
      { target: './src/common', from: './src/app' },
      { target: './src/accounts', from: './src/app' },
      { target: './src/common', from: './src/accounts' },
      { target: './src/membership', from: './src/app' },
      { target: './src/common', from: './src/membership' },
    ],
  },
]

module.exports = config
