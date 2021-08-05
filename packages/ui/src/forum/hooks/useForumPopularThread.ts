import { useEffect, useState } from 'react'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import { useGetForumPostsCountLazyQuery, useGetForumThreadsQuery } from '@/forum/queries'
import { asForumThread, ForumThread } from '@/forum/types'

export const useForumPopularThread = (category_eq: string) => {
  const [thread, setThread] = useState<ForumThread>()

  const { data: threadData } = useGetForumThreadsQuery({
    variables: { where: { category_eq }, orderBy: ForumThreadOrderByInput.UpdatedAtDesc, limit: 1 },
  })

  useEffect(() => {
    const rawThread = threadData?.forumThreads[0]
    if (!rawThread) return
    fetchPostCount({ variables: { where: { thread_eq: rawThread.id } } })
    setThread(asForumThread(rawThread))
  }, [threadData])

  const [fetchPostCount, { data: postCountData }] = useGetForumPostsCountLazyQuery()

  return { thread, postCount: postCountData?.forumPostsConnection.totalCount }
}
