import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ListItem } from '@/common/components/List'
import { formatDuration } from '@/common/components/statistics'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { Subscription } from '@/common/components/typography/Subscription'
import { useToggle } from '@/common/hooks/useToggle'
import { useElectionRemainingPeriod } from '@/council/hooks/useElectionRemainingPeriod'
import { useElectionStage } from '@/council/hooks/useElectionStage'

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
  electionId: string
  title: string
  hideForStorage: (id: string) => void
}

export const ElectionListItem: React.FC<ElectionListItemProps> = React.memo(({ electionId, title, hideForStorage }) => {
  const { t } = useTranslation('overview')
  const { stage: electionStage } = useElectionStage()
  const remainingPeriod = useElectionRemainingPeriod(electionStage)
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

  const copyMessage = () => {
    const urlAddress = '#/election?candidate='
    switch (electionStage) {
      case 'announcing':
        return (
          <StyledText>
            {t('deadline.announcingPeriod', { electionName: title })}
            <StyledLink href={urlAddress + electionId}>{t('deadline.announcingLink')}</StyledLink>
          </StyledText>
        )
      case 'voting':
        return (
          <StyledText>
            {t('deadline.votingPeriod', { electionName: title })}{' '}
            <StyledLink href={urlAddress + electionId}>{t('deadline.votingLink')}</StyledLink>
          </StyledText>
        )
      case 'revealing':
        return (
          <StyledText>
            {t('deadline.revealingPeriod', { electionName: title })}
            <StyledLink href={urlAddress + electionId}>{t('deadline.revealingLink')}</StyledLink>
          </StyledText>
        )
    }
  }

  return (
    <ElementWrapper>
      <ListItem>
        <TopElementsWrapper>
          <StyledTriangle deadlineTime={remainingCalculation} />{' '}
          <StyledClosedButton onClick={() => hideForStorage(electionId)} />
        </TopElementsWrapper>
        <ContentWrapper>
          <TimeWrapper>
            <Subscription>
              {t('deadline.remainingTime')} {<DurationValue value={timeRemaining} />}
            </Subscription>
            <StyledBadge>{t('deadline.election')}</StyledBadge>
          </TimeWrapper>
          <StyledText>{copyMessage()}</StyledText>
        </ContentWrapper>
      </ListItem>
    </ElementWrapper>
  )
})
