import React, { FC, memo, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'

import { List } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { Loading } from '@/common/components/Loading'
import { NotFoundText } from '@/common/components/NotFoundText'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { HeaderText, SortIconDown, SortIconUp } from '@/common/components/SortedListHeaders'
import { ThreadsColLayout } from '@/forum/constant'
import { ForumThread } from '@/forum/types'

import { ThreadListItem } from './ThreadListItem'

type ThreadOrderKey = 'CreatedAt' | 'UpdatedAt' | 'Author' | 'Title'
export interface ThreadOrder {
  key: ThreadOrderKey
  isDescending?: boolean
}
export const ThreadDefaultOrder: ThreadOrder = { key: 'UpdatedAt' }

interface ThreadListProps {
  threads: ForumThread[]
  onSort: (order: ThreadOrder) => void
  isLoading?: boolean
  isArchive?: boolean
}
export const ThreadList = ({ threads, onSort, isLoading, isArchive }: ThreadListProps) => {
  const [order, setOrder] = useState(ThreadDefaultOrder)

  const sort = useCallback(
    (key: ThreadOrderKey) => {
      const next: ThreadOrder = { key, isDescending: order.key === key && !order.isDescending }
      setOrder(next)
      onSort?.(next)
    },
    [order, setOrder, onSort]
  )

  const SortHeader = useMemo<FC<{ value: ThreadOrderKey }>>(
    () =>
      memo(({ value, children }) => (
        <ListHeader onClick={() => sort(value)}>
          <HeaderText>
            {children}
            {order.key === value && (order.isDescending ? <SortIconDown /> : <SortIconUp />)}
          </HeaderText>
        </ListHeader>
      )),
    [order, sort]
  )

  if (threads.length <= 0 && !isLoading) {
    return <NotFoundText>No threads found</NotFoundText>
  }

  return (
    <ThreadListStyles gap={4}>
      <ListHeaders $colLayout={ThreadsColLayout}>
        <SortHeader value="Title">Threads</SortHeader>
        <ListHeader>Replies</ListHeader>
        <ListHeader>Votes</ListHeader>
        <SortHeader value="UpdatedAt">Last Activity</SortHeader>
        <SortHeader value="Author">Author</SortHeader>
        {isArchive ? <ListHeader>Archived</ListHeader> : <SortHeader value="CreatedAt">Created</SortHeader>}
      </ListHeaders>

      {isLoading ? (
        <Loading />
      ) : (
        <List as="div" isArchive={isArchive}>
          {threads.map((thread, index) => (
            <ThreadListItem key={index} thread={thread} isArchive={isArchive} />
          ))}
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
