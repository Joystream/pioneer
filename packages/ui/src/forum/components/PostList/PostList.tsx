import React, { RefObject, useCallback, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { useLocation } from '@/common/hooks/useLocation'
import { useRouteQuery } from '@/common/hooks/useRouteQuery'
import { AnyKeys } from '@/common/types'
import { ForumRoutes } from '@/forum/constant'
import { useForumThreadPosts } from '@/forum/hooks/useForumThreadPosts'
import { ForumPost } from '@/forum/types'

import { PostListItem } from './PostListItem'

interface PostListProps {
  threadId: string
  isThreadActive?: boolean
  isLoading?: boolean
  replyToPost: (post: ForumPost) => void
}

export const PostList = ({ threadId, isThreadActive, isLoading, replyToPost }: PostListProps) => {
  const history = useHistory()
  const { origin, pathname } = useLocation()
  const query = useRouteQuery()

  const navigation = { post: query.get('post'), page: query.get('page') }
  const { isLoading: isLoadingPosts, posts, page, pageCount } = useForumThreadPosts(threadId, navigation)
  const isReady = useMemo(() => !(isLoading || isLoadingPosts), [posts, pageCount])
  const setPage = useCallback(
    (page: number) => history.replace({ pathname, search: page > 1 ? `page=${page}` : '' }),
    []
  )

  const postsRefs: AnyKeys = {}
  const getInsertRef = (postId: string) => (ref: RefObject<HTMLDivElement>) => (postsRefs[postId] = ref)

  useEffect(() => {
    posts &&
      navigation.post &&
      postsRefs[navigation.post]?.current &&
      postsRefs[navigation.post].current.scrollIntoView({ behavior: 'smooth', inline: 'start' })
  }, [postsRefs, navigation.post])

  if (!isReady) {
    return <Loading text={isLoading ? 'Loading thread...' : 'Loading posts...'} />
  }

  return (
    <RowGapBlock gap={24}>
      <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
      {posts.map((post) => (
        <PostListItem
          key={post.id}
          post={post}
          insertRef={getInsertRef(post.id)}
          isSelected={post.id === navigation.post}
          isThreadActive={isThreadActive}
          type="forum"
          replyToPost={() => replyToPost({ ...post, repliesTo: undefined })}
          link={`${origin}${ForumRoutes.thread}/${threadId}?post=${post.id}`}
        />
      ))}
      <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
    </RowGapBlock>
  )
}
