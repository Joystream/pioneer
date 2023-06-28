/* eslint-disable @typescript-eslint/no-var-requires */
const { getJestConfig } = require('@storybook/test-runner')

module.exports = {
  // The default configuration comes from @storybook/test-runner
  ...getJestConfig(),

  /** Add your own overrides below
   * @see https://jestjs.io/docs/configuration
   */
  roots: undefined,
  testMatch: ['<rootDir>/src/app/**/*.stories.tsx'],
}
