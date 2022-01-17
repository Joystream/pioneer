import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { TextMedium } from '@/common/components/typography'
import { PostList } from '@/forum/components/PostList/PostList'
import { ForumRoutes } from '@/forum/constant'
import { useForumThread } from '@/forum/hooks/useForumThread'
import { ForumPost } from '@/forum/types'

export interface BountyDiscussionProps {
  discussionThreadId: string
}

export const BountyDiscussion = React.memo(({ discussionThreadId }: BountyDiscussionProps) => {
  const { t } = useTranslation('bounty')
  const { push } = useHistory()
  const { isLoading, thread } = useForumThread(discussionThreadId)
  const isThreadActive = !!(thread && thread.status.__typename === 'ThreadStatusActive')

  const replyToPost = useCallback(
    (post: ForumPost) => {
      if (thread) {
        return push(`${generatePath(ForumRoutes.thread, { id: thread.id })}?post=${post.id}`)
      }
    },
    [thread]
  )

  return (
    <Container data-testid="bounty-discussion">
      <TextMedium black>{t('discussionThread.title')}</TextMedium>
      <PostList
        threadId={discussionThreadId}
        isLoading={isLoading}
        isThreadActive={isThreadActive}
        replyToPost={replyToPost}
        isDiscussion
      />
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 8px;
`
