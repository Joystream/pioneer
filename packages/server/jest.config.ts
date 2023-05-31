import type { Config } from 'jest'

const config: Config = {
  setupFiles: ['./test/setup.ts'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
  },
}

export default config
