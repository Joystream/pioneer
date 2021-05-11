import { createGraphQLHandler } from '@miragejs/graphql'
import { createServer, Server } from 'miragejs'
import { AnyRegistry } from 'miragejs/-types'

import schema from '../common/api/schemas/schema.graphql'

import { seedBlocks, seedMembers } from './data'
import { seedApplications } from './data/mockApplications'
import { seedOpenings, seedOpeningStatuses } from './data/mockOpenings'
import { seedWorkingGroups } from './data/mockWorkingGroups'
import { getConnectionResolver, getUniqueResolver, getWhereResolver, searchMembersResolver } from './resolvers'

// Fix for "model has multiple possible inverse associations" error.
// See: https://github.com/miragejs/ember-cli-mirage/issues/996#issuecomment-315011890
export const fixAssociations = (server: Server<AnyRegistry>) => {
  const schema = server.schema as any // Schema.modelFor is a hidden API.

  const workingGroupModel = schema.modelFor('workingGroup')
  // "Mirage: The working-group model has multiple possible inverse associations for the worker.group association."
  workingGroupModel.class.prototype.associations.workers.opts.inverse = 'group'
  workingGroupModel.class.prototype.associations.leader.opts.inverse = 'workinggroupleader'

  // "Mirage: The working-group model has multiple possible inverse associations for the working-group-metadata.workinggroupmetadata association."
  workingGroupModel.class.prototype.associations.metadata.opts.inverse = 'metadata'

  const workingGroupMetadataModel = schema.modelFor('workingGroupMetadata')
  // "Mirage: The working-group-metadata model has multiple possible inverse associations for the working-group.metadata association."
  workingGroupMetadataModel.class.prototype.associations.group.opts.inverse = 'group'

  const membershipModel = schema.modelFor('membership')
  // "Mirage: The membership model has multiple possible inverse associations for the membership.invitedBy association."
  membershipModel.class.prototype.associations.invitedBy.opts.inverse = 'invitees'
  membershipModel.class.prototype.associations.invitees.opts.inverse = 'invitedBy'
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
              membershipByUniqueInput: getUniqueResolver('Membership'),
              memberships: getWhereResolver('Membership'),
              searchMemberships: searchMembersResolver,
              membershipsConnection: getConnectionResolver('MembershipConnection'),
              workingGroups: getWhereResolver('WorkingGroup'),
              workingGroupByUniqueInput: getUniqueResolver('WorkingGroup'),
              workingGroupOpenings: getWhereResolver('WorkingGroupOpening'),
              workingGroupOpeningByUniqueInput: getUniqueResolver('WorkingGroupOpening'),
              workers: getWhereResolver('Worker'),
              workingGroupApplications: getWhereResolver('WorkingGroupApplication'),
              applicationFormQuestionAnswers: getWhereResolver('ApplicationFormQuestionAnswer'),
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
      seedApplications(server)
    },
  })
}
