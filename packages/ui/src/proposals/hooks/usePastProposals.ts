import { ProposalFiltersState } from '@/proposals/components/ProposalFilters'
import { proposalDetails } from '@/proposals/model/proposalDetails'
import { proposalStatuses } from '@/proposals/model/proposalStatus'

interface UsePastProposalsProps {
  filters: ProposalFiltersState
}

export const usePastProposals = ({ filters }: UsePastProposalsProps) => {
  const stages = proposalStatuses
  const types = proposalDetails

  return {
    types,
    stages,
  }
}
