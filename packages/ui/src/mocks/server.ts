import { createServer } from 'miragejs'
import { createGraphQLHandler } from '@miragejs/graphql'

import schema from '../api/schemas/schema.graphql'
import { mockMembers } from './data'

createServer({
  routes() {
    this.post('/query-node', createGraphQLHandler(schema, this.schema))
  },

  // TODO - better server type
  seeds(server: any) {
    mockMembers.map((member) => {
      return server.schema.create('Member', {
        ...member,
      })
    })
  },
})
