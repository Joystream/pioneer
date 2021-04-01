import React from 'react'
import { BaseMember } from '../../common/types'
import { Avatar } from '../Avatar'
import { FounderMemberIcon } from '../icons/FounderMemberIcon'
import { VerifiedMemberIcon } from '../icons/VerifiedMemberIcon'
import {
  MemberHandle,
  MemberIcons,
  MemberId,
  MemberInfoWrap,
  MemberPhoto,
  MemberRoleHelp,
  MemberRoles,
  MemberStatusHelp,
} from './components'
import { MemberInfoWrapProps } from './types'

interface MemberInfoContainerProps {
  member: BaseMember
  onClick?: () => void
  size?: 'm' | 'l'
  className?: string
}

type MemberInfoProps = MemberInfoContainerProps & MemberInfoWrapProps

export const MemberInfo = React.memo(
  ({ member, onClick, isOnDark, showId, memberSize, size, className }: MemberInfoProps) => {
    return (
      <MemberInfoWrap isOnDark={isOnDark} memberSize={memberSize} className={className}>
        <MemberPhoto>
          <Avatar avatarUri={member.avatarUri} />
        </MemberPhoto>
        <MemberHandle onClick={onClick}>{member.handle}</MemberHandle>
        <MemberIcons>
          {member.isVerified && <MemberStatusHelp icon={<VerifiedMemberIcon />} helperText="Lorem fishy" />}
          {false && <MemberStatusHelp icon={<FounderMemberIcon />} helperText="Lorem fishy" />}
        </MemberIcons>
        {!showId && (
          <MemberRoles>
            <MemberRoleHelp memberRole="LI" helperText="Lorem fishy" size={size} />
          </MemberRoles>
        )}
        {showId && <MemberId size={3}>Worker ID: {member.id}</MemberId>}
      </MemberInfoWrap>
    )
  }
)
