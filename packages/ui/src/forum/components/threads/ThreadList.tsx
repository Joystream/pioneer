import React, { FC, memo, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'

import { List } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { HeaderText, SortIconDown, SortIconUp } from '@/common/components/SortedListHeaders'
import { ThreadsColLayout } from '@/forum/constant'
import { ForumThread } from '@/forum/types'

import { ThreadListItem } from './ThreadListItem'

type ThreadOrderKey = 'title' | 'visiblePostsCount' | 'votes' | 'activity' | 'author' | 'created'
export interface ThreadOrder {
  key: ThreadOrderKey
  isDescending?: boolean
}
export const ThreadDefaultOrder: ThreadOrder = { key: 'created' }

interface ThreadListProps {
  threads: ForumThread[]
  onSort: (order: ThreadOrder) => void
}
export const ThreadList = ({ threads, onSort }: ThreadListProps) => {
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

  return (
    <ThreadListStyles gap={4}>
      <ListHeaders $colLayout={ThreadsColLayout}>
        <SortHeader value="title">Threads</SortHeader>
        <SortHeader value="visiblePostsCount">Replies</SortHeader>
        <SortHeader value="votes">Votes</SortHeader>
        <SortHeader value="activity">Last Activity</SortHeader>
        <SortHeader value="author">Author</SortHeader>
        <SortHeader value="created">Created</SortHeader>
      </ListHeaders>

      <List as="div">
        {threads.map((thread, index) => (
          <ThreadListItem key={index} thread={thread} />
        ))}
      </List>
    </ThreadListStyles>
  )
}

const ThreadListStyles = styled(RowGapBlock)`
  ${ListHeaders} {
    padding: 0 24px;
  }
`
