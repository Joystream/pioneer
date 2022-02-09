import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ListItem } from '@/common/components/List'
import { Subscription } from '@/common/components/typography/Subscription'
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
} from '@/overview/components/DeadlineList/styles'

export interface OpeningsListProps {
  title: string
  type: 'openings' | 'upcoming'
  groupName: string
}

export const OpeningsList = ({ title, type, groupName }: OpeningsListProps) => {
  const { t } = useTranslation('overview')
  const [hideElement, setHideElement] = useState(false)

  const closeDeadline = () => {
    setHideElement(true)
  }

  return !hideElement ? (
    <ElementWrapper>
      <ListItem>
        <TopElementsWrapper>
          <StyledTriangle /> <StyledClosedButton onClick={closeDeadline} />
        </TopElementsWrapper>
        <ContentWrapper>
          <TimeWrapper>
            <Subscription>{t('deadline.remainingTime')}</Subscription>
            <StyledBadge>{type === 'openings' ? t('deadline.opening') : t('deadline.upcomingOpenings')}</StyledBadge>
          </TimeWrapper>
          {type === 'openings' ? (
            <StyledText>{t('deadline.upcomingOpeningsMessage')}</StyledText>
          ) : (
            <StyledText>
              {t('deadline.openingMessage', { openingName: title, workerGroupName: groupName })}{' '}
              <StyledLink href="#/working-groups/openings">{t('deadline.openingLink')}</StyledLink>
            </StyledText>
          )}
        </ContentWrapper>
      </ListItem>
    </ElementWrapper>
  ) : null
}
