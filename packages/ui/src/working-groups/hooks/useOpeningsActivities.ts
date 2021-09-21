import { useGetOpeningsEventsQuery } from '../queries'
import { asOpeningsActivities } from '../types/WorkingGroupActivity'

export const useOpeningsActivities = () => {
  const { loading, data } = useGetOpeningsEventsQuery()
  const activities = data ? asOpeningsActivities(data.events) : []
  return {
    activities,
    isLoading: loading,
  }
}
