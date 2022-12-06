import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { TextMedium } from '@/common/components/typography'
import { PostList } from '@/forum/components/PostList/PostList'
import { useForumThread } from '@/forum/hooks/useForumThread'

export interface BountyDiscussionProps {
  discussionThreadId: string
}

export const BountyDiscussion = React.memo(({ discussionThreadId }: BountyDiscussionProps) => {
  const { t } = useTranslation('bounty')
  const { isLoading, thread } = useForumThread(discussionThreadId)
  const isThreadActive = !!(thread && thread.status.__typename === 'ThreadStatusActive')

  return (
    <Container id="bounty-discussion">
      <TextMedium black bold>
        {t('discussionThread.title')}
      </TextMedium>
      <PostList threadId={discussionThreadId} isLoading={isLoading} isThreadActive={isThreadActive} isDiscussion />
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 8px;
`
