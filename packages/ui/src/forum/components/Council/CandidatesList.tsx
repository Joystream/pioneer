import React from 'react'
import styled from 'styled-components'

import { Candidate, CandidateCard } from './CandidateCard'

interface CandidatesListProps {
  candidates: Array<Candidate>
}

export const CandidatesList = ({ candidates }: CandidatesListProps) => {
  return (
    <CandidatesListStyles>
      {candidates.map((candidate, index) => (
        <CandidateCard key={index} {...candidate} />
      ))}
    </CandidatesListStyles>
  )
}

const CandidatesListStyles = styled.section`
  display: grid;
  grid-row-gap: 40px;
  width: 100%;
  max-width: 100%;
`
