// babel.config.js
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript', '@babel/preset-react'],
  plugins: [['babel-plugin-import-graphql', { runtime: true }]],
}
