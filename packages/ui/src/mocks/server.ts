import { createGraphQLHandler } from '@miragejs/graphql'
import { createServer, Server } from 'miragejs'
import { AnyRegistry } from 'miragejs/-types'

import { seedForumCategories, seedForumPosts, seedForumThreads } from '@/mocks/data/seedForum'

import schema from '../common/api/schemas/schema.graphql'

import {
  seedApplications,
  seedCouncilMembers,
  seedElectedCouncils,
  seedMembers,
  seedOpeningStatuses,
  seedOpenings,
  seedUpcomingOpenings,
  seedWorkers,
  seedWorkingGroups,
  seedProposals,
  seedEvents,
  updateWorkingGroups,
  seedCouncilCandidates,
  seedCouncilElections,
  seedProposalsEvents,
  seedCouncilVotes,
} from './data'
import {
  getConnectionResolver,
  getInterfaceResolver,
  getUniqueResolver,
  getWhereResolver,
  searchMembersResolver,
} from './resolvers'

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
  // Here should be empty lane
  // "Mirage: The working-group-metadata model has multiple possible inverse associations for the working-group.metadata association."
  workingGroupMetadataModel.class.prototype.associations.group.opts.inverse = 'group'

  const membershipModel = schema.modelFor('membership')
  // "Mirage: The membership model has multiple possible inverse associations for the membership.invitedBy association."
  membershipModel.class.prototype.associations.invitedBy.opts.inverse = 'invitees'
  membershipModel.class.prototype.associations.invitees.opts.inverse = 'invitedBy'

  const proposalPostModel = schema.modelFor('proposalDiscussionPost')
  // "Mirage: The proposal-discussion-post model has multiple possible inverse associations for the proposal-discussion-post.repliesTo association."
  proposalPostModel.class.prototype.associations.repliesTo.opts.inverse = null

  const forumPostModel = schema.modelFor('forumPost')
  // "Mirage: The forum-post model has multiple possible inverse associations for the forum-post.repliesTo association."
  forumPostModel.class.prototype.associations.repliesTo.opts.inverse = null

  const forumCategoryModel = schema.modelFor('forumCategory')
  // "Mirage: The forum-category model has multiple possible inverse associations for the forum-category.parent association."
  forumCategoryModel.class.prototype.associations.parent.opts.inverse = 'forumcategoryparent'
  forumCategoryModel.class.prototype.associations.forumcategoryparent.opts.inverse = 'parent'

  const forumThreadModel = schema.modelFor('forumThread')
  // Mirage: The forum-thread model has multiple possible associations for the forum-post.thread association.
  forumThreadModel.class.prototype.associations.posts.opts.inverse = null

  const electedCouncilModel = schema.modelFor('electedCouncil')
  // Mirage: The elected-council model has multiple possible inverse associations for the election-round.electedCouncil association.
  electedCouncilModel.class.prototype.associations.councilElections.opts.inverse = null
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
              candidates: getWhereResolver('Candidate'),
              candidatesConnection: getConnectionResolver('CandidateConnection'),
              candidateByUniqueInput: getUniqueResolver('Candidate'),
              castVotes: getWhereResolver('CastVote'),
              councilMembersConnection: getConnectionResolver('CouncilMemberConnection'),
              councilorRewardUpdatedEvents: getWhereResolver('CouncilorRewardUpdatedEvent'),
              electedCouncils: getWhereResolver('ElectedCouncil'),
              electionRounds: getWhereResolver('ElectionRound'),
              electionRoundsConnection: getConnectionResolver('ElectionRoundConnection'),
              electionRoundByUniqueInput: getUniqueResolver('ElectionRound'),
              forumCategories: getWhereResolver('ForumCategory'),
              forumCategoryByUniqueInput: getUniqueResolver('ForumCategory'),
              forumThreads: getWhereResolver('ForumThread'),
              forumThreadsConnection: getConnectionResolver('ForumThreadConnection'),
              forumPosts: getWhereResolver('ForumPost'),
              forumPostsConnection: getConnectionResolver('ForumPostConnection'),
              forumPostByUniqueInput: getUniqueResolver('ForumPost'),
              forumThreadByUniqueInput: getUniqueResolver('ForumThread'),
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
              stakeSlashedEventsConnection: getConnectionResolver('StakeSlashedEventConnection'),
              statusTextChangedEvents: getWhereResolver('StatusTextChangedEvent'),
              terminatedLeaderEvents: getWhereResolver('TerminatedLeaderEvent'),
              terminatedLeaderEventsConnection: getConnectionResolver('TerminatedLeaderEventConnection'),
              terminatedWorkerEvents: getWhereResolver('TerminatedWorkerEvent'),
              terminatedWorkerEventsConnection: getConnectionResolver('TerminatedWorkerEventConnection'),
              upcomingWorkingGroupOpeningByUniqueInput: getUniqueResolver('UpcomingWorkingGroupOpening'),
              upcomingWorkingGroupOpenings: getWhereResolver('UpcomingWorkingGroupOpening'),
              workerByUniqueInput: getUniqueResolver('Worker'),
              workerExitedEvents: getWhereResolver('WorkerExitedEvent'),
              workerRewardAccountUpdatedEvents: getWhereResolver('WorkerRewardAccountUpdatedEvent'),
              workerRewardAmountUpdatedEvents: getWhereResolver('WorkerRewardAmountUpdatedEvent'),
              candidacyWithdrawEvents: getWhereResolver('CandidacyWithdrawEvent'),
              candidacyWithdrawEventsConnection: getConnectionResolver('CandidacyWithdrawEventConnection'),
              workerStartedLeavingEvents: getWhereResolver('WorkerStartedLeavingEvent'),
              workerStartedLeavingEventsConnection: getConnectionResolver('WorkerStartedLeavingEventConnection'),
              workers: getWhereResolver('Worker'),
              workersConnection: getConnectionResolver('WorkerConnection'),
              workingGroupApplications: getWhereResolver('WorkingGroupApplication'),
              workingGroupApplicationsConnection: getConnectionResolver('WorkingGroupApplicationConnection'),
              workingGroupApplicationByUniqueInput: getUniqueResolver('WorkingGroupApplication'),
              workingGroupByUniqueInput: getUniqueResolver('WorkingGroup'),
              workingGroupOpeningByUniqueInput: getUniqueResolver('WorkingGroupOpening'),
              workingGroupOpenings: getWhereResolver('WorkingGroupOpening'),
              workingGroupOpeningsConnection: getConnectionResolver('WorkingGroupOpeningConnection'),
              workingGroups: getWhereResolver('WorkingGroup'),
              postTextUpdatedEvents: getWhereResolver('PostTextUpdatedEvent'),
              postAddedEvents: getWhereResolver('PostAddedEvent'),
              events: getInterfaceResolver(),
            },
          },
        })
      )
    },

    ...(environment !== 'development'
      ? {}
      : {
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
            seedForumThreads(server)
            seedForumPosts(server)
            seedProposalsEvents(server)
            seedElectedCouncils(server)
            seedCouncilMembers(server)
            seedCouncilElections(server)
            seedCouncilCandidates(server)
            seedCouncilVotes(server)
          },
        }),
  })
}
