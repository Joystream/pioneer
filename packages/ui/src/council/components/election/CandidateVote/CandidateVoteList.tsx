import React from 'react'
import styled from 'styled-components'

import { CandidateVote, CandidateVoteProps } from './CandidateVote'

interface VotesListProps {
  votes: CandidateVoteProps[]
  isSuccessfulPastElection?: boolean
}

export const CandidateVoteList = ({ votes, isSuccessfulPastElection }: VotesListProps) => {
  return (
    <VotesListStyles>
      {votes.map((vote, index) => (
        <CandidateVote shouldHighlight={isSuccessfulPastElection && index < 3} key={index} {...vote} />
      ))}
    </VotesListStyles>
  )
}

const VotesListStyles = styled.section`
  display: grid;
  width: 100%;
  max-width: 100%;
`
