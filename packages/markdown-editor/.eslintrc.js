const baseConfig = require('../../.eslintrc.json')

const config = {
  ...baseConfig,
}

const domains = ['accounts', 'memberships', 'working-groups']

function* generateZones(domains) {
  yield { target: './src/common', from: './src/app' }

  for (const domain of domains) {
    const domainSrc = `./src/${domain}`

    yield { target: domainSrc, from: './src/app' }
    yield { target: './src/common', from: domainSrc }
  }
}

const zones = [...generateZones(domains)]

config.rules['import/no-restricted-paths'] = [
  'error',
  {
    zones: zones,
  },
]

module.exports = config
