import BN from 'bn.js'
import React, { useCallback } from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { Arrow } from '@/common/components/icons'
import { ListItem } from '@/common/components/List'
import { Loading } from '@/common/components/Loading'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { MultiColumnsStatistic, StatiscticContentColumn, StatsBlock } from '@/common/components/statistics'
import { TextBig, TokenValue } from '@/common/components/typography'
import { Subscription } from '@/common/components/typography/Subscription'
import { BorderRad, BulletPoint, Colors, Fonts, Overflow, Transitions } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { isDefined } from '@/common/utils'
import { VoteForCouncilButton } from '@/council/components/election/VoteForCouncilButton'
import { WithdrawButton } from '@/council/components/election/WithdrawButton'
import { CandidacyPreviewModalCall } from '@/council/modals/CandidacyPreview/types'
import { ElectionCandidate } from '@/council/types/Candidate'
import { MemberInfo, MemberPhoto } from '@/memberships/components'
import { useMemberCandidacyStats } from '@/memberships/hooks/useMemberCandidacyStats'

import { CandidateCardImage, CandidateCardImageContainer } from './CandidateCardImage'

export type CandidateCardCandidate = Pick<ElectionCandidate, 'id' | 'member' | 'stake' | 'info'>

export interface CandidateCardProps {
  candidate: CandidateCardCandidate
  voted?: boolean
  withdrawable?: boolean
  wins?: number
  loses?: number
  canVote?: boolean
  isPreview?: boolean
  myStake?: BN
}

export const CandidateCard = ({
  candidate: { id, member, info, stake },
  voted,
  myStake,
  withdrawable,
  canVote,
  isPreview,
}: CandidateCardProps) => {
  const { showModal } = useModal()
  const showCandidate = useCallback(() => {
    if (!isPreview) {
      showModal<CandidacyPreviewModalCall>({
        modal: 'CandidacyPreview',
        data: { id },
      })
    }
  }, [showModal, isPreview])
  const { isLoading: loadingStats, successful, failed } = useMemberCandidacyStats(member.id)

  return (
    <CandidateCardWrapper onClick={showCandidate}>
      <CandidateCardImageWrapper>
        <CandidateCardImage imageUrl={info.bannerUri} />
      </CandidateCardImageWrapper>
      <CandidateCardContentWrapper title={member.handle}>
        <CandidateCardContent>
          <CandidateCardMemberInfoWrapper>
            <MemberInfo onlyTop member={member} skipModal={isPreview} />
          </CandidateCardMemberInfoWrapper>
          <CandidateCardTitle as={GhostRouterLink} to="#">
            {info.title}
          </CandidateCardTitle>
          {info.bulletPoints.length > 0 && (
            <CandidateCardList>
              {info.bulletPoints.map((bulletPoint, index) => (
                <CandidateCardListItem key={index}>{bulletPoint}</CandidateCardListItem>
              ))}
            </CandidateCardList>
          )}
        </CandidateCardContent>
        <CandidateCardSummary>
          {!loadingStats && (successful > 0 || failed > 0) && (
            <CandidateCardStatistics>
              <StatsBlock size="m" centered>
                <MultiColumnsStatistic>
                  <StatiscticContentColumn>
                    <TextBig value bold>
                      {successful}
                    </TextBig>
                    <Subscription>Past Wins</Subscription>
                  </StatiscticContentColumn>
                  <StatiscticContentColumn>
                    <TextBig value bold>
                      {failed}
                    </TextBig>
                    <Subscription>Past Loses</Subscription>
                  </StatiscticContentColumn>
                </MultiColumnsStatistic>
              </StatsBlock>
            </CandidateCardStatistics>
          )}
          <CandidateCardStakeAndControls>
            {stake && (
              <CandidateCardStake>
                <StatsValue>
                  <TokenValue value={myStake || stake} />
                </StatsValue>
                <Subscription>{voted && myStake ? 'My Stake' : 'Staked'}</Subscription>
              </CandidateCardStake>
            )}
            {withdrawable && (
              <CandidateCardControls>
                <WithdrawButton member={member} />
              </CandidateCardControls>
            )}
            {canVote && isDefined(voted) && (
              <CandidateCardControls>
                <VoteForCouncilButton id={id} again={voted} />
              </CandidateCardControls>
            )}
          </CandidateCardStakeAndControls>
        </CandidateCardSummary>
        <CandidateCardArrow>
          <Arrow direction="right" />
        </CandidateCardArrow>
      </CandidateCardContentWrapper>
      {voted && <VotedBadgeStatus inverted>Voted</VotedBadgeStatus>}
      {!successful && !failed && !loadingStats && (
        <NewcomerBadgeStatus inverted size="l">
          Newcomer
        </NewcomerBadgeStatus>
      )}
      {loadingStats && (
        <LoadingStatsBlock>
          <Loading text="Loading stats..." />
        </LoadingStatsBlock>
      )}
    </CandidateCardWrapper>
  )
}

const CandidateCardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: -1px;
  overflow: hidden;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  transition: ${Transitions.all};
`

export const StatsValue = styled.span`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 6px;
  align-items: center;
  width: fit-content;
  font-size: 16px;
  line-height: 18px;
  font-weight: 700;
  color: ${Colors.Black[900]};
`

const NewcomerBadgeStatus = styled(BadgeStatus)`
  position: absolute;
  top: 16px;
  right: 48px;
`

const LoadingStatsBlock = styled.div`
  position: absolute;
  top: 16px;
  right: 48px;
`

const VotedBadgeStatus = styled(NewcomerBadgeStatus)`
  top: 8px;
  left: 8px;
  right: unset;
`

export const CandidateCardArrow = styled.div`
  display: flex;
  position: absolute;
  right: 8px;
  top: 50%;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  transform: translateY(-50%);
  transition: ${Transitions.all};
  pointer-events: none;
`

const CandidateCardStake = styled.div`
  display: grid;
  grid-row-gap: 6px;
`

const CandidateCardControls = styled.div`
  & > button + & > button {
    margin-left: 8px;
  }
`

const CandidateCardStakeAndControls = styled.div`
  display: flex;
  align-items: flex-end;
  width: fit-content;
  column-gap: 32px;
  margin-top: auto;
`

const CandidateCardStatistics = styled.div`
  width: fit-content;
  height: fit-content;
`

const CandidateCardSummary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: fit-content;
  height: 100%;
  margin-left: auto;
`

const CandidateCardListItem = styled.li`
  display: block;
  align-items: center;
  width: 100%;
  font-size: 12px;
  line-height: 18px;
  color: ${Colors.Black[500]};
  ${Overflow.FullDots};
  ${BulletPoint};

  & + & {
    margin-top: 6px;
  }
`

const CandidateCardList = styled.ul`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  overflow: hidden;
  list-style-type: disc;
  list-style-position: inside;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  pointer-events: none;
`

const CandidateCardTitle = styled.h4`
  font-size: 20px;
  line-height: 28px;
  height: 28px;
  min-height: 28px;
  max-height: 28px;
  font-family: ${Fonts.Grotesk};
  font-weight: 700;
  color: ${Colors.Black[900]};
  transition: ${Transitions.all};
  ${Overflow.FullDots};

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
`

const CandidateCardMemberInfoWrapper = styled.div`
  width: fit-content;
  margin-left: -48px;
  margin-bottom: 6px;
  z-index: 1;

  ${MemberPhoto} {
    position: absolute;
    transform: translateY(2px);
  }
`

const CandidateCardContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: fit-content;
  max-width: 100%;
  max-height: 100%;
  margin-top: 8px;
  overflow: hidden;
`

const CandidateCardContentWrapper = styled.article`
  display: flex;
  width: 100%;
  max-width: 100%;
  height: 100%;
  column-gap: 24px;
  padding: 16px 48px 16px 24px;
  overflow: hidden;
`

const CandidateCardWrapper = styled(ListItem)`
  position: relative;
  grid-template-columns: 260px 1fr;
  height: 180px;
  padding: 0;

  &:hover,
  &:focus,
  &:focus-within {
    border-color: ${Colors.Blue[100]};

    ${CandidateCardTitle},
    ${CandidateCardArrow} {
      color: ${Colors.Blue[500]};
    }

    ${CandidateCardImageWrapper} {
      border-color: ${Colors.Blue[100]};

      ${CandidateCardImageContainer} {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
`
