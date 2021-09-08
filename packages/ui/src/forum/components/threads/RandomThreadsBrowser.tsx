import React, { useState } from 'react'

import { useRandomPaginatedThreads } from '@/forum/hooks/useRandomPaginatedThreads'

import { ThreadBrowser } from './ThreadBrowser'

export interface RandomThreadsBrowserProps {
  label: string
  maxThreads?: number
}

export const RandomThreadsBrowser = ({ label, maxThreads }: RandomThreadsBrowserProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { threads, pageCount, totalCount, isLoading } = useRandomPaginatedThreads({
    page: currentPage,
    threadsPerPage: 2,
    maxThreads,
  })

  return (
    <ThreadBrowser
      label={label}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      threads={threads}
      pageCount={pageCount}
      totalCount={totalCount}
      isLoading={isLoading}
      emptyText="No threads found"
    />
  )
}
