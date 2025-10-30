import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { useRefetchQueries } from '@/common/hooks/useRefetchQueries'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { ForumPageHeader } from '@/forum/components/ForumPageHeader'
import { ThreadCard } from '@/forum/components/ThreadCard/ThreadCard'
import { ThreadCardSkeleton } from '@/forum/components/ThreadCard/ThreadCardSkeleton'
import { ThreadCardsStyles } from '@/forum/components/threads/ThreadList'
import { useWatchlistedThreads } from '@/forum/hooks/useWatchlistedThreads'

import { ForumTabs } from './components/ForumTabs'

export const ForumWatchlist = () => {
  const { threads, isLoading } = useWatchlistedThreads()
  const isRefetched = useRefetchQueries({
    interval: MILLISECONDS_PER_BLOCK,
    include: ['GetForumThreads', 'GetForumThreadsCount'],
  })

  const loading = isLoading && !isRefetched

  const displayThreads = () => {
    return (
      <RowGapBlock gap={20}>
        {!loading ? (
          <ThreadCardsStyles>
            {threads.length ? (
              threads.map((thread) => <ThreadCard thread={thread} watchlistButton />)
            ) : (
              <div>No threads found</div>
            )}
          </ThreadCardsStyles>
        ) : (
          <ThreadCardsStyles>{<ThreadCardSkeleton count={10} />}</ThreadCardsStyles>
        )}
      </RowGapBlock>
    )
  }
  return (
    <PageLayout
      header={
        <ForumPageHeader title={<PageTitle>Watchlist</PageTitle>}>
          <ForumTabs />
        </ForumPageHeader>
      }
      main={displayThreads()}
    />
  )
}
