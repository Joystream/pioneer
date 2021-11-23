import { useGetCouncilEventsQuery } from '../queries/__generated__/councilEvents.generated'
import { asCouncilActivities } from '../types/CouncilActivities'

export const useCouncilActivities = () => {
  const { data, loading } = useGetCouncilEventsQuery()
  const activities = data ? asCouncilActivities(data.events) : []
  return {
    isLoading: loading,
    activities,
  }
}
