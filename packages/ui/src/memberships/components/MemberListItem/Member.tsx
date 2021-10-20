import React from 'react'

import { CheckboxIcon, CrossIcon } from '@/common/components/icons'
import { TokenValue } from '@/common/components/typography/TokenValue'
import { useIsCouncilMember } from '@/memberships/hooks/useIsCouncilMember'
import { useShowMemberModal } from '@/memberships/hooks/useShowMemberModal'

import { MemberInfo } from '..'
import { Member } from '../../types'
import { MemberRoles } from '../MemberRoles'

import { CountInfo, Info, MemberColumn, MemberItemWrap, MemberModalTrigger, MemberRolesColumn } from './Fileds'

export const MemberListItem = ({ member }: { member: Member }) => {
  const isCouncilMember = useIsCouncilMember(member)
  const showMemberModal = useShowMemberModal(member.id)

  return (
    <MemberItemWrap kind="Member">
      <MemberModalTrigger onClick={showMemberModal} />
      <MemberColumn>
        <Info>#{member.id}</Info>
      </MemberColumn>

      <MemberColumn>
        <MemberInfo member={member} showGroup={false} />
      </MemberColumn>

      <MemberColumn>
        <Info>{isCouncilMember ? <CheckboxIcon /> : <CrossIcon />}</Info>
      </MemberColumn>

      <MemberRolesColumn>
        <MemberRoles wrapable roles={member.roles} size="l" />
      </MemberRolesColumn>
      <MemberColumn>
        <CountInfo count={0} />
      </MemberColumn>
      <MemberColumn>
        <CountInfo count={0} />
      </MemberColumn>

      <MemberColumn>
        <TokenValue value={0} />
      </MemberColumn>
      <MemberColumn>
        <TokenValue value={0} />
      </MemberColumn>
    </MemberItemWrap>
  )
}
