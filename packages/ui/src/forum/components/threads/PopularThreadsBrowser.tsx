import React, { useEffect, useState } from 'react'

import { useForumPopularThread } from '@/forum/hooks/useForumPopularThread'

import { ThreadBrowser } from './ThreadBrowser'

const THREADS_PER_PAGE = 2

export const PopularThreadsBrowser = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { threads, isLoading } = useForumPopularThread({ page: currentPage, threadsPerPage: THREADS_PER_PAGE })

  const [pageCount, setPageCount] = useState<number>()
  useEffect(() => {
    if (!threads) return
    else if (threads.length === 0) {
      setPageCount(currentPage - 1)
      setCurrentPage(currentPage - 1)
    } else if (threads.length < THREADS_PER_PAGE) {
      setPageCount(currentPage)
    }
  }, [threads])

  return (
    <ThreadBrowser
      label="Popular threads"
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      threads={threads}
      pageCount={pageCount}
      isLoading={isLoading}
      emptyText="There no active threads at the moment."
    />
  )
}
