import React, { RefObject, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { BorderRad, Colors, Shadows } from '@/common/constants'
import { useRouteQuery } from '@/common/hooks/useRouteQuery'
import { AnyKeys } from '@/common/types'
import { ForumPostStyles, PostListItem } from '@/forum/components/PostList/PostListItem'
import { useForumThreadPosts } from '@/forum/hooks/useForumThreadPosts'

interface PostListProps {
  threadId: string
  isThreadActive?: boolean
  isLoading?: boolean
}

export const PostList = ({ threadId, isThreadActive, isLoading }: PostListProps) => {
  const history = useHistory()
  const query = useRouteQuery()
  const initialPage = query.get('page') && !isNaN(Number(query.get('page'))) ? Number(query.get('page')) : 1
  const initialPost = query.get('post')
  const [page, setPage] = useState(initialPage)

  const { isLoading: isLoadingPosts, posts, pageCount } = useForumThreadPosts({ threadId, page })

  const pagination = useMemo(() => {
    isReady && pageCount && pageCount > 1 && <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
  }, [isReady, pageCount, setPage])

  const postsRefs: AnyKeys = {}
  const getInsertRef = (postId: string) => (ref: RefObject<HTMLDivElement>) => (postsRefs[postId] = ref)

  useEffect(() => {
    if (initialPost && postsRefs[initialPost]) {
      postsRefs[initialPost].current?.scrollIntoView({ behavior: 'smooth', inline: 'start' })
    }
  }, [postsRefs, initialPost])

  useEffect(() => {
    if (page !== initialPage) {
      query.delete('post')
      query.delete('page')

      if (page > 1) {
        query.set('page', page.toString())
      }

      history.replace({ pathname: history.location.pathname, search: query.toString() })
    }
  }, [page])

  useEffect(() => {
    if (initialPage !== page) {
      setPage(initialPage)
    }
  }, [initialPage, initialPost])

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
            isSelected={post.id === initialPost}
            isThreadActive={isThreadActive}
            type="forum"
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
