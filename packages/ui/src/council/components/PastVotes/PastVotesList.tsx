import React from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { useMyPastVotes } from '@/council/hooks/useMyPastVotes'

import { PastVote } from './PastVote/PastVote'

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
      {votes.map((vote, index) => (
        <PastVote vote={vote} key={index} />
      ))}
    </VotesList>
  )
}

const VotesList = styled.section`
  display: grid;
  width: 100%;
  max-width: 100%;
`
