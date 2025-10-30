import { isUndefined } from 'lodash'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { ListItem } from '@/common/components/List'
import { formatDuration } from '@/common/components/statistics'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { Subscription } from '@/common/components/typography/Subscription'
import { A_DAY } from '@/common/constants'
import { isDefined } from '@/common/utils'
import { useCouncilRemainingPeriod } from '@/council/hooks/useCouncilRemainingPeriod'
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
  const remainingPeriod = useCouncilRemainingPeriod()
  const { votes = [] } = useMyCastVotes(electionStage === 'revealing' ? election.cycleId : undefined)
  const timeRemaining = formatDuration(remainingPeriod ?? 0)

  const urgency = useMemo(() => {
    if (isUndefined(remainingPeriod)) return
    if (remainingPeriod <= A_DAY) {
      return '1day'
    }
    if (remainingPeriod <= 3 * A_DAY) {
      return '3day'
    }
  }, [remainingPeriod])

  const getCopyMessage = useMemo(() => {
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
        if (votes.every((vote) => vote.voteFor)) {
          return null
        }
        return (
          <StyledText>
            {t('deadline.revealingPeriod')}
            <StyledLink href={urlAddress}>{t('deadline.revealingLink')}</StyledLink>
          </StyledText>
        )
    }
  }, [electionStage, election.candidates.length, canVote, votes])

  if (!getCopyMessage) {
    return null
  }
  return (
    <ElementWrapper>
      <ListItem>
        <TopElementsWrapper>
          <StyledTriangle deadlineTime={urgency} />{' '}
          <StyledClosedButton onClick={() => hideForStorage(`${election.cycleId}:${electionStage}`)} />
        </TopElementsWrapper>
        <ContentWrapper>
          <TimeWrapper>
            <Subscription>
              {t('deadline.remainingTime')} {<DurationValue value={timeRemaining} />}
            </Subscription>
            <StyledBadge>{t('deadline.election')}</StyledBadge>
          </TimeWrapper>
          <StyledText>{getCopyMessage}</StyledText>
        </ContentWrapper>
      </ListItem>
    </ElementWrapper>
  )
})
