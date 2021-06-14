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
  })
}

const seedProposalStatus = (status: string, server: any) => {
  return server.schema.create('ProposalStatus' + capitalizeFirstLetter(status))
}

const seedProposalDetails = (details: string, server: any) => {
  return server.schema.create(capitalizeFirstLetter(details) + 'ProposalDetails')
}

export const seedProposals = (server: any) => {
  mockProposals.map((proposal) => seedProposal(proposal, server))
}
