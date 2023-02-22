import { CodegenConfig } from '@graphql-codegen/cli'

import { QUERY_NODE_ENDPOINT } from './src/common/config'

const config: CodegenConfig = {
  schema: QUERY_NODE_ENDPOINT,

  documents: ['src/*/queries/*.graphql'],

  generates: {
    './src/common/queries/__generated__/': {
      preset: 'client',
      plugins: [],
    },
  },

  ignoreNoDocuments: true,
}

export default config
