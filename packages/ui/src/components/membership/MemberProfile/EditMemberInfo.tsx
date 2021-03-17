import React from 'react'
import { BaseMember } from '../../../common/types'
import { Avatar } from '../../Avatar'
import { TextInput } from '../../forms'
import { FounderMemberIcon } from '../../icons/FounderMemberIcon'
import { VerifiedMemberIcon } from '../../icons/VerifiedMemberIcon'
import {
  MemberHandle,
  MemberIcons,
  MemberId,
  MemberInfoWrap,
  MemberPhoto,
  MemberRole,
  MemberRoles,
} from '../components'
import { MemberInfoWrapProps } from '../types'

type Props = MemberInfoWrapProps & { member: BaseMember }

export const EditMemberInfo = React.memo(({ member, isOnDark, showId, memberSize }: Props) => {
  return (
    <MemberInfoWrap isOnDark={isOnDark} memberSize={memberSize}>
      <MemberPhoto>
        <Avatar avatarURI={member.avatarURI} />
      </MemberPhoto>
      <MemberHandle>
        <TextInput type="text" value={member.handle || ''} />
        <TextInput type="text" value={member.name || ''} />
      </MemberHandle>
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
