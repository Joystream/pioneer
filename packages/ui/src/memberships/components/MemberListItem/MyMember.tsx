import React, { useCallback } from 'react'
import styled from 'styled-components'

import { useModal } from '@/common/hooks/useModal'

import { MemberInfo } from '..'
import { EditSymbol } from '../../../common/components/icons/symbols'
import { Member } from '../../types'
import { EditMembershipButton } from '../EditMembershipButton'
import { MemberModalCall } from '../MemberProfile'
import { MemberRoles } from '../MemberRoles'
import { TransferInviteButton } from '../TransferInviteButton'

import { CountInfo, MemberColumn, MemberControls, MemberItemWrap, MemberRolesColumn } from './Fileds'

export const MyMemberListItem = ({ member }: { member: Member }) => {
  const { showModal } = useModal()
  const showMemberModal = useCallback(
    (event?: React.MouseEvent<HTMLElement>) => {
      event?.stopPropagation()
      member && showModal<MemberModalCall>({ modal: 'Member', data: { id: member.id } })
    },
    [member?.id]
  )
  return (
    <MemberItemWrap kind="MyMember">
      <MemberModalTrigger onClick={showMemberModal} />
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

const MemberModalTrigger = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`
