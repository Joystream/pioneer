import React from 'react'

import { AccountLocks } from '@/accounts/components/AccountLocks'
import { useBalance } from '@/accounts/hooks/useBalance'
import { CheckboxIcon, CrossIcon } from '@/common/components/icons'
import { TokenValue } from '@/common/components/typography/TokenValue'
import { useIsCouncilMember } from '@/memberships/hooks/useIsCouncilMember'
import { useMemberRowWorkDetails } from '@/memberships/hooks/useMemberRowWorkDetails'
import { useShowMemberModal } from '@/memberships/hooks/useShowMemberModal'

import { MemberInfo } from '..'
import { Member } from '../../types'
import { MemberRoles } from '../MemberRoles'

import { CountInfo, Info, MemberColumn, MemberItemWrap, MemberModalTrigger, MemberRolesColumn } from './Fileds'

export const MemberListItem = ({ member }: { member: Member }) => {
  const balance = useBalance(member.controllerAccount)
  const { slashed, terminated } = useMemberRowWorkDetails(member)
  const isCouncilMember = useIsCouncilMember(member)
  const showMemberModal = useShowMemberModal(member.id)

  return (
    <MemberItemWrap kind="Member">
      <MemberModalTrigger onClick={showMemberModal} />
      <MemberColumn>
        <Info>#{member.id}</Info>
      </MemberColumn>

      <MemberColumn>
        <MemberInfo member={member} hideGroup />
      </MemberColumn>

      <MemberColumn>
        <Info>{isCouncilMember ? <CheckboxIcon /> : <CrossIcon />}</Info>
      </MemberColumn>

      <MemberRolesColumn>
        <MemberRoles wrapable roles={member.roles} size="l" />
      </MemberRolesColumn>
      <MemberColumn>
        <CountInfo count={slashed} />
      </MemberColumn>
      <MemberColumn>
        <CountInfo count={terminated} />
      </MemberColumn>

      <MemberColumn>
        <TokenValue value={balance?.total} />
      </MemberColumn>
      <MemberColumn>
        <TokenValue value={balance?.locked} />
        <AccountLocks locks={balance?.locks} />
      </MemberColumn>
    </MemberItemWrap>
  )
}
