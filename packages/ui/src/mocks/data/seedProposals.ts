import { capitalizeFirstLetter } from '@/common/helpers'

import { ProposalMock } from '../../../dev/scripts/generators/generateProposals'

import rawProposals from './raw/proposals.json'

export const mockProposals: ProposalMock[] = rawProposals.map((rawProposal) => rawProposal)

export const seedProposal = (proposal: ProposalMock, server: any) => {
  const member = server.schema.find('Membership', proposal.creatorId)
  return server.schema.create('Proposal', {
    ...proposal,
    stakingAccount: member.stakingAccount,
    status: seedProposalStatus(proposal.status, server),
    details: seedProposalDetails(proposal.details, server),
    votes: seedVotes(proposal.votes, server),
    createdInEvent: seedCreatedInEvent(proposal.createdInEvent, server),
    proposalStatusUpdates: seedStatusUpdates(proposal.proposalStatusUpdates, server),
    discussionThread: seedDiscussionThread(proposal.discussionThread, server),
  })
}

const seedProposalStatus = (status: string, server: any) => {
  return server.schema.create('ProposalStatus' + capitalizeFirstLetter(status))
}

const seedProposalDetails = (details: string, server: any) => {
  return server.schema.create(capitalizeFirstLetter(details) + 'ProposalDetails')
}

const seedStatusUpdates = (updates: ProposalMock['proposalStatusUpdates'], server: any) =>
  updates.map((update) => {
    const newStatus = server.schema.create('ProposalStatus' + capitalizeFirstLetter(update.newStatus))
    return server.schema.create('ProposalStatusUpdatedEvent', { inBlock: update.inBlock, newStatus })
  })

const seedCreatedInEvent = (event: { inBlock: number }, server: any) =>
  server.schema.create('ProposalCreatedEvent', event)

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
      createdInEvent: server.schema.create('ProposalDiscussionPostCreatedEvent', post.createdInEvent),
    })
  )

export const seedProposals = (server: any) => {
  mockProposals.map((proposal) => seedProposal(proposal, server))
}
