import React from 'react'

import { List } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { useMyPastVotes } from '@/council/hooks/useMyPastVotes'

import { PastVote } from './PastVote/PastVote'
import { PastVoteColumns } from './styles'

export const PastVotesList = () => {
  const { votes, isLoading } = useMyPastVotes()

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
        <ListHeader>Voted on</ListHeader>
        <ListHeader>Candidate</ListHeader>
        <ListHeader>Staked</ListHeader>
        <ListHeader>Staking Account</ListHeader>
        <ListHeader>Stage</ListHeader>
      </ListHeaders>
      <List>
        {votes.map((vote, index) => (
          <PastVote vote={vote} key={index} $colLayout={PastVoteColumns} />
        ))}
      </List>
    </RowGapBlock>
  )
}
