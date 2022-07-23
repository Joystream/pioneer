import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { ForumThread } from '@/forum/types'

import { ThreadListItemCard } from './ThreadItemCard'

interface ThreadListCardsProps {
  threads: ForumThread[]
  isLoading: boolean
}

export const ThreadListCards = ({ threads, isLoading }: ThreadListCardsProps) => {
  return isLoading ? (
    <Loading />
  ) : (
    <ThreadListCardContainer>
      {threads.map((thread) => (
        <Link key={thread.id} to={`/forum/thread/${thread.id}`}>
          <ThreadListItemCard thread={thread} />
        </Link>
      ))}
    </ThreadListCardContainer>
  )
}

const ThreadListCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
`
