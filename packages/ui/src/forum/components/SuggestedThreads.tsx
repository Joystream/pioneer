import React from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { ContentWithTabs } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { spacing } from '@/common/utils/styles'
import { ThreadItem, ThreadItemStyles } from '@/forum/components/threads/ThreadItem'
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
          <ThreadItem key={thread.id} categoryLabel="Lorem > Ipsum > Del" thread={thread} hideButtons />
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
  margin-top: ${spacing(3)};

  ${ThreadItemStyles} {
    padding: 0;
    border: 0;
  }
`
