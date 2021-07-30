import { capitalizeFirstLetter } from '@/common/helpers'
import { seedRandomBlockFields } from '@/mocks/data/seedRandomBlockFields'

import { ProposalMock } from '../../../dev/scripts/generators/generateProposals'

import rawProposals from './raw/proposals.json'
import { seedProposalDetails } from './seedProposalDetails'

export const mockProposals: ProposalMock[] = rawProposals.map((rawProposal) => rawProposal)

export const seedProposal = (proposal: ProposalMock, server: any) => {
  const member = server.schema.find('Membership', proposal.creatorId)
  return server.schema.create('Proposal', {
    ...proposal,
    stakingAccount: member.stakingAccount,
    status: seedProposalStatus(proposal.status, server),
    details: seedProposalDetails(proposal.details, server),
    votes: seedVotes(proposal.votes, server),
    createdInEvent: seedCreatedInEvent(server),
    proposalStatusUpdates: seedStatusUpdates(proposal.proposalStatusUpdates, server),
    discussionThread: seedDiscussionThread(proposal.discussionThread, server),
  })
}

const seedProposalStatus = (status: string, server: any) => {
  return server.schema.create('ProposalStatus' + capitalizeFirstLetter(status))
}

const seedStatusUpdates = (updates: ProposalMock['proposalStatusUpdates'], server: any) =>
  updates.map((update) => {
    const newStatus = server.schema.create('ProposalStatus' + capitalizeFirstLetter(update.newStatus))
    return server.schema.create('ProposalStatusUpdatedEvent', { ...seedRandomBlockFields(), newStatus })
  })

const seedCreatedInEvent = (server: any) => server.schema.create('ProposalCreatedEvent', seedRandomBlockFields())

const seedVotes = (votes: ProposalMock['votes'], server: any) =>
  votes.map((vote) => server.schema.create('ProposalVotedEvent', vote))

type ThreadMock = ProposalMock['discussionThread']
const seedDiscussionThread = (thread: ThreadMock, server: any) =>
  server.schema.create('ProposalDiscussionThread', {
    discussionPosts: seedDiscussionPosts(thread.discussionPosts, server),
    mode: server.schema.create(thread.mode),
  })

const seedDiscussionPosts = (posts: ThreadMock['discussionPosts'], server: any) =>
  posts.map((post) =>
    server.schema.create('ProposalDiscussionPost', {
      ...post,
      createdInEvent: server.schema.create('ProposalDiscussionPostCreatedEvent', seedRandomBlockFields()),
    })
  )

export const seedProposals = (server: any) => {
  mockProposals.map((proposal) => seedProposal(proposal, server))
}
