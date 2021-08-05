import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { BorderRad, Colors, Shadows } from '@/common/constants'
import { spacing } from '@/common/utils/styles'
import { PostListItem } from '@/forum/components/PostList/PostListItem'
import { useForumPosts } from '@/forum/hooks/useForumPosts'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

interface PostListProps {
  threadId: string
  selectedPostId?: string
}

export const PostList = ({ threadId, selectedPostId }: PostListProps) => {
  const [page, setPage] = useState(1)
  const { isLoading, posts, pageCount } = useForumPosts({ threadId, page })
  const { active: activeMember } = useMyMemberships()

  const selectedElement = useRef<HTMLDivElement>(null)
  useEffect(() => {
    selectedElement.current?.scrollIntoView?.({ behavior: 'smooth' })
  }, [selectedPostId])

  if (isLoading) {
    return <Loading text="Loading posts..." />
  }

  return (
    <RowGapBlock gap={24}>
      {!isLoading && !!pageCount && pageCount > 1 && (
        <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
      )}
      {posts.map((post) => (
        <PostBlock key={post.id}>
          <PostListItem
            post={post}
            isSelected={post.id === selectedPostId}
            isOwn={activeMember?.id === post.author.id}
          />
        </PostBlock>
      ))}
      {!isLoading && !!pageCount && pageCount > 1 && (
        <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
      )}
    </RowGapBlock>
  )
}

export const PostBlock = styled.div`
  border-radius: ${BorderRad.m};
  background-color: ${Colors.White};
  box-shadow: ${Shadows.light};
  padding: ${spacing(3)};
`
