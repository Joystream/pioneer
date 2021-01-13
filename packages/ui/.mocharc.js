process.env.NODE_ENV = 'test'
module.exports = {
  extension: ['ts'],
  spec: './test/**/*.test.{ts,tsx}',
  require: 'ts-node/register',
  file: './test/setup.ts',
  timeout: 12000
}
