import BN from 'bn.js'
import React, { useCallback } from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { ButtonPrimary, ButtonSecondary } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { ListItem } from '@/common/components/List'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { StatiscticContentColumn, StatsBlock, TwoColumnsStatistic } from '@/common/components/statistics'
import { TextBig, ValueInJoys } from '@/common/components/typography'
import { Subscription } from '@/common/components/typography/Subscription'
import { BorderRad, BulletPoint, Colors, Fonts, Overflow, Transitions } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { formatTokenValue } from '@/common/model/formatters'
import { CandidacyPreviewModalCall } from '@/council/modals/CandidacyPreview/types'
import { MemberInfo, MemberPhoto } from '@/memberships/components'
import { Member } from '@/memberships/types'

import { CandidateCardImage, CandidateCardImageContainer } from './CandidateCardImage'

export interface CandidateCardProps {
  id: string
  member: Member
  image?: string
  voted?: boolean
  withdrawable?: boolean
  title: string
  infolist?: string[]
  stake?: BN
  wons?: number
  losts?: number
  isVotingStage?: boolean
  isPreview?: boolean
}

export const CandidateCard = ({
  id,
  member,
  image,
  voted,
  withdrawable,
  title,
  infolist,
  stake,
  wons = 0,
  losts = 0,
  isVotingStage,
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

  return (
    <CandidateCardWrapper onClick={showCandidate}>
      <CandidateCardImageWrapper>
        <CandidateCardImage imageUrl={image} />
      </CandidateCardImageWrapper>
      <CandidateCardContentWrapper>
        <CandidateCardContent>
          <CandidateCardMemberInfoWrapper>
            <MemberInfo onlyTop member={member} skipModal={isPreview} />
          </CandidateCardMemberInfoWrapper>
          <CandidateCardTitle as={GhostRouterLink} to="#">
            {title}
          </CandidateCardTitle>
          {infolist && (
            <CandidateCardList>
              {infolist.map((itemText, index) => (
                <CandidateCardListItem key={index}>{itemText}</CandidateCardListItem>
              ))}
            </CandidateCardList>
          )}
        </CandidateCardContent>
        <CandidateCardSummary>
          {(wons > 0 || losts > 0) && (
            <CandidateCardStatistics>
              <StatsBlock size="m" centered>
                <TwoColumnsStatistic>
                  <StatiscticContentColumn>
                    <TextBig value bold>
                      {wons}
                    </TextBig>
                    <Subscription>Past Wons</Subscription>
                  </StatiscticContentColumn>
                  <StatiscticContentColumn>
                    <TextBig value bold>
                      {losts}
                    </TextBig>
                    <Subscription>Past Losts</Subscription>
                  </StatiscticContentColumn>
                </TwoColumnsStatistic>
              </StatsBlock>
            </CandidateCardStatistics>
          )}
          <CandidateCardStakeAndControls>
            {stake && (
              <CandidateCardStake>
                <StatsValue>
                  <ValueInJoys>{formatTokenValue(stake)}</ValueInJoys>
                </StatsValue>
                <Subscription>My stake</Subscription>
              </CandidateCardStake>
            )}
            {isVotingStage && (
              <CandidateCardControls>
                {withdrawable ? (
                  <ButtonSecondary size="medium">Withdraw Candidacy</ButtonSecondary>
                ) : voted ? (
                  <ButtonPrimary size="medium">Vote again </ButtonPrimary>
                ) : (
                  <ButtonPrimary size="medium">Vote</ButtonPrimary>
                )}
              </CandidateCardControls>
            )}
          </CandidateCardStakeAndControls>
        </CandidateCardSummary>
        <CandidateCardArrow>
          <Arrow direction="right" />
        </CandidateCardArrow>
      </CandidateCardContentWrapper>
      {voted && <VotedBadgeStatus inverted>Voted</VotedBadgeStatus>}
      {wons === 0 && losts === 0 && (
        <NewcomerBadgeStatus inverted size="l">
          Newcomer
        </NewcomerBadgeStatus>
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
  overflow: hidden;
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
