import { useGetForumEventsQuery } from '../queries/__generated__/forumEvents.generated'
import { asPostActivity, asThreadCreatedActivity } from '../types/ForumActivity'

export const useForumActivities = () => {
  const { loading, data } = useGetForumEventsQuery()
  const activities = data
    ? [
        ...data.postAddedEvents.map(asPostActivity),
        ...data.postTextUpdatedEvents.map(asPostActivity),
        ...data.threadCreatedEvents.map(asThreadCreatedActivity),
      ]
    : []

  return { isLoading: loading, activities }
}
