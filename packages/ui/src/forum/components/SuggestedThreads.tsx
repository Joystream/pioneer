import React from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { ContentWithTabs } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
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
          <ThreadItem key={thread.id} categoryLabel="Lorem > Ipsum > Del" thread={thread} withButtons={false} />
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
  ${ThreadItemStyles} {
    padding: 0;
    border: 0;
  }
`
