import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { EmptyPagePlaceholder } from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'
import { Loading } from '@/common/components/Loading'
import { AnnounceCandidacyButton } from '@/council/components/election/announcing/AnnounceCandidacyButton'

import { CandidateCardProps, CandidateCard, CandidateCardCandidate } from './CandidateCard'

interface CandidateCardListCandidate extends CandidateCardCandidate {
  isMyCandidate?: boolean
  voted?: boolean
  myStake?: BN
}

interface CandidatesListProps extends Pick<CandidateCardProps, 'canVote' | 'isPreview'> {
  candidates?: CandidateCardListCandidate[]
  isLoading?: boolean
}

export const CandidateCardList = ({ candidates = [], isLoading, canVote }: CandidatesListProps) => {
  if (isLoading) {
    return <Loading />
  }

  if (!candidates.length) {
    return (
      <EmptyPagePlaceholder
        title="There are no candidates yet"
        copy="Be the first one to announce your candidacy."
        button={<AnnounceCandidacyButton />}
      />
    )
  }

  return (
    <CandidatesListStyles>
      {candidates.map(({ voted, isMyCandidate, myStake, ...candidate }, index) => (
        <CandidateCard
          key={index}
          candidate={candidate}
          voted={voted}
          withdrawable={isMyCandidate}
          canVote={canVote}
          myStake={myStake}
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
