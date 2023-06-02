const baseConfig = require('../../.eslintrc.json')

const config = {
  ...baseConfig,
  extends: ['plugin:storybook/recommended'],
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

config.overrides = [
  ...config.overrides,
  {
    files: ['**/*.stories.tsx'],
    rules: { 'react-hooks/rules-of-hooks': 'off' },
  },
]

config.ignorePatterns = [...config.ignorePatterns, 'src/bounty/**/*', 'test/bounty/**/*']

module.exports = config
