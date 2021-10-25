import { useGetForumEventsQuery } from '../queries/__generated__/forumEvents.generated'
import {
  asCategoryCreatedActivity,
  asPostActivity,
  asPostDeletedActivity,
  asThreadCreatedActivity,
} from '../types/ForumActivity'

export const useForumActivities = () => {
  const { loading, data } = useGetForumEventsQuery()
  const activities = data
    ? [
        ...data.postAddedEvents.map(asPostActivity),
        ...data.postTextUpdatedEvents.map(asPostActivity),
        ...data.postDeletedEvents.map(asPostDeletedActivity),
        ...data.threadCreatedEvents.map(asThreadCreatedActivity),
        ...data.categoryCreatedEvents.map(asCategoryCreatedActivity),
      ].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    : []

  return { isLoading: loading, activities }
}
