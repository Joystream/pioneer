import React from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { JoystreamLogo } from '@/common/components/icons/JoystreamLogo'
import { Council, Forum, Storage, Membership, Content } from '@/common/components/icons/workingGroup'
import { TextBig, TextMedium, TokenValue } from '@/common/components/typography'
import { Shadows } from '@/common/constants'
import { OverviewSidebarRole } from '@/overview/types/Overview'

const iconMapper = (group: string) => {
  switch (group) {
    case 'Forum':
      return <Forum />
    case 'Storage':
      return <Storage />
    case 'Membership':
      return <Membership />
    case 'Council':
      return <Council />
    case 'Content Directory':
      return <Content />
    default:
      return <JoystreamLogo />
  }
}

export const MyRoleTile = ({ role, reward, isLead }: OverviewSidebarRole) => {
  return (
    <Tile>
      {isLead && <StyledBadge>LEAD</StyledBadge>}
      {iconMapper(role)}
      <TextBig truncate bold>
        {role}
      </TextBig>
      <TextMedium>
        Reward: <TokenValue value={reward} size="l" />
      </TextMedium>
    </Tile>
  )
}

const Tile = styled.div`
  min-width: 216px;
  max-width: 216px;
  width: fit-content;
  padding: 10px;
  height: 180px;
  box-shadow: ${Shadows.light};
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 5px;
  position: relative;
`

const StyledBadge = styled(BadgeStatus)`
  position: absolute;
  inset: 10px auto auto 10px;
`
