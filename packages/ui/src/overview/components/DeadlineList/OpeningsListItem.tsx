
import { ListItem } from '@/common/components/List'
import { Subscription } from '@/common/components/typography/Subscription'
import { useToggle } from '@/common/hooks/useToggle'
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
import { useTranslation } from 'react-i18next'
import React from 'react'

export interface OpeningsListItemProps {
  title: string
  type: 'openings' | 'upcoming'
  groupName: string
}

export const OpeningsListItem = ({ title, type, groupName }: OpeningsListItemProps) => {
  const { t } = useTranslation('overview')
  const [hideElement, setHideElement] = useToggle(false)

  if (hideElement) {
    return null
  }

  return (
    <ElementWrapper>
      <ListItem>
        <TopElementsWrapper>
          <StyledTriangle /> <StyledClosedButton onClick={setHideElement} />
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
