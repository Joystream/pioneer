import React, { useState } from 'react'

import { useMyThreads } from '@/forum/hooks/useMyThreads'

import { ThreadBrowser } from './ThreadBrowser'

export const MyThreadsBrowser = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { threads, pageCount, totalCount, isLoading } = useMyThreads({
    page: currentPage,
    threadsPerPage: 2,
    order: { orderKey: 'updatedAt', isDescending: true },
  })

  return (
    <ThreadBrowser
      label="My threads"
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      threads={threads}
      pageCount={pageCount}
      totalCount={totalCount}
      isLoading={isLoading}
      emptyText="You haven't created any threads yet"
    />
  )
}
