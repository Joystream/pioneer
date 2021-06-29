import { capitalizeFirstLetter } from '@/common/helpers'
import { VoteFieldsFragment } from '@/proposals/queries'

import { ProposalMock } from '../../../dev/scripts/generators/generateProposals'

import rawProposals from './raw/proposals.json'

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
  })
}

const seedProposalStatus = (status: string, server: any) => {
  return server.schema.create('ProposalStatus' + capitalizeFirstLetter(status))
}

const seedProposalDetails = (details: string, server: any) => {
  return server.schema.create(capitalizeFirstLetter(details) + 'ProposalDetails')
}

const seedVotes = (votes: Vote[], server: any) => votes.map((vote) => server.schema.create('ProposalVotedEvent', vote))

export const seedProposals = (server: any) => {
  mockProposals.map((proposal) => seedProposal(proposal, server))
}
