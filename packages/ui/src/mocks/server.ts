import { createGraphQLHandler } from '@miragejs/graphql'
import { createServer, Server } from 'miragejs'
import { AnyRegistry } from 'miragejs/-types'

import schema from '../common/api/schemas/schema.graphql'

import { seedBlocks, seedMembers } from './data'
import { seedOpenings, seedOpeningStatuses } from './data/mockOpenings'
import { seedWorkingGroups } from './data/mockWorkingGroups'
import {
  getMemberResolver,
  getMembersResolver,
  getWorkingGroupOpeningsResolver,
  getWorkersResolver,
  getWorkingGroupsResolver,
  searchMembersResolver,
  getWorkingGroupResolver,
} from './resolvers'

// Fix for "model has multiple possible inverse associations" error.
// See: https://github.com/miragejs/ember-cli-mirage/issues/996#issuecomment-315011890
export const fixAssociations = (server: Server<AnyRegistry>) => {
  const schema = server.schema as any // Schema.modelFor is a hidden API.

  const workingGroupModel = schema.modelFor('workingGroup')
  workingGroupModel.class.prototype.associations.workers.opts.inverse = 'group'
  workingGroupModel.class.prototype.associations.leader.opts.inverse = 'leader'

  const workerModel = schema.modelFor('worker')
  workerModel.class.prototype.associations.leaderGroups.opts.inverse = 'leaderGroups'
}

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
              workingGroup: getWorkingGroupResolver,
              workingGroupOpenings: getWorkingGroupOpeningsResolver,
              workers: getWorkersResolver,
            },
          },
        })
      )
    },

    seeds(server: Server<AnyRegistry>) {
      fixAssociations(server)

      seedBlocks(server)
      seedMembers(server)
      seedWorkingGroups(server)
      seedOpeningStatuses(server)
      seedOpenings(server)
    },
  })
}
