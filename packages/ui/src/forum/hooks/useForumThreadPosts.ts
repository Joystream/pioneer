import { LazyQueryResult } from '@apollo/client'
import { useEffect, useMemo } from 'react'

import { Defined } from '@/common/types/helpers'
import { isDefined } from '@/common/utils'
import { useGetForumPostsCountQuery, useGetForumPostsIdsLazyQuery, useGetForumPostsLazyQuery } from '@/forum/queries'
import { asForumPost, ForumPost, visiblePostStatuses } from '@/forum/types/ForumPost'

export const POSTS_PER_PAGE = 5

interface ThreadNavigation {
  page: string | null
  post: string | null
}

interface UseForumThreadPosts {
  isLoading: boolean
  posts: ForumPost[]
  page?: number
  pageCount?: number
}

export const useForumThreadPosts = (threadId: string, navigation: ThreadNavigation): UseForumThreadPosts => {
  const where = useMemo(
    () => ({ thread: { id_eq: threadId }, status_json: { isTypeOf_in: visiblePostStatuses } }),
    [threadId]
  )

  const [getPosts, postsResults] = useGetForumPostsLazyQuery()
  const [getPostIds, idsResults] = useGetForumPostsIdsLazyQuery()

  const offset = useMemo(() => {
    if (navigation.post === null) {
      return POSTS_PER_PAGE * ((Number(navigation.page) || 1) - 1)
    } else if (isResultUpToDate(idsResults, where)) {
      return indexToOffset(idsResults.data.forumPosts.findIndex(({ id }) => id === navigation.post))
    }
  }, [navigation.post, navigation.page, idsResults.data, where])

  useEffect(() => {
    if (isDefined(offset)) {
      getPosts({ variables: { where, offset, limit: POSTS_PER_PAGE } })
    } else {
      getPostIds({ variables: { where, limit: 100000 } })
    }
  }, [where, offset])

  const { loading: loadingCount, data: countData } = useGetForumPostsCountQuery({ variables: { where } })
  const totalCount = countData?.forumPostsConnection.totalCount

  return {
    isLoading: loadingCount || !isResultUpToDate(postsResults, where),
    posts: postsResults.data?.forumPosts.map(asForumPost) ?? [],
    page: 1 + (offset ?? 0) / POSTS_PER_PAGE,
    pageCount: totalCount && Math.ceil(totalCount / POSTS_PER_PAGE),
  }
}

type Result = LazyQueryResult<any, Record<any, any>>
const isResultUpToDate = <R extends Result>(result: R, where: any): result is R & { data: Defined<R['data']> } =>
  !!result.data && result.variables?.where === where

const indexToOffset = (index: number) => index - (index % POSTS_PER_PAGE)
