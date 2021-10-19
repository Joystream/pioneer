import React from 'react'
import styled from 'styled-components'

import { CandidateVote, CandidateVoteProps } from './CandidateVote'

interface VotesListProps {
  votes: CandidateVoteProps[]
}

export const CandidateVoteList = ({ votes }: VotesListProps) => {
  return (
    <VotesListStyles>
      {votes.map((vote, index) => (
        <CandidateVote key={index} {...vote} />
      ))}
    </VotesListStyles>
  )
}

const VotesListStyles = styled.section`
  display: grid;
  width: 100%;
  max-width: 100%;
`
