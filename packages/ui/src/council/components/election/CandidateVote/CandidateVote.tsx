import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { ListItem } from '@/common/components/List'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { ProgressBar } from '@/common/components/Progress'
import { TextInlineBig, TextInlineSmall, TokenValue } from '@/common/components/typography'
import { Subscription } from '@/common/components/typography/Subscription'
import { BN_ZERO, Colors } from '@/common/constants'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

import { CandidateCardArrow, StatsValue } from '../CandidateCard/CandidateCard'

export interface CandidateVoteProps {
  revealed: boolean
  member: Member
  sumOfAllStakes: BN
  totalStake: BN
  ownStake: BN
  votes: number
  index: number
}

export const CandidateVote = ({
  revealed,
  member,
  sumOfAllStakes,
  totalStake,
  ownStake,
  votes,
  index,
}: CandidateVoteProps) => {
  const roundedPercentage = totalStake.muln(100).divRound(sumOfAllStakes)
  const userVoted = ownStake.gt(BN_ZERO)
  return (
    <CandidateVoteWrapper>
      <VoteIndex lighter inter>
        {index}
      </VoteIndex>
      <MemberInfo onlyTop member={member} skipModal={!member} />
      <VoteIndicatorWrapper gap={16}>
        <StakeIndicator>
          <ProgressBar start={0} end={roundedPercentage.toNumber() / 100} size="big" />
          <PercentageValue value bold>
            {roundedPercentage.toString()}%
          </PercentageValue>
        </StakeIndicator>
        <StakeAndVotesGroup>
          <StakeAndVotesRow>
            <Subscription>Total Stake</Subscription>
            <StatsValue>
              <TokenValue value={totalStake} />
            </StatsValue>
          </StakeAndVotesRow>
          <StakeAndVotesRow>
            {userVoted && (
              <>
                <Subscription>My Stake</Subscription>
                <StatsValue>
                  <TokenValue value={ownStake} />
                </StatsValue>
              </>
            )}
          </StakeAndVotesRow>
          <StakeAndVotesRow>
            <Subscription>Total Revealed votes</Subscription>
            <StatsValue>
              <TextInlineBig value>{votes}</TextInlineBig>
            </StatsValue>
          </StakeAndVotesRow>
        </StakeAndVotesGroup>
      </VoteIndicatorWrapper>
      <ButtonsGroup>
        {userVoted &&
          (revealed ? (
            <ButtonPrimary size="medium" disabled>
              Revealed
            </ButtonPrimary>
          ) : (
            <ButtonPrimary size="medium">Reveal</ButtonPrimary>
          ))}
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
