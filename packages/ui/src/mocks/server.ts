import { createGraphQLHandler } from '@miragejs/graphql'
import { createServer } from 'miragejs'
import schema from '../api/schemas/schema.graphql'
import { seedBlocks, seedMembers } from './data'
import { getMemberResolver, getMembersResolver, searchMembersResolver } from './resolvers'

export const makeServer = (environment = 'development') => {
  return createServer({
    environment,

    routes() {
      this.post(
        'http://localhost:8081/graphql',
        createGraphQLHandler(schema, this.schema, {
          context: undefined,
          root: undefined,
          resolvers: {
            Query: {
              membership: getMemberResolver,
              memberships: getMembersResolver,
              searchMemberships: searchMembersResolver,
            },
          },
        })
      )
    },

    // TODO - better server type
    seeds(server: any) {
      seedBlocks(server)
      seedMembers(server)
    },
  })
}
