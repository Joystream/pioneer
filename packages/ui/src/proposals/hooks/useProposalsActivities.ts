import { asProposalActivities } from '../components/ProposalsActivities'
import { useGetProposalsEventsQuery } from '../queries/__generated__/proposalsEvents.generated'

export const useProposalsActivities = () => {
  const { data, loading } = useGetProposalsEventsQuery()
  const activities = data ? asProposalActivities(data.events) : []
  return {
    isLoading: loading,
    activities,
  }
}
