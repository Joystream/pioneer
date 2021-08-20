import React from 'react'

import { MemberInfo } from '..'
import { EditSymbol } from '../../../common/components/icons/symbols'
import { Member } from '../../types'
import { EditMembershipButton } from '../EditMembershipButton'
import { MemberRoles } from '../MemberRoles'
import { TransferInviteButton } from '../TransferInviteButton'

import { CountInfo, MemberColumn, MemberControls, MemberItemWrap, MemberRolesColumn } from './Fileds'

export const MyMemberListItem = ({ member }: { member: Member }) => {
  return (
    <MemberItemWrap kind="MyMember">
      <MemberColumn>
        <MemberInfo member={member} showId />
      </MemberColumn>

      <MemberRolesColumn>
        <MemberRoles wrapable roles={member.roles} size="l" />
      </MemberRolesColumn>
      <MemberColumn>
        <CountInfo count={0} times />
      </MemberColumn>
      <MemberColumn>
        <CountInfo count={0} times />
      </MemberColumn>

      <MemberColumn>
        <CountInfo count={member.inviteCount} />
        <TransferInviteButton member={member} />
      </MemberColumn>
      <MemberColumn>
        <CountInfo count={0} />
      </MemberColumn>
      <MemberControls>
        <EditMembershipButton member={member} size="small">
          <EditSymbol />
        </EditMembershipButton>
      </MemberControls>
    </MemberItemWrap>
  )
}
