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

    config.resolve = shared.resolve
    config.plugins.push(...shared.plugins)
    config.module.rules.unshift(...shared.rules)

    return config
  },
  core: {
    builder: 'webpack5',
  },
  typescript: {
    reactDocgen: 'none',
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-actions'],
}

function isCssRule(rule) {
  return rule.test.toString().indexOf('css') > -1
}

function isSvgRule(rule) {
  return rule.test.toString().indexOf('svg') > -1
}
