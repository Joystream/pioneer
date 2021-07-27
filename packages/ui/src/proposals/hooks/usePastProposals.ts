import { proposalDetails } from '@/proposals/model/proposalDetails'
import { proposalPastStatuses } from '@/proposals/model/proposalStatus'

export const usePastProposals = () => {
  const stages = proposalPastStatuses
  const types = proposalDetails

  return {
    types,
    stages,
  }
}
