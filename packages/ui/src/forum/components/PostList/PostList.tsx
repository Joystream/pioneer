import React, { RefObject, useCallback, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { BorderRad, Colors, Shadows } from '@/common/constants'
import { useLocation } from '@/common/hooks/useLocation'
import { useRouteQuery } from '@/common/hooks/useRouteQuery'
import { AnyKeys } from '@/common/types'
import { ForumPostStyles, PostListItem } from '@/forum/components/PostList/PostListItem'
import { ForumRoutes } from '@/forum/constant'
import { useForumThreadPosts } from '@/forum/hooks/useForumThreadPosts'

interface PostListProps {
  threadId: string
  isThreadActive?: boolean
  isLoading?: boolean
}

export const PostList = ({ threadId, isThreadActive, isLoading }: PostListProps) => {
  const history = useHistory()
  const { origin, pathname } = useLocation()
  const query = useRouteQuery()

  const navigation = { post: query.get('post'), page: query.get('page') }
  const { isLoading: isLoadingPosts, posts, page, pageCount = 0 } = useForumThreadPosts(threadId, navigation)
  const isReady = useMemo(() => !(isLoading || isLoadingPosts), [posts, pageCount])

  const setPage = useCallback(
    (page: number) => history.replace({ pathname, search: page > 1 ? `page=${page}` : '' }),
    []
  )

  const pagination = useMemo(
    () => isReady && pageCount > 1 && <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />,
    [isReady, pageCount, page]
  )

  const postsRefs: AnyKeys = {}
  const getInsertRef = (postId: string) => (ref: RefObject<HTMLDivElement>) => (postsRefs[postId] = ref)

  useEffect(() => {
    navigation.post && postsRefs[navigation.post]?.current?.scrollIntoView({ behavior: 'smooth', inline: 'start' })
  }, [postsRefs, navigation.post])

  if (!isReady) {
    return <Loading text={isLoading ? 'Loading thread...' : 'Loading posts...'} />
  }

  return (
    <RowGapBlock gap={24}>
      {pagination}
      {posts.map((post) => (
        <PostBlock key={post.id}>
          <PostListItem
            post={post}
            insertRef={getInsertRef(post.id)}
            isSelected={post.id === navigation.post}
            isThreadActive={isThreadActive}
            type="forum"
            link={`${origin}${ForumRoutes.thread}/${threadId}?post=${post.id}`}
          />
        </PostBlock>
      ))}
      {pagination}
    </RowGapBlock>
  )
}

export const PostBlock = styled.div`
  border-radius: ${BorderRad.m};
  background-color: ${Colors.White};
  box-shadow: ${Shadows.light};
  padding: 24px;

  ${ForumPostStyles} {
    scroll-margin: 48px;
  }
`
