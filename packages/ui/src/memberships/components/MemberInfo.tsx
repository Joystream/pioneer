import React from 'react'

import { FounderMemberIcon, VerifiedMemberIcon } from '../../common/components/icons'
import { LeaderMemberIcon } from '../../common/components/icons/LeaderMemberIcon'
import { AvatarStarTooltipContainer, MemberStatusTooltip, Tooltip } from '../../common/components/Tooltip'
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
import { MemberRoles } from './MemberRoles'
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
                <MemberStatusTooltip isOnDark={isOnDark} className={isOnDark ? 'TooltipOnDark' : 'TooltipOnLight'}>
                  <VerifiedMemberIcon />
                </MemberStatusTooltip>
              </Tooltip>
            )}
            {(member as any)?.isFounder && (
              <Tooltip tooltipText="This member is verified">
                <MemberStatusTooltip isOnDark={isOnDark} className={isOnDark ? 'TooltipOnDark' : 'TooltipOnLight'}>
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
