import React, { Dispatch } from 'react'
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
import { Action, MemberUpdateForm } from './MemberProfile'

export type EditProfileProps = {
  isEdit?: boolean
  state: MemberUpdateForm
  dispatch: Dispatch<Action>
}

type Props = MemberInfoWrapProps & { member: BaseMember } & EditProfileProps

export const EditMemberInfo = React.memo(({ member, isOnDark, showId, memberSize, state, dispatch }: Props) => {
  return (
    <MemberInfoWrap isOnDark={isOnDark} memberSize={memberSize}>
      <MemberPhoto>
        <Avatar avatarURI={member.avatarURI} />
      </MemberPhoto>
      <MemberHandle>
        <TextInput
          type="text"
          value={state.handle || ''}
          onChange={(event) => dispatch({ value: event.target.value, type: 'handle' })}
        />
        <TextInput
          type="text"
          value={state.name || ''}
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
