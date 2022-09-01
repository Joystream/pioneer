import React from 'react'

import { EditSymbol } from '@/common/components/icons/symbols'
import { useMemberActions } from '@/memberships/hooks/useMemberActions'
import { useShowMemberModal } from '@/memberships/hooks/useShowMemberModal'

import { MemberInfo } from '..'
import { Member } from '../../types'
import { EditMembershipButton } from '../EditMembershipButton'
import { MemberRoles } from '../MemberRoles'
import { TransferInviteButton } from '../TransferInviteButton'

import {
  CountInfo,
  MemberColumn,
  MemberControls,
  MemberItemWrap,
  MemberModalTrigger,
  MemberRolesColumn,
} from './Fields'

export const MyMemberListItem = ({ member }: { member: Member }) => {
  const { slashed, terminated, invited } = useMemberActions(member)
  const showMemberModal = useShowMemberModal(member.id)
  return (
    <MemberItemWrap kind="MyMember">
      <MemberModalTrigger onClick={showMemberModal} />
      <MemberColumn>
        <MemberInfo member={member} showIdOrText />
      </MemberColumn>

      <MemberRolesColumn>
        <MemberRoles wrapable roles={member.roles} size="l" />
      </MemberRolesColumn>
      <MemberColumn>
        <CountInfo count={slashed} times />
      </MemberColumn>
      <MemberColumn>
        <CountInfo count={terminated} times />
      </MemberColumn>

      <MemberColumn>
        <CountInfo count={member.inviteCount} />
        <TransferInviteButton member={member} />
      </MemberColumn>
      <MemberColumn>
        <CountInfo count={invited} />
      </MemberColumn>
      <MemberControls>
        <EditMembershipButton member={member} size="small">
          <EditSymbol />
        </EditMembershipButton>
      </MemberControls>
    </MemberItemWrap>
  )
}
