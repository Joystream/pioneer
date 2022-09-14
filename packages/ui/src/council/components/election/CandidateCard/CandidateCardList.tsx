import React from 'react'
import styled from 'styled-components'

import { Loader } from '@/common/components/icons'

import { CandidateCardProps, CandidateCard, CandidateCardCandidate } from './CandidateCard'
import { NoCandidates } from './NoCandidates'

interface CandidateCardListCandidate extends CandidateCardCandidate {
  isMyCandidate?: boolean
  voted?: boolean
}

interface CandidatesListProps extends Pick<CandidateCardProps, 'canVote' | 'isPreview'> {
  candidates?: CandidateCardListCandidate[]
  isLoading?: boolean
}

export const CandidateCardList = ({ candidates = [], isLoading, canVote }: CandidatesListProps) => {
  if (isLoading) {
    return <Loader />
  }

  if (!candidates.length) {
    return <NoCandidates />
  }

  return (
    <CandidatesListStyles>
      {candidates.map(({ voted, isMyCandidate, ...candidate }, index) => (
        <CandidateCard key={index} candidate={candidate} voted={voted} withdrawable={isMyCandidate} canVote={canVote} />
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
