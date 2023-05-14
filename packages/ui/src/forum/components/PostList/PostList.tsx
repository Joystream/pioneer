import React, { RefObject, useCallback, useMemo } from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { Colors } from '@/common/constants'
import { useLocation } from '@/common/hooks/useLocation'
import { useRefetchQueries } from '@/common/hooks/useRefetchQueries'
import { useRouteQuery } from '@/common/hooks/useRouteQuery'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { AnyKeys } from '@/common/types'
import { getUrl } from '@/common/utils/getUrl'
import { ForumRoutes } from '@/forum/constant'
import { useForumThreadPosts } from '@/forum/hooks/useForumThreadPosts'

import { ForumPostStyles, PostListItem } from './PostListItem'

interface PostListProps {
  threadId: string
  isThreadActive?: boolean
  isLoading?: boolean
  isDiscussion?: boolean
}

export const PostList = ({ threadId, isThreadActive, isLoading, isDiscussion }: PostListProps) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const query = useRouteQuery()

  const navigation = { post: query.get('post'), page: query.get('page') }
  const { isLoading: isLoadingPosts, posts, page, pageCount } = useForumThreadPosts(threadId, navigation)
  const isRefetched = useRefetchQueries({ interval: MILLISECONDS_PER_BLOCK, include: ['GetForumPosts'] }, [])

  const isReady = useMemo(() => (!isLoading && !isLoadingPosts) || isRefetched, [posts, pageCount])
  const setPage = useCallback(
    (page: number) => history.replace({ pathname, search: page > 1 ? `page=${page}` : '' }),
    []
  )

  const postsRefs: AnyKeys = {}
  const getInsertRef = (postId: string) => (ref: RefObject<HTMLDivElement>) => (postsRefs[postId] = ref)

  const Wrapper: typeof RowGapBlock = useMemo(() => (isDiscussion ? DiscussionWrapper : RowGapBlock), [isDiscussion])

  if (!isReady) {
    return <Loading />
  }

  return (
    <Wrapper gap={24}>
      {!isDiscussion && <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />}
      {posts
        .filter((post) => post.status !== 'PostStatusRemoved')
        .map((post, index) => (
          <PostListItem
            isFirstItem={index === 0 && page === 1}
            key={post.id}
            post={post}
            insertRef={getInsertRef(post.id)}
            isSelected={post.id === navigation.post}
            isThreadActive={isThreadActive}
            type="forum"
            link={getUrl({ route: ForumRoutes.thread, params: { id: threadId }, query: { post: post.id } })}
            repliesToLink={`${generatePath(ForumRoutes.thread, { id: threadId })}?post=${post.repliesTo?.id}`}
            isDiscussion={isDiscussion}
          />
        ))}
      <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
    </Wrapper>
  )
}

const DiscussionWrapper = styled.div`
  ${ForumPostStyles} {
    margin-top: 24px;
    border-bottom: 1px solid ${Colors.Black[200]};
    padding-bottom: 8px;

    & > :nth-child(3n - 1) {
      width: 100%;
    }
  }
`
