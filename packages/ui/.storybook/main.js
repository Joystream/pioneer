const path = require('path')

const { merge } = require('lodash')

const shared = require('./../dev/webpack.shared')

module.exports = {
  webpackFinal: (config) => {
    config.module.rules.forEach((rule) => {
      if (isCssRule(rule)) {
        rule.exclude = /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/
      }
    })

    config.module.rules.forEach((rule) => {
      if (isSvgRule(rule)) {
        rule.exclude = /ckeditor5-[^/]+\/theme\/icons\/[^/]+\.svg$/
      }
    })

    config.resolve = merge(
      {
        alias: {
          '@/common/utils/crypto/worker$': path.resolve(__dirname, '../src/common/utils/crypto'),
          '@apollo/client$': path.resolve(__dirname, '../src/mocks/providers/query-node'),
        },
      },
      shared.resolve
    )
    config.plugins.push(...shared.plugins)
    config.module.rules.unshift(...shared.rules)

    return config
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  typescript: {
    reactDocgen: 'none',
  },
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-links'],
}

function isCssRule(rule) {
  return rule.test?.toString().includes('css')
}

function isSvgRule(rule) {
  return rule.test?.toString().includes('svg')
}
