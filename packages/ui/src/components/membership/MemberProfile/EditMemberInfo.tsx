import React from 'react'
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
import { EditProfileProps, WithMember } from './types'

type Props = MemberInfoWrapProps & WithMember & EditProfileProps

export const EditMemberInfo = React.memo(({ member, isOnDark, showId, memberSize, formData, dispatch }: Props) => {
  return (
    <MemberInfoWrap isOnDark={isOnDark} memberSize={memberSize}>
      <MemberPhoto>
        <Avatar avatarURI={member.avatarURI} />
      </MemberPhoto>
      <MemberHandle>
        <TextInput
          type="text"
          value={formData.handle || ''}
          onChange={(event) => dispatch({ value: event.target.value, type: 'handle' })}
        />
        <TextInput
          type="text"
          value={formData.name || ''}
          onChange={(event) => dispatch({ value: event.target.value, type: 'name' })}
        />
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
