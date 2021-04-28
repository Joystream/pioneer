import React from 'react'

import { FounderMemberIcon } from '../../common/components/icons/FounderMemberIcon'
import { LeaderMemberIcon } from '../../common/components/icons/LeaderMemberIcon'
import { VerifiedMemberIcon } from '../../common/components/icons/VerifiedMemberIcon'
import { Member } from '../types'

import { Avatar } from './Avatar'
import {
  MemberHead,
  MemberHandle,
  MemberIcons,
  MemberId,
  MemberInfoWrap,
  MemberPhoto,
  MemberPhotoContainer,
  MemberStatusHelp,
  AvatarMemberLabel,
} from './components'
import { MemberRoles } from './MemberRoles'
import { MemberInfoWrapProps } from './types'

interface MemberInfoContainerProps {
  isLeader?: Member
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
            {isLeader && <AvatarMemberLabel icon={<LeaderMemberIcon />} helperText="This member is a leader" />}
          </MemberPhotoContainer>
        </MemberPhoto>
        <MemberHead>
          <MemberHandle onClick={onClick}>{member.handle}</MemberHandle>
          <MemberIcons>
            {member.isVerified && <MemberStatusHelp icon={<VerifiedMemberIcon />} helperText="Lorem fishy" />}
            {(member as any)?.isFounder && <MemberStatusHelp icon={<FounderMemberIcon />} helperText="Lorem fishy" />}
          </MemberIcons>
        </MemberHead>
        {showGroup && !showId && <MemberRoles member={member} size={size} max={maxRoles} />}
        {showId && <MemberId>Worker ID: {member.id}</MemberId>}
      </MemberInfoWrap>
    )
  }
)
