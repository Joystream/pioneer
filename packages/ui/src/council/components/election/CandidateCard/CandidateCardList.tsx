import React from 'react'
import styled from 'styled-components'

import { CandidateCardProps, CandidateCard } from './CandidateCard'

interface CandidatesListProps {
  candidates: CandidateCardProps[]
}

export const CandidateCardList = ({ candidates }: CandidatesListProps) => {
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
