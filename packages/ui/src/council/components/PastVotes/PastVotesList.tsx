import React from 'react'

import { CastVoteOrderByInput } from '@/common/api/queries'
import { List } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { SortHeader } from '@/common/components/List/SortHeader'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { useSort } from '@/common/hooks/useSort'
import { useMyPastVotes } from '@/council/hooks/useMyPastVotes'

import { PastVote } from './PastVote/PastVote'
import { PastVoteColumns } from './styles'

export const PastVotesList = () => {
  const { order, getSortProps } = useSort<CastVoteOrderByInput>('createdAt')
  const { votes, isLoading, pagination } = useMyPastVotes({ order })

  if (isLoading) {
    return <Loading />
  }
  if (!votes?.length) {
    return <NotFoundText>You have no past votes.</NotFoundText>
  }

  return (
    <RowGapBlock gap={4}>
      <ListHeaders $colLayout={PastVoteColumns}>
        <ListHeader>Round</ListHeader>
        <SortHeader {...getSortProps('createdAt')}>Voted on</SortHeader>
        <ListHeader>Candidate</ListHeader>
        <SortHeader {...getSortProps('stake')}>Staked</SortHeader>
        <SortHeader {...getSortProps('castBy')}>Staking Account</SortHeader>
        <ListHeader>Stage</ListHeader>
        <SortHeader {...getSortProps('stakeLocked')}>Stake recovered</SortHeader>
      </ListHeaders>
      <List>
        {votes.map((vote) => (
          <PastVote vote={vote} key={vote.id} $colLayout={PastVoteColumns} />
        ))}
      </List>
      <Pagination {...pagination} />
    </RowGapBlock>
  )
}
