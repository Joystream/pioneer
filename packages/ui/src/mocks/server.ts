import { createGraphQLHandler } from '@miragejs/graphql'
import { createServer } from 'miragejs'

import schema from '../common/api/schemas/schema.graphql'

import { seedBlocks, seedMembers } from './data'
import { seedWorkingGroups } from './data/mockWorkingGroups'
import { getMemberResolver, getMembersResolver, getWorkingGroupsResolver, searchMembersResolver } from './resolvers'

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
              workingGroups: getWorkingGroupsResolver,
            },
          },
        })
      )
    },

    // TODO - better server type
    seeds(server: any) {
      seedBlocks(server)
      seedMembers(server)
      seedWorkingGroups(server)
    },
  })
}
