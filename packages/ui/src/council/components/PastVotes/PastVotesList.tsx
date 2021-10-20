import React from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { useMyPastVotes } from '@/council/hooks/useMyPastVotes'

import { PastVote, PastVoteColumns } from './PastVote/PastVote'
import { List } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'

export const PastVotesList = () => {
  const { votes, isLoading } = useMyPastVotes()

  if (isLoading) {
    return <Loading />
  }
  if (!votes?.length) {
    return <NotFoundText>You have no past votes.</NotFoundText>
  }

  return (
    <VotesList>
      <ListHeaders $colLayout={PastVoteColumns}>
        <ListHeader>Round</ListHeader>
        <ListHeader>Voted on</ListHeader>
        <ListHeader>Candidate</ListHeader>
        <ListHeader>Staked</ListHeader>
        <ListHeader>Staking Account</ListHeader>
        <ListHeader>Stage</ListHeader>
      </ListHeaders>
      <List as="div">
        {votes.map((vote, index) => (
          <PastVote vote={vote} key={index} />
        ))}
      </List>
    </VotesList>
  )
}

const VotesList = styled.section`
  display: grid;
  width: 100%;
  max-width: 100%;
`
