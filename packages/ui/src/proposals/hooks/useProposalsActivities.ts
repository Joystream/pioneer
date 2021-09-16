import { asProposalActivity, ProposalEventFieldsFragment } from '../components/ProposalsActivities'
import { useGetProposalsEventsQuery } from '../queries/__generated__/proposalsEvents.generated'

export const useProposalsActivities = () => {
  const { data, loading } = useGetProposalsEventsQuery()
  const activities = data ? (data.events as ProposalEventFieldsFragment[]).map(asProposalActivity) : []
  return {
    isLoading: loading,
    activities,
  }
}
