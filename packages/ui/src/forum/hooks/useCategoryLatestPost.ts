import * as Apollo from '@apollo/client'
import { useEffect, useMemo } from 'react'

import { ForumPostOrderByInput, ForumThreadOrderByInput } from '@/common/api/queries'
import { ActiveStatus } from '@/forum/hooks/useForumCategories'
import { GetForumPostsDocument, useGetForumThreadsQuery } from '@/forum/queries'
import { asForumPost, asForumThread } from '@/forum/types'

interface UseCategoryLatestPostOptions {
  skip?: boolean
}

export const useCategoryLatestPost = (category_eq: string, options: UseCategoryLatestPostOptions = {}) => {
  const shouldSkip = options.skip ?? false
  const { data: threadData, loading: loadingThreads } = useGetForumThreadsQuery({
    skip: shouldSkip,
    variables: {
      where: {
        category: {
          id_eq: category_eq,
          status_json: { isTypeOf_eq: ActiveStatus },
        },
      },
      orderBy: ForumThreadOrderByInput.UpdatedAtDesc,
      limit: 1,
    },
  })

  const [fetchPost, { data: postData, loading: loadingPosts }] = Apollo.useLazyQuery(GetForumPostsDocument, {
    fetchPolicy: 'cache-first',
  })

  useEffect(() => {
    if (shouldSkip) {
      return
    }
    const rawThread = threadData?.forumThreads[0]
    if (rawThread) {
      fetchPost({
        variables: {
          where: { thread: { id_eq: rawThread.id } },
          orderBy: ForumPostOrderByInput.UpdatedAtDesc,
          limit: 1,
        },
      })
    }
  }, [fetchPost, shouldSkip, threadData])

  const rawPost = postData?.forumPosts[0]
  const thread = useMemo(
    () => (threadData?.forumThreads.length ? asForumThread(threadData?.forumThreads[0]) : undefined),
    [threadData]
  )

  return {
    isLoading: shouldSkip ? false : loadingPosts || loadingThreads,
    post: rawPost && asForumPost(rawPost),
    thread,
  }
}
