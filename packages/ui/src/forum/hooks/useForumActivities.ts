import { useGetForumEventsQuery } from '../queries/__generated__/forumEvents.generated'
import {
  asCategoryCreatedActivity,
  asCategoryDeletedActivity,
  asPostActivity,
  asPostDeletedActivity,
  asPostModeratedActivity,
  asThreadCreatedActivity,
} from '../types/ForumActivity'

export const useForumActivities = () => {
  const { loading, data } = useGetForumEventsQuery()

  const activities = data
    ? [
        ...data.postAddedEvents.map(asPostActivity),
        ...data.postTextUpdatedEvents.map(asPostActivity),
        ...data.postModeratedEvents.map(asPostModeratedActivity),
        ...data.postDeletedEvents.map(asPostDeletedActivity),
        ...data.threadCreatedEvents.map(asThreadCreatedActivity),
        ...data.categoryCreatedEvents.map(asCategoryCreatedActivity),
        ...data.categoryDeletedEvents.map(asCategoryDeletedActivity),
      ].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    : []

  return { isLoading: loading, activities }
}
