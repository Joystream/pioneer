import React from 'react'
import { BaseMember } from '../../common/types'
import { Avatar } from '../Avatar'
import { FounderMemberIcon } from '../icons/FounderMemberIcon'
import { VerifiedMemberIcon } from '../icons/VerifiedMemberIcon'
import { MemberHandle, MemberIcons, MemberId, MemberInfoWrap, MemberPhoto, MemberRole, MemberRoles } from './components'
import { MemberInfoWrapProps } from './types'

interface MemberInfoContainerProps {
  member: BaseMember
  onClick?: () => void
}

type MemberInfoProps = MemberInfoContainerProps & MemberInfoWrapProps

export const MemberInfo = React.memo(({ member, onClick, isOnDark, showId, memberSize }: MemberInfoProps) => {
  return (
    <MemberInfoWrap isOnDark={isOnDark} memberSize={memberSize}>
      <MemberPhoto>
        <Avatar avatarURI={member.avatarURI} />
      </MemberPhoto>
      <MemberHandle onClick={onClick}>{member.handle}</MemberHandle>
      <MemberIcons>
        {member.isVerified && <VerifiedMemberIcon />}
        {member.isFoundingMember && <FounderMemberIcon />}
      </MemberIcons>
      {!showId && (
        <MemberRoles>
          <MemberRole>LI</MemberRole>
        </MemberRoles>
      )}
      {showId && <MemberId size={3}>Worker ID: {member.id}</MemberId>}
    </MemberInfoWrap>
  )
})
