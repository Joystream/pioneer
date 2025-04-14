import React, { useMemo } from 'react'
import styled from 'styled-components'

import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

import { CandidateVote, CandidateVoteProps } from './CandidateVote'

interface VotesListProps {
  votes: CandidateVoteProps[]
  isSuccessfulPastElection?: boolean
}

export const CandidateVoteList = ({ votes, isSuccessfulPastElection }: VotesListProps) => {
  const winners = useMemo(() => {
    if (!isSuccessfulPastElection) return []
    return votes.filter((vote, index) => index < 3)
  }, [isSuccessfulPastElection, votes])

  const losers = useMemo(() => {
    if (!isSuccessfulPastElection) return []
    return votes.filter((vote, index) => index >= 3)
  }, [isSuccessfulPastElection, votes])
  return (
    <RowGapBlock gap={16}>
      {winners.length > 0 ? (
        <>
          <RowGapBlock gap={4}>
            <TextMedium bold>Winners</TextMedium>
            <VotesListStyles winners>
              {winners.map((vote, index) => (
                <CandidateVote key={index} {...vote} />
              ))}
            </VotesListStyles>
          </RowGapBlock>
          <RowGapBlock gap={4}>
            <TextMedium bold>Losers</TextMedium>
            <VotesListStyles>
              {losers.map((vote, index) => (
                <CandidateVote key={index} {...vote} />
              ))}
            </VotesListStyles>
          </RowGapBlock>
        </>
      ) : (
        <VotesListStyles>
          {votes.map((vote, index) => (
            <CandidateVote key={index} {...vote} />
          ))}
        </VotesListStyles>
      )}
    </RowGapBlock>
  )
}

const VotesListStyles = styled.section<{ winners?: boolean }>`
  display: grid;
  width: 100%;
  max-width: 100%;
  border: ${({ winners }) => (winners ? `3px solid ${Colors.Blue[500]}` : 'none')};
`
