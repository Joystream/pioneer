const webpack = require('webpack')

const { styles } = require('@ckeditor/ckeditor5-dev-utils')

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

    config.resolve = {
      extensions: ['.tsx', '.ts', '.js'],
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        path: false,
      },
    }
    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser.js',
      })
    )
    config.module.rules.unshift(
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ['raw-loader'],
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
              attributes: {
                'data-cke': true,
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
              },
              minify: true,
            }),
          },
        ],
      }
    )
    return config
  },
  core: {
    builder: 'webpack5',
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
