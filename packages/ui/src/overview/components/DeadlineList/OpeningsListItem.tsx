import React from 'react'
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

export interface OpeningsListItemProps {
  title: string
  type: 'openings' | 'upcoming'
  groupName: string
  hideForStorage: (id: string) => void
  id: string
}

export const OpeningsListItem = ({ title, type, groupName, hideForStorage, id }: OpeningsListItemProps) => {
  const { t } = useTranslation('overview')

  return (
    <ElementWrapper>
      <ListItem>
        <TopElementsWrapper>
          <StyledTriangle /> <StyledClosedButton onClick={() => hideForStorage(id)} />
        </TopElementsWrapper>
        <ContentWrapper>
          <TimeWrapper>
            <Subscription>{t('deadline.startInFuture')}</Subscription>
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
  )
}
