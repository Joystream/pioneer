import { useGetForumEventsQuery } from '../queries/__generated__/forumEvents.generated'
import { asPostActivity } from '../types/ForumActivity'

export const useForumActivities = () => {
  const { loading, data } = useGetForumEventsQuery()
  const activities = data
    ? [...data.postAddedEvents.map(asPostActivity), ...data.postTextUpdatedEvents.map(asPostActivity)]
    : []

  return { isLoading: loading, activities }
}
