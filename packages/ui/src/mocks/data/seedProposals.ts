import { capitalizeFirstLetter } from '@/common/helpers'
import { VoteFieldsFragment } from '@/proposals/queries'

import { ProposalMock } from '../../../dev/scripts/generators/generateProposals'

import rawProposals from './raw/proposals.json'
import { seedProposalDetails } from './seedProposalDetails'

type Vote = Omit<VoteFieldsFragment, '__typename'>

export const mockProposals: ProposalMock[] = rawProposals.map((rawProposal) => rawProposal)

export const seedProposal = (proposal: ProposalMock, server: any) => {
  const member = server.schema.find('Membership', proposal.creatorId)
  return server.schema.create('Proposal', {
    ...proposal,
    stakingAccount: member.stakingAccount,
    status: seedProposalStatus(proposal.status, server),
    details: seedProposalDetails(proposal.details, server),
    votes: seedVotes(proposal.votes as Vote[], server),
    createdInEvent: seedCreatedInEvent(proposal.createdInEvent, server),
    proposalStatusUpdates: seedStatusUpdates(proposal.proposalStatusUpdates, server),
  })
}

const seedProposalStatus = (status: string, server: any) => {
  return server.schema.create('ProposalStatus' + capitalizeFirstLetter(status))
}

const seedStatusUpdates = (updates: ProposalMock['proposalStatusUpdates'], server: any) =>
  updates.map((update) => {
    const newStatus = server.schema.create('ProposalStatus' + capitalizeFirstLetter(update.newStatus))
    return server.schema.create('ProposalStatusUpdatedEvent', { inBlock: update.inBlock, newStatus })
  })

const seedCreatedInEvent = (event: { inBlock: number }, server: any) =>
  server.schema.create('ProposalCreatedEvent', event)

const seedVotes = (votes: Vote[], server: any) => votes.map((vote) => server.schema.create('ProposalVotedEvent', vote))

export const seedProposals = (server: any) => {
  mockProposals.map((proposal) => seedProposal(proposal, server))
}
