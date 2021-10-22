import React from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'

import { CandidateCardProps, CandidateCard } from './CandidateCard'
import { NoCandidates } from './NoCandidates'

interface CandidatesListProps extends Pick<CandidateCardProps, 'isVotingStage' | 'isPreview'> {
  candidates?: (CandidateCardProps['candidate'] & { isMyCandidate?: boolean })[]
  isLoading?: boolean
  isVotingStage?: boolean
}

export const CandidateCardList = ({ candidates = [], isLoading, isVotingStage }: CandidatesListProps) => {
  if (isLoading) {
    return <Loading text="Loading candidates.." />
  }

  if (!candidates.length) {
    return <NoCandidates />
  }

  return (
    <CandidatesListStyles>
      {candidates.map(({ isMyCandidate, ...candidate }, index) => (
        <CandidateCard
          key={index}
          candidate={candidate}
          withdrawable={isMyCandidate ?? false}
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
