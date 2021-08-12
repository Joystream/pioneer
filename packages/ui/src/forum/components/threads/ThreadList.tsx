import React from 'react'
import styled from 'styled-components'

import { List } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { ThreadsColLayout } from '@/forum/constant'
import { ForumThread } from '@/forum/types'

import { ThreadListItem } from './ThreadListItem'

interface ThreadListProps {
  threads: ForumThread[]
}
export const ThreadList = ({ threads }: ThreadListProps) => (
  <ThreadListStyles gap={4}>
    <ListHeaders $colLayout={ThreadsColLayout}>
      <ListHeader>Threads</ListHeader>
      <ListHeader>Replies</ListHeader>
      <ListHeader>Votes</ListHeader>
      <ListHeader>Last Activity</ListHeader>
      <ListHeader>Author</ListHeader>
      <ListHeader>Created</ListHeader>
    </ListHeaders>

    <List as="div">
      {threads.map((thread, index) => (
        <ThreadListItem key={index} thread={thread} />
      ))}
    </List>
  </ThreadListStyles>
)

const ThreadListStyles = styled(RowGapBlock)``
