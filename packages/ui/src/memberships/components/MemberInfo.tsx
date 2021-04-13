import React from 'react'

import { FounderMemberIcon } from '../../common/components/icons/FounderMemberIcon'
import { VerifiedMemberIcon } from '../../common/components/icons/VerifiedMemberIcon'
import { MemberInternal } from '../types'

import { Avatar } from './Avatar'
import { MemberHandle, MemberIcons, MemberId, MemberInfoWrap, MemberPhoto, MemberStatusHelp } from './components'
import { MemberRoles } from './MemberRoles'
import { MemberInfoWrapProps } from './types'

interface MemberInfoContainerProps {
  member: MemberInternal
  onClick?: () => void
  size?: 'm' | 'l'
  className?: string
  maxRoles?: number
}

export type MemberInfoProps = MemberInfoContainerProps & MemberInfoWrapProps

export const MemberInfo = React.memo(
  ({ member, onClick, isOnDark, showId, memberSize, size, className, maxRoles }: MemberInfoProps) => {
    return (
      <MemberInfoWrap isOnDark={isOnDark} memberSize={memberSize} className={className}>
        <MemberPhoto>
          <Avatar avatarUri={member.avatar} />
        </MemberPhoto>
        <MemberHandle onClick={onClick}>{member.handle}</MemberHandle>
        <MemberIcons>
          {member.isVerified && <MemberStatusHelp icon={<VerifiedMemberIcon />} helperText="Lorem fishy" />}
          {(member as any)?.isFounder && <MemberStatusHelp icon={<FounderMemberIcon />} helperText="Lorem fishy" />}
        </MemberIcons>
        {!showId && <MemberRoles member={member} size={size} max={maxRoles} />}
        {showId && <MemberId>Worker ID: {member.id}</MemberId>}
      </MemberInfoWrap>
    )
  }
)
