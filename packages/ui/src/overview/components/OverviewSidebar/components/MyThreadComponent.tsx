import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { CountBadge } from '@/common/components/CountBadge'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { ForumIcon } from '@/common/components/page/Sidebar/LinksIcons'
import { TextBig, TextSmall } from '@/common/components/typography'
import { Colors, Shadows } from '@/common/constants'
import { OverviewSidebarThread } from '@/overview/types/Overview'

export const MyThreadComponent = ({ title, numberOfPosts }: OverviewSidebarThread) => {
  const { t } = useTranslation('overview')
  return (
    <Tile>
      <TextBig bold value truncate>
        {title}
      </TextBig>
      <StyledColumnBlock gap={5}>
        <BadgeStatus>{t('sidebar.thread.new')}</BadgeStatus>
        <ForumIcon />
        <TextSmall light>{t('sidebar.thread.answers')}</TextSmall>
        <CountBadge count={numberOfPosts} />
      </StyledColumnBlock>
    </Tile>
  )
}

const Tile = styled.div`
  min-width: 216px;
  max-width: 216px;
  padding: 20px;
  height: 114px;
  box-shadow: ${Shadows.light};
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledColumnBlock = styled(ColumnGapBlock)`
  align-items: center;
  > *:first-child {
    margin-right: 5px;
  }

  svg {
    color: ${Colors.Black[400]};
    width: 15px;
  }
`
