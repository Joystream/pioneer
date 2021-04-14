import { createGraphQLHandler } from '@miragejs/graphql'
import { createServer, Server } from 'miragejs'
import { AnyRegistry } from 'miragejs/-types'

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

    seeds(server: Server<AnyRegistry>) {
      // Fix for "model has multiple possible inverse associations" error.
      // See: https://github.com/miragejs/ember-cli-mirage/issues/996#issuecomment-315011890
      const schema = server.schema as any // Schema.modelFor is a hidden API.
      const groupModel = schema.modelFor('workingGroup')
      groupModel.class.prototype.associations.workers.opts.inverse = null
      groupModel.class.prototype.associations.leader.opts.inverse = null
      seedBlocks(server)
      seedMembers(server)
      seedWorkingGroups(server)
    },
  })
}
