import React from 'react'
import styled from 'styled-components'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import { List } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { SortHeader } from '@/common/components/List/SortHeader'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { GetSortProps } from '@/common/hooks/useSort'
import { ThreadCard } from '@/forum/components/ThreadCard/ThreadCard'
import { ThreadListItem } from '@/forum/components/threads/ThreadListItem'
import { ThreadsColLayout } from '@/forum/constant'
import { ForumThread } from '@/forum/types'

interface ThreadListProps {
  threads: ForumThread[]
  getSortProps: GetSortProps<ForumThreadOrderByInput>
  page?: number
  pageCount?: number
  setPage?: (page: number) => void
  isLoading?: boolean
  isArchive?: boolean
  type: 'list' | 'card'
  watchlistButton?: boolean
}

export const ThreadList = ({
  threads,
  isLoading,
  isArchive,
  page,
  pageCount,
  setPage,
  type,
  getSortProps,
  watchlistButton,
}: ThreadListProps) => {
  if (threads.length <= 0 && !isLoading) {
    return <NotFoundText>No threads found</NotFoundText>
  }

  if (isLoading) {
    return <Loading />
  }

  if (type === 'list') {
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

        <List as="div" isArchive={isArchive}>
          {threads.map((thread, index) => (
            <ThreadListItem key={index} thread={thread} isArchive={isArchive} />
          ))}
          {setPage && <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />}
        </List>
      </ThreadListStyles>
    )
  }

  return (
    <RowGapBlock gap={10}>
      <ThreadCardsStyles>
        {threads.map((thread) => (
          <ThreadCard thread={thread} watchlistButton={watchlistButton} />
        ))}
      </ThreadCardsStyles>
      {setPage && <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />}
    </RowGapBlock>
  )
}

const ThreadCardsStyles = styled.div`
  display: grid;
  padding: 20px 0;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`

const ThreadListStyles = styled(RowGapBlock)`
  ${ListHeaders} {
    padding: 0 24px;
  }
`
