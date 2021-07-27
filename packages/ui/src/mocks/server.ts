import { createGraphQLHandler } from '@miragejs/graphql'
import { createServer, Server } from 'miragejs'
import { AnyRegistry } from 'miragejs/-types'

import { seedForumCategories } from '@/mocks/data/seedForum'

import schema from '../common/api/schemas/schema.graphql'

import {
  seedApplications,
  seedMembers,
  seedOpeningStatuses,
  seedOpenings,
  seedUpcomingOpenings,
  seedWorkers,
  seedWorkingGroups,
  seedProposals,
  seedEvents,
  updateWorkingGroups,
} from './data'
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

  const proposalPostModel = schema.modelFor('proposalDiscussionPost')
  // "Mirage: The proposal-discussion-post model has multiple possible inverse associations for the proposal-discussion-post.repliesTo association."
  proposalPostModel.class.prototype.associations.repliesTo.opts.inverse = null
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
              applicationFormQuestionAnswers: getWhereResolver('ApplicationFormQuestionAnswer'),
              applicationWithdrawnEvents: getWhereResolver('ApplicationWithdrawnEvent'),
              appliedOnOpeningEvents: getWhereResolver('AppliedOnOpeningEvent'),
              budgetSetEvents: getWhereResolver('BudgetSetEvent'),
              budgetSpendingEvents: getWhereResolver('BudgetSpendingEvent'),
              forumCategories: getWhereResolver('ForumCategory'),
              membershipByUniqueInput: getUniqueResolver('Membership'),
              memberships: getWhereResolver('Membership'),
              membershipsConnection: getConnectionResolver('MembershipConnection'),
              openingAddedEvents: getWhereResolver('OpeningAddedEvent'),
              openingCanceledEvents: getWhereResolver('OpeningCanceledEvent'),
              openingFilledEvents: getWhereResolver('OpeningFilledEvent'),
              proposalByUniqueInput: getUniqueResolver('Proposal'),
              proposalVotedEventByUniqueInput: getUniqueResolver('ProposalVotedEvent'),
              proposals: getWhereResolver('Proposal'),
              rewardPaidEvents: getWhereResolver('RewardPaidEvent'),
              runtimeWasmBytecodeByUniqueInput: getUniqueResolver('RuntimeWasmBytecode'),
              searchMemberships: searchMembersResolver,
              stakeDecreasedEvents: getWhereResolver('StakeDecreasedEvent'),
              stakeIncreasedEvents: getWhereResolver('StakeIncreasedEvent'),
              stakeSlashedEvents: getWhereResolver('StakeSlashedEvent'),
              statusTextChangedEvents: getWhereResolver('StatusTextChangedEvent'),
              terminatedLeaderEvents: getWhereResolver('TerminatedLeaderEvent'),
              terminatedWorkerEvents: getWhereResolver('TerminatedWorkerEvent'),
              upcomingWorkingGroupOpeningByUniqueInput: getUniqueResolver('UpcomingWorkingGroupOpening'),
              upcomingWorkingGroupOpenings: getWhereResolver('UpcomingWorkingGroupOpening'),
              workerByUniqueInput: getUniqueResolver('Worker'),
              workerExitedEvents: getWhereResolver('WorkerExitedEvent'),
              workerRewardAccountUpdatedEvents: getWhereResolver('WorkerRewardAccountUpdatedEvent'),
              workerRewardAmountUpdatedEvents: getWhereResolver('WorkerRewardAmountUpdatedEvent'),
              workerStartedLeavingEvents: getWhereResolver('WorkerStartedLeavingEvent'),
              workers: getWhereResolver('Worker'),
              workersConnection: getConnectionResolver('WorkerConnection'),
              workingGroupApplications: getWhereResolver('WorkingGroupApplication'),
              workingGroupByUniqueInput: getUniqueResolver('WorkingGroup'),
              workingGroupOpeningByUniqueInput: getUniqueResolver('WorkingGroupOpening'),
              workingGroupOpenings: getWhereResolver('WorkingGroupOpening'),
              workingGroupOpeningsConnection: getConnectionResolver('WorkingGroupOpeningConnection'),
              workingGroups: getWhereResolver('WorkingGroup'),
            },
          },
        })
      )
    },

    seeds(server: Server<AnyRegistry>) {
      fixAssociations(server)

      seedMembers(server)
      seedWorkingGroups(server)
      seedOpeningStatuses(server)
      seedOpenings(server)
      seedUpcomingOpenings(server)
      seedApplications(server)
      seedWorkers(server)
      updateWorkingGroups(server)
      seedProposals(server)
      seedEvents(server)
      seedForumCategories(server)
    },
  })
}
