import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { BorderRad, Colors, Shadows } from '@/common/constants'
import { spacing } from '@/common/utils/styles'
import { PostListItem } from '@/forum/components/PostList/PostListItem'
import { useForumPosts } from '@/forum/hooks/useForumPosts'

interface PostListProps {
  threadId: string
  selectedPostId?: string
}

export const PostList = ({ threadId, selectedPostId }: PostListProps) => {
  const { isLoading, posts } = useForumPosts(threadId)
  const selectedElement = useRef<HTMLDivElement>(null)
  useEffect(() => {
    selectedElement.current?.scrollIntoView?.({ behavior: 'smooth' })
  }, [selectedPostId])

  if (isLoading) {
    return <Loading text="We are loading posts..." />
  }

  return (
    <RowGapBlock gap={24}>
      {posts.map((post) => (
        <PostBlock>
          <PostListItem post={post} isSelected={post.id === selectedPostId} />
        </PostBlock>
      ))}
    </RowGapBlock>
  )
}

export const PostBlock = styled.div`
  border-radius: ${BorderRad.m};
  background-color: ${Colors.White};
  box-shadow: ${Shadows.light};
  padding: ${spacing(3)};
`
