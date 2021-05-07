import React from 'react'

import { Tooltip } from '@/common/components/Tooltip'

import { Member } from '../types'

import { Avatar } from './Avatar'
import {
  AvatarMemberLabel,
  MemberHandle,
  MemberHead,
  MemberIcons,
  MemberId,
  MemberInfoWrap,
  MemberPhoto,
  MemberPhotoContainer,
} from './components'
import { MemberRoles } from './MemberRoles'
import { FounderMemberTooltip, VerifiedMemberTooltip } from './MemberTopTooltips'
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
                <AvatarMemberLabel />
              </Tooltip>
            )}
          </MemberPhotoContainer>
        </MemberPhoto>
        <MemberHead>
          <MemberHandle onClick={onClick}>{member.handle}</MemberHandle>
          <MemberIcons>
            {member.isVerified && (
              <Tooltip tooltipText="Lorem fishy">
                <VerifiedMemberTooltip isOnDark={isOnDark} />
              </Tooltip>
            )}
            {(member as any)?.isFounder && (
              <Tooltip tooltipText="Lorem fishy">
                <FounderMemberTooltip isOnDark={isOnDark} />
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
