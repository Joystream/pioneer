import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { useForumPopularThreads } from '@/forum/hooks/useForumPopularThreads'

import { PopularThread } from './PopularThread'
import { ThreadBrowser } from './ThreadBrowser'

const THREADS_PER_PAGE = 2

export const PopularThreadList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { threads, isLoading } = useForumPopularThreads({ page: currentPage, threadsPerPage: THREADS_PER_PAGE })

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

  if (isLoading) return <Loading />
  return (
    <StyledList>
      {threads?.map((thread) => (
        <PopularThread key={thread.id} thread={thread} />
      ))}
    </StyledList>
  )
}

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
`
