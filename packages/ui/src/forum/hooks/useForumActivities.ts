import { useGetForumEventsQuery } from '../queries'
import { asForumActivities } from '../types/ForumActivity'

export const useForumActivities = () => {
  const { loading, data } = useGetForumEventsQuery()
  const activities = asForumActivities(data?.events ?? [])
  return { isLoading: loading, activities }
}
