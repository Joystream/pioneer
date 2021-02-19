import { createServer } from 'miragejs'
import { createGraphQLHandler } from '@miragejs/graphql'

import schema from '../api/schemas/query-node.graphql'

createServer({
  routes() {
    this.post('/query-node', createGraphQLHandler(schema, this.schema))
  },
})
