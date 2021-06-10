import React from 'react'
import styled from 'styled-components'

import { FounderMemberIcon, VerifiedMemberIcon, LeaderMemberIcon } from '@/common/components/icons'
import { Colors } from '@/common/constants'

import {
  DarkTooltipInnerItemProps,
  DefaultTooltip,
  DefaultTooltipProps,
  Tooltip,
  TooltipComponent,
} from '../../common/components/Tooltip'
import { Member } from '../types'

import { Avatar } from './Avatar'
import {
  MemberHandle,
  MemberHead,
  MemberIcons,
  MemberId,
  MemberInfoWrap,
  MemberPhoto,
  MemberPhotoContainer,
} from './components'
import { MemberRoles, MemberStatusTooltip } from './MemberRoles'
import { MemberInfoWrapProps } from './types'

interface MemberInfoContainerProps {
  isLeader?: boolean
  member: Member
  onClick?: () => void
  size?: 'm' | 'l'
  className?: string
  maxRoles?: number
}

export type MemberInfoProps = MemberInfoContainerProps & MemberInfoWrapProps & { showGroup?: boolean }

export const MemberInfo = React.memo(
  ({
    member,
    onClick,
    isOnDark,
    showId,
    showGroup = true,
    memberSize,
    size,
    className,
    maxRoles,
    isLeader,
  }: MemberInfoProps) => {
    return (
      <MemberInfoWrap isOnDark={isOnDark} memberSize={memberSize} className={className}>
        <MemberPhoto>
          <MemberPhotoContainer>
            <Avatar avatarUri={member.avatar} />
            {isLeader && (
              <Tooltip tooltipText="This member is a leader">
                <AvatarStarTooltipContainer>
                  <LeaderMemberIcon />
                </AvatarStarTooltipContainer>
              </Tooltip>
            )}
          </MemberPhotoContainer>
        </MemberPhoto>
        <MemberHead>
          <MemberHandle onClick={onClick}>{member.handle}</MemberHandle>
          <MemberIcons>
            {member.isVerified && (
              <Tooltip tooltipText="This member is verified">
                <MemberStatusTooltip isOnDark={isOnDark} className={isOnDark ? 'tooltipondark' : 'tooltiponlight'}>
                  <VerifiedMemberIcon />
                </MemberStatusTooltip>
              </Tooltip>
            )}
            {(member as any)?.isFounder && (
              <Tooltip tooltipText="This member is verified">
                <MemberStatusTooltip isOnDark={isOnDark} className={isOnDark ? 'tooltipondark' : 'tooltiponlight'}>
                  <FounderMemberIcon />
                </MemberStatusTooltip>
              </Tooltip>
            )}
          </MemberIcons>
        </MemberHead>
        {showGroup && !showId && <MemberRoles roles={member.roles} size={size} max={maxRoles} />}
        {showId && <MemberId>Worker ID: {member.id}</MemberId>}
      </MemberInfoWrap>
    )
  }
)

export const AvatarStarTooltipContainer = styled(DefaultTooltip)<DefaultTooltipProps & DarkTooltipInnerItemProps>`
  color: ${Colors.White};
  border-color: ${Colors.Blue[500]};
  background-color: ${Colors.Blue[500]};

  ${TooltipComponent}:hover > &,
  ${TooltipComponent}:focus > & {
    color: ${Colors.White};
    border-color: ${Colors.Blue[400]};
    background-color: ${Colors.Blue[400]};
  }
`
