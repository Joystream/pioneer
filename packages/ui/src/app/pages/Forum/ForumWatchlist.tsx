import React, { useState } from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { ForumThreadOrderByInput } from '@/common/api/queries'
import { PageTitle } from '@/common/components/page/PageTitle'
import { useRefetchQueries } from '@/common/hooks/useRefetchQueries'
import { useSort } from '@/common/hooks/useSort'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { ForumPageHeader } from '@/forum/components/ForumPageHeader'
import { ThreadList } from '@/forum/components/threads/ThreadList'
import { useWatchlistedThreads } from '@/forum/hooks/useWatchlistedThreads'

import { ForumTabs } from './components/ForumTabs'

export const ForumWatchlist = () => {
  const { getSortProps } = useSort<ForumThreadOrderByInput>('updatedAt')
  const [currentPage, setCurrentPage] = useState(1)
  const { threads, pageCount, isLoading } = useWatchlistedThreads({ page: currentPage, threadsPerPage: 2 })
  const isRefetched = useRefetchQueries({
    interval: MILLISECONDS_PER_BLOCK,
    include: ['GetForumThreads', 'GetForumThreadsCount'],
  })

  const displayThreads = () => {
    return (
      <ThreadList
        threads={threads}
        isLoading={isLoading && !isRefetched}
        getSortProps={getSortProps}
        type="card"
        pageCount={pageCount}
        setPage={setCurrentPage}
        page={currentPage}
        watchlistButton
      />
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
