import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { ListItem } from '@/common/components/List'
import { formatDuration } from '@/common/components/statistics'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { Subscription } from '@/common/components/typography/Subscription'
import { isDefined } from '@/common/utils'
import { useElectionRemainingPeriod } from '@/council/hooks/useElectionRemainingPeriod'
import { useElectionStage } from '@/council/hooks/useElectionStage'
import { useMyCastVotes } from '@/council/hooks/useMyCastVotes'
import { useMyCurrentVotesCount } from '@/council/hooks/useMyCurrentVotesCount'
import { Election } from '@/council/types/Election'
import { Member } from '@/memberships/types'

import {
  ContentWrapper,
  ElementWrapper,
  StyledBadge,
  StyledClosedButton,
  StyledLink,
  StyledText,
  StyledTriangle,
  TimeWrapper,
  TopElementsWrapper,
} from './styles'

export interface ElectionListItemProps {
  election: Election
  hideForStorage: (id: string) => void
  member: Member
}

export const ElectionListItem: React.FC<ElectionListItemProps> = React.memo(({ hideForStorage, member, election }) => {
  const { t } = useTranslation('overview')
  const { stage: electionStage } = useElectionStage()
  const { allAccounts } = useMyAccounts()
  const { votesTotal } = useMyCurrentVotesCount(election.cycleId)
  const canVote = isDefined(votesTotal) && allAccounts.length > votesTotal
  const remainingPeriod = useElectionRemainingPeriod(electionStage)
  const { votes } = useMyCastVotes(election.cycleId)
  const timeRemaining = formatDuration(remainingPeriod?.toNumber() || 0)

  const remainingCalculation = useMemo(() => {
    const dayChecker = timeRemaining[0][1] === 'd'
    const dayNumberChecker = timeRemaining[0][0]
    if (
      (dayNumberChecker < 1 && dayChecker) ||
      (timeRemaining[0][1] !== 'd' && timeRemaining[0][1] !== 'w') ||
      dayNumberChecker === 0
    ) {
      return '1day'
    }
    if (dayNumberChecker > 1 && dayNumberChecker < 3 && dayChecker) {
      return '3day'
    }
  }, [])

  const getCopyMessage = () => {
    const allVotesRevealed = votes?.every((vote) => vote.voteFor)
    const urlAddress = '#/election'
    switch (electionStage) {
      case 'announcing':
        if (election.candidates.some((candidate) => candidate.member.id === member.id)) {
          return null
        }
        return (
          <StyledText>
            {t('deadline.announcingPeriod')}
            <StyledLink href={urlAddress}>{t('deadline.announcingLink')}</StyledLink>
          </StyledText>
        )
      case 'voting':
        if (!canVote) {
          return null
        }
        return (
          <StyledText>
            {t('deadline.votingPeriod')} <StyledLink href={urlAddress}>{t('deadline.votingLink')}</StyledLink>
          </StyledText>
        )
      case 'revealing':
        if (!allVotesRevealed) {
          return null
        }
        return (
          <StyledText>
            {t('deadline.revealingPeriod')}
            <StyledLink href={urlAddress}>{t('deadline.revealingLink')}</StyledLink>
          </StyledText>
        )
    }
  }

  const copyMessage = getCopyMessage()
  if (!copyMessage) {
    return null
  }
  return (
    <ElementWrapper>
      <ListItem>
        <TopElementsWrapper>
          <StyledTriangle deadlineTime={remainingCalculation} />{' '}
          <StyledClosedButton onClick={() => hideForStorage(`${election.cycleId}:${electionStage}`)} />
        </TopElementsWrapper>
        <ContentWrapper>
          <TimeWrapper>
            <Subscription>
              {t('deadline.remainingTime')} {<DurationValue value={timeRemaining} />}
            </Subscription>
            <StyledBadge>{t('deadline.election')}</StyledBadge>
          </TimeWrapper>
          <StyledText>{getCopyMessage()}</StyledText>
        </ContentWrapper>
      </ListItem>
    </ElementWrapper>
  )
})
