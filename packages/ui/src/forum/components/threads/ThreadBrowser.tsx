import React from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { ForumThread } from '@/forum/types'

import { ThreadItem, EmptyThreadItem } from './ThreadItem'

export interface ThreadBrowserProps {
  label: string
  threads?: ForumThread[]
  pageCount?: number
  totalCount?: number
  isLoading: boolean
  currentPage: number
  setCurrentPage: React.Dispatch<number>
  emptyText: string
}

export const ThreadBrowser = ({ label, threads, isLoading, emptyText }: ThreadBrowserProps) => {
  if (isLoading) return <Loading />
  return (
    <>
      {label}
      <StyledList>
        {threads?.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} />
        ))}
        {!isLoading && !threads?.length && <EmptyThreadItem text={emptyText} />}
      </StyledList>
    </>
  )
}

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
`
