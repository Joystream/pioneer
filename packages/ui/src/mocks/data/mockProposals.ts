import { asMember } from '@/memberships/types'
import { Proposal, ProposalStage } from '@/proposals/types'

import { mockMembers } from './mockMembers'

const stages: ProposalStage[] = ['DECIDING', 'DORMANT', 'GRACING', 'SUCCEEDED']
export const mockProposals = Array<Omit<Proposal, 'id' | 'stage'>>(4)
  .fill({
    createdAt: '2021-03-29 18:21:06.000000',
    title: 'Lorem ipsum, dolor sit amet consectetur',
    rationale: 'Voluptatem id voluptatibus aspernatur quibusdam hic porro. Labore, eligendi tempore?',
    type: 'Founding request',
    proposer: asMember((mockMembers[0] as unknown) as any),
  })
  .map(
    (proposal, index): Proposal => ({
      ...proposal,
      id: String(index),
      stage: stages[index],
    })
  )
