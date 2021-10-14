import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { ListItem } from '@/common/components/List'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { ProgressBar } from '@/common/components/Progress'
import {
  TextInlineBig,
  TextInlineMedium,
  TextInlineSmall,
  TokenValue,
  ValueInJoys,
} from '@/common/components/typography'
import { Subscription } from '@/common/components/typography/Subscription'
import { Colors } from '@/common/constants'
import { unknownMember } from '@/council/constants/unknownMember'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

import { CandidateCardArrow, StatsValue } from '../CandidateCard/CandidateCard'

export interface CandidateVoteProps {
  voteOwner: boolean
  revealed: boolean
  member?: Member
  stake: BN
  voteStake: BN
  votes: number
  revealedVotes: number
  index: number
}

export const CandidateVote = ({
  voteOwner,
  revealed,
  member,
  stake,
  voteStake,
  votes,
  revealedVotes,
  index,
}: CandidateVoteProps) => {
  const roundedPercentage = Math.round((100 / Number(stake)) * Number(voteStake))
  return (
    <CandidateVoteWrapper>
      <VoteIndex lighter inter>
        {index}
      </VoteIndex>
      <MemberInfo onlyTop member={member ?? unknownMember} skipModal={!member} />
      <VoteIndicatorWrapper gap={16}>
        <StakeIndicator>
          <ProgressBar start={0} end={roundedPercentage / 100} size="big" />
          <PercentageValue value bold>
            {roundedPercentage}%
          </PercentageValue>
        </StakeIndicator>
        <StakeAndVotesGroup>
          <StakeAndVotesRow>
            <Subscription>Total Stake</Subscription>
            <StatsValue>
              <TokenValue value={stake} />
            </StatsValue>
          </StakeAndVotesRow>
          <StakeAndVotesRow>
            {voteOwner && (
              <>
                <Subscription>My Stake</Subscription>
                <StatsValue>
                  <TokenValue value={voteStake} />
                </StatsValue>
              </>
            )}
          </StakeAndVotesRow>
          <StakeAndVotesRow>
            <Subscription>Total Revealed votes</Subscription>
            <StatsValue>
              <TextInlineBig value>
                {revealedVotes}
                <TextInlineMedium inter lighter normalWeight>
                  /{votes}
                </TextInlineMedium>
              </TextInlineBig>
            </StatsValue>
          </StakeAndVotesRow>
        </StakeAndVotesGroup>
      </VoteIndicatorWrapper>
      <ButtonsGroup>
        {voteStake && revealed && (
          <ButtonPrimary size="medium" disabled>
            Revealed
          </ButtonPrimary>
        )}
        {voteStake && !revealed && <ButtonPrimary size="medium">Reveal</ButtonPrimary>}
      </ButtonsGroup>
      <CandidateCardArrow>
        <Arrow direction="right" />
      </CandidateCardArrow>
    </CandidateVoteWrapper>
  )
}

const VoteIndex = styled(TextInlineSmall)`
  text-align: center;
`

const PercentageValue = styled(TextInlineSmall)`
  position: absolute;
  left: calc(100% + 12px);
`

const StakeIndicator = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
`

const StakeAndVotesRow = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;
  width: fit-content;
  max-width: 100%;
  overflow: hidden;
`

const StakeAndVotesGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: space-between;
  align-items: center;
  column-gap: 8px;
  width: 100%;
`

const VoteIndicatorWrapper = styled(RowGapBlock)`
  margin-top: 8px;
  padding-right: 46px;
`

const CandidateVoteWrapper = styled(ListItem)`
  position: relative;
  grid-template-columns: 32px 224px 1fr 120px;
  align-items: center;
  grid-column-gap: 8px;
  height: 116px;
  padding: 24px 48px 24px 8px;

  &:hover,
  &:focus,
  &:focus-within {
    border-color: ${Colors.Blue[100]};
  }

  ${ButtonsGroup} {
    margin-left: auto;
  }
`
