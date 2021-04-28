import React, { useCallback } from 'react'

import { MemberInfo } from '..'
import { EditSymbol } from '../../../common/components/icons/symbols'
import { useModal } from '../../../common/hooks/useModal'
import { Member } from '../../types'
import { EditMembershipButton } from '../EditMembershipButton'
import { MemberModalCall } from '../MemberProfile'
import { MemberRoles } from '../MemberRoles'
import { TransferInviteButton } from '../TransferInviteButton'

import { CountInfo, MemberColumn, MemberControls, MemberItemWrap, MemberRolesColumn } from './Fileds'

export const MyMemberListItem = ({ member }: { member: Member }) => {
  const { showModal } = useModal()

  const showMemberModal = useCallback(() => {
    showModal<MemberModalCall>({ modal: 'Member', data: { id: member.id } })
  }, [member.id])

  return (
    <MemberItemWrap kind="MyMember">
      <MemberColumn>
        <MemberInfo member={member} onClick={showMemberModal} showId />
      </MemberColumn>

      <MemberRolesColumn>
        <MemberRoles wrapable member={member} size="l" />
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
