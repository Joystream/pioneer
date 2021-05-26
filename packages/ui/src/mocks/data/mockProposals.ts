import { asMember } from '@/memberships/types'
import { proposalStages } from '@/proposals/constants'
import { PastProposal, Proposal } from '@/proposals/types'

import { mockMembers } from './mockMembers'

export const mockProposals = Array<Omit<Proposal, 'id' | 'stage'>>(4)
  .fill({
    createdAt: '2021-03-29 18:21:06.000000',
    title: 'Lorem ipsum, dolor sit amet consectetur',
    rationale: 'Voluptatem id voluptatibus aspernatur quibusdam hic porro. Labore, eligendi tempore?',
    type: 'Founding request',
    proposer: asMember({ ...mockMembers[0], roles: [{ group: { name: 'Content' }, isLead: true }] } as any),
  })
  .map(
    (proposal, index): Proposal => ({
      ...proposal,
      id: String(index),
      stage: proposalStages[index],
    })
  )

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const mockPastProposals: PastProposal[] = mockProposals.map(({ createdAt, ...proposal }) => ({
  ...proposal,
  endedAt: '2021-02-28 18:21:06.000000',
}))
