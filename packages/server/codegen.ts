import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/common/queries/schema.graphql',

  documents: ['src/*/queries/**/*.graphql'],

  generates: {
    './src/common/queries/__generated__/': {
      preset: 'client',
      plugins: [],
    },
  },

  ignoreNoDocuments: true,
}

export default config
