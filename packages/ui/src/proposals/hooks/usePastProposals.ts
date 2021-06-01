import { error } from '@/common/logger'
import { Member } from '@/memberships/types'
import { mockMembers } from '@/mocks/data'
import { mockPastProposals, proposalStages, proposalTypes } from '@/mocks/data/mockProposals'
import { useMockDelay } from '@/mocks/hooks/useMockDelay'
import { ProposalFiltersState } from '@/proposals/components/ProposalFilters'

interface UsePastProposalsProps {
  filters: ProposalFiltersState
}

export const usePastProposals = ({ filters }: UsePastProposalsProps) => {
  const { loading, data, error: err } = useMockDelay({ proposals: mockPastProposals, filters })

  if (err) {
    error(err)
  }

  const stages = data ? proposalStages : []
  const types = data ? proposalTypes : []
  const proposers = data ? ((mockMembers.slice(0, 10) as unknown) as Member[]) : []

  return {
    isLoading: loading,
    proposals: data?.proposals ?? [],
    types,
    stages,
    proposers,
  }
}
