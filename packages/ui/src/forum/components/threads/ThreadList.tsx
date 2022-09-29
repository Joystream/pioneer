import React from 'react'
import styled from 'styled-components'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import { List } from '@/common/components/List'
import { Loading } from '@/common/components/Loading'
import { Pagination } from '@/common/components/Pagination'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { GetSortProps } from '@/common/hooks/useSort'
import { ThreadCard } from '@/forum/components/ThreadCard/ThreadCard'
import { ForumThread } from '@/forum/types'

interface ThreadListProps {
  threads: ForumThread[]
  getSortProps: GetSortProps<ForumThreadOrderByInput>
  page?: number
  pageCount?: number
  setPage?: (page: number) => void
  isLoading?: boolean
  isArchive?: boolean
}

export const ThreadList = ({ threads, isLoading, isArchive, page, pageCount, setPage }: ThreadListProps) => {
  if (threads.length <= 0 && !isLoading) {
    return <NotFoundText>No threads found</NotFoundText>
  }

  return isLoading ? (
    <Loading />
  ) : (
    <List as="div" isArchive={isArchive}>
      <ThreadListStyles>
        {threads.map((thread) => (
          <ThreadCard thread={thread} />
        ))}
      </ThreadListStyles>
      {setPage && <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />}
    </List>
  )
}

const ThreadListStyles = styled.div`
  display: grid;
  padding: 20px 0;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`
