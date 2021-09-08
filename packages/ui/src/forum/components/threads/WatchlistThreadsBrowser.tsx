import React, { useState } from 'react'

import { useWatchlistedThreads } from '@/forum/hooks/useWatchlistedThreads'

import { ThreadBrowser } from './ThreadBrowser'

export const WatchlistThreadsBrowser = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { threads, pageCount, totalCount, isLoading } = useWatchlistedThreads({ page: currentPage, threadsPerPage: 2 })

  return (
    <ThreadBrowser
      label="Your watchlist"
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      threads={threads}
      pageCount={pageCount}
      totalCount={totalCount}
      isLoading={isLoading}
      emptyText="You don't have any watchlisted threads"
    />
  )
}
