import React from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { CountBadge } from '@/common/components/CountBadge'
import { JoystreamLogo } from '@/common/components/icons/JoystreamLogo'
import { NotificationIcon } from '@/common/components/icons/NotificationIcon'
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
      return <StyledCouncilIcon />
    case 'Content Directory':
      return <Content />
    default:
      return <JoystreamLogo />
  }
}

interface Props extends Omit<OverviewSidebarRole, 'reward'> {
  pendingProposals?: number
  reward?: number
}

export const MyRoleTile = ({ role, reward, isLead, pendingProposals }: Props) => {
  return (
    <Tile>
      {isLead && <StyledBadge>LEAD</StyledBadge>}
      <StyledNotificationIcon />
      {iconMapper(role)}
      <TextBig truncate bold>
        {role}
      </TextBig>
      {!pendingProposals ? (
        <TextMedium>
          Reward: <TokenValue value={reward} size="l" />
        </TextMedium>
      ) : (
        <TextMedium light>
          Pending proposals <CountBadge count={pendingProposals} />
        </TextMedium>
      )}
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

const StyledNotificationIcon = styled(NotificationIcon)`
  position: absolute;
  inset: 10px 10px auto auto;
  cursor: pointer;
`

const StyledCouncilIcon = styled(Council)`
  margin: 17px 0;
`
