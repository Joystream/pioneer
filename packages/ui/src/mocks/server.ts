import { createGraphQLHandler, mirageGraphQLFieldResolver } from '@miragejs/graphql'
import { createServer } from 'miragejs'

import schema from '../api/schemas/schema.graphql'
import { mockMembers } from './data'

export const makeServer = (environment = 'development') => {
  return createServer({
    environment,

    routes() {
      this.post(
        '/query-node',
        createGraphQLHandler(schema, this.schema, {
          context: undefined,
          root: undefined,
          resolvers: {
            Query: {
              member: (obj: any, args: any, context: any, info: any) => {
                const resolverArgs = {
                  id: args.where.id,
                }
                return mirageGraphQLFieldResolver(obj, resolverArgs, context, info)
              },
            },
          },
        })
      )
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
}
