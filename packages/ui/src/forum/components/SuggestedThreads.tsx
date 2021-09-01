import React from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { ContentWithTabs } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { ThreadItem, ThreadItemWrapper } from '@/forum/components/threads/ThreadItem'
import { useForumSuggestedThreads } from '@/forum/hooks/useForumSuggestedThreads'

export const SuggestedThreads = () => {
  const { isLoading, threads } = useForumSuggestedThreads()

  const displayThreads = () => {
    if (isLoading) {
      return <Loading />
    }

    return (
      <ThreadsList>
        {threads.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} />
        ))}
      </ThreadsList>
    )
  }

  return (
    <SuggestedThreadsWrapper>
      <Label>Suggested Threads</Label>
      {displayThreads()}
    </SuggestedThreadsWrapper>
  )
}

export const ThreadsList = styled.div`
  display: grid;
  width: 100%;
`

export const SuggestedThreadsWrapper = styled(ContentWithTabs)`
  margin-top: 12px;

  ${ThreadItemWrapper} {
    &:before {
      content: unset;
    }
    &:first-child {
      padding-top: 0;
    }
  }
`
