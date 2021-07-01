import { proposalDetails } from '@/proposals/model/proposalDetails'
import { proposalStatuses } from '@/proposals/model/proposalStatus'

export const usePastProposals = () => {
  const stages = proposalStatuses
  const types = proposalDetails

  return {
    types,
    stages,
  }
}
