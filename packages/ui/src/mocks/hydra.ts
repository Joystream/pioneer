import { createServer } from 'miragejs'
import { createGraphQLHandler } from '@miragejs/graphql'

import schema from './hydra.graphql'

createServer({
  routes() {
    this.post('/query-node', createGraphQLHandler(schema, this.schema))
  },
})
