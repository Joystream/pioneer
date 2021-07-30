import React from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { ContentWithTabs } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { SuggestedThread } from '@/forum/components/SuggestedThreads/SuggestedThread'
import { useForumSuggestedThreads } from '@/forum/hooks/useForumSuggestedThreads'

export const SuggestedThreads = () => {
  const { isLoading, threads } = useForumSuggestedThreads()

  console.log('Suggested Threads', isLoading, threads)
  const displayThreads = () => {
    if (isLoading) {
      return <Loading />
    }

    return (
      <ThreadsList>
        {threads.map((thread) => (
          <SuggestedThread thread={thread} />
        ))}
      </ThreadsList>
    )
  }

  return (
    <ContentWithTabs>
      <Label>Suggested Threads</Label>
      {displayThreads()}
    </ContentWithTabs>
  )
}

export const ThreadsList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`
