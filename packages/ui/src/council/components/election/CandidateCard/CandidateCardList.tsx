import React from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'

import { CandidateCardProps, CandidateCard, CandidateCardCandidate } from './CandidateCard'
import { NoCandidates } from './NoCandidates'

interface CandidateCardListCandidate extends CandidateCardCandidate {
  isMyCandidate?: boolean
  voted?: boolean
}

interface CandidatesListProps extends Pick<CandidateCardProps, 'isVotingStage' | 'isPreview'> {
  candidates?: CandidateCardListCandidate[]
  isLoading?: boolean
}

export const CandidateCardList = ({ candidates = [], isLoading, isVotingStage }: CandidatesListProps) => {
  if (isLoading) {
    return <Loading text="Loading candidates..." />
  }

  if (!candidates.length) {
    return <NoCandidates />
  }

  return (
    <CandidatesListStyles>
      {candidates.map(({ voted, isMyCandidate, ...candidate }, index) => (
        <CandidateCard
          key={index}
          candidate={candidate}
          voted={voted}
          withdrawable={isMyCandidate}
          isVotingStage={isVotingStage}
        />
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
