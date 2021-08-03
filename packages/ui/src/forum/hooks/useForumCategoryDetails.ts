import { useEffect, useState } from 'react'

import {
  useGetForumPostsCountLazyQuery,
  useGetForumPostsLazyQuery,
  useGetForumThreadsCountQuery,
  useGetForumThreadsQuery,
} from '@/forum/queries'
import { asForumPost, asForumThread, ForumCategory, ForumPost, ForumThread } from '@/forum/types'

export interface CategoryListItemProps {
  category: ForumCategory
}

interface CategoryDetails {
  threadCount?: number
  topThread?: ForumThread & { postCount?: number }
  latestPost?: ForumPost
}

export const useForumCategoryDetails = (categoryId: string): CategoryDetails => {
  const [details, setDetails] = useState<CategoryDetails>({})

  const fromCategory = { where: { category_eq: categoryId } }
  const latest = { orderBy: ['updatedAt_ASC'], limit: 1 }

  const { data: threadCountData } = useGetForumThreadsCountQuery({ variables: { ...fromCategory } })
  useEffect(() => {
    if (!threadCountData) return
    setDetails({ ...details, threadCount: threadCountData.forumThreadsConnection.totalCount })
  }, [threadCountData])

  const { data: threadData } = useGetForumThreadsQuery({ variables: { ...fromCategory, ...latest } })
  useEffect(() => {
    const rawThread = threadData?.forumThreads[0]
    if (!rawThread) return

    const fromThread = { where: { thread_eq: rawThread.id } }
    fetchPostCount({ variables: { ...fromThread } })
    fetchPost({ variables: { ...fromThread, ...latest } })

    setDetails({ ...details, topThread: asForumThread(rawThread) })
  }, [threadData])

  const [fetchPostCount, { data: postCountData }] = useGetForumPostsCountLazyQuery()
  useEffect(() => {
    const thread = details.topThread
    if (!postCountData || !thread) return
    setDetails({
      ...details,
      topThread: { ...thread, postCount: postCountData.forumPostsConnection.totalCount },
    })
  }, [postCountData])

  const [fetchPost, { data: postData }] = useGetForumPostsLazyQuery()
  useEffect(() => {
    const rawPost = postData?.forumPosts[0]
    if (!rawPost) return
    setDetails({ ...details, latestPost: asForumPost(rawPost) })
  }, [postData])

  return details
}
