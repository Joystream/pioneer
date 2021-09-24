import { useGetProposalsEventsQuery } from '../queries/__generated__/proposalsEvents.generated'
import { asProposalActivities } from '../types/ProposalsActivities'

export const useProposalsActivities = () => {
  const { data, loading } = useGetProposalsEventsQuery()
  const activities = data ? asProposalActivities(data.events) : []
  return {
    isLoading: loading,
    activities,
  }
}
