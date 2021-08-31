import React, { useState } from 'react'

import { useRandomPaginatedThreads } from '@/forum/hooks/useRandomPaginatedThreads'

import { ThreadBrowser } from './ThreadBrowser'

export const RandomThreadsBrowser = ({ label }: { label: string }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const threadsPerPage = 2
  const { threads, pageCount, totalCount, isLoading } = useRandomPaginatedThreads({ page: currentPage, threadsPerPage })

  return (
    <ThreadBrowser
      label={label}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      threads={threads}
      pageCount={pageCount}
      totalCount={totalCount}
      isLoading={isLoading}
    />
  )
}
