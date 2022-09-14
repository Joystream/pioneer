import React from 'react'
import styled from 'styled-components'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import { Loader } from '@/common/components/icons'
import { List } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { SortHeader } from '@/common/components/List/SortHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { GetSortProps } from '@/common/hooks/useSort'
import { ThreadsColLayout } from '@/forum/constant'
import { ForumThread } from '@/forum/types'

import { ThreadListItem } from './ThreadListItem'

interface ThreadListProps {
  threads: ForumThread[]
  getSortProps: GetSortProps<ForumThreadOrderByInput>
  page?: number
  pageCount?: number
  setPage?: (page: number) => void
  isLoading?: boolean
  isArchive?: boolean
}

export const ThreadList = ({
  threads,
  getSortProps,
  isLoading,
  isArchive,
  page,
  pageCount,
  setPage,
}: ThreadListProps) => {
  if (threads.length <= 0 && !isLoading) {
    return <NotFoundText>No threads found</NotFoundText>
  }

  return (
    <ThreadListStyles gap={4}>
      <ListHeaders $colLayout={ThreadsColLayout}>
        <SortHeader {...getSortProps('title')}>Threads</SortHeader>
        <ListHeader>Replies</ListHeader>
        <SortHeader {...getSortProps('updatedAt')}>Last Activity</SortHeader>
        <SortHeader {...getSortProps('author')}>Author</SortHeader>
        {isArchive ? (
          <ListHeader>Archived</ListHeader>
        ) : (
          <SortHeader {...getSortProps('createdAt')}>Created</SortHeader>
        )}
      </ListHeaders>

      {isLoading ? (
        <Loader />
      ) : (
        <List as="div" isArchive={isArchive}>
          {setPage && <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />}
          {threads.map((thread, index) => (
            <ThreadListItem key={index} thread={thread} isArchive={isArchive} />
          ))}
          {setPage && <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />}
        </List>
      )}
    </ThreadListStyles>
  )
}

const ThreadListStyles = styled(RowGapBlock)`
  ${ListHeaders} {
    padding: 0 24px;
  }
`
