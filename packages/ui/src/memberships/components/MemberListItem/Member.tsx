import React from 'react'

import { AccountLocks } from '@/accounts/components/AccountLocks'
import { useBalance } from '@/accounts/hooks/useBalance'
import { TokenValue } from '@/common/components/typography/TokenValue'
import { useMemberRowWorkDetails } from '@/memberships/hooks/useMemberRowWorkDetails'
import { useShowMemberModal } from '@/memberships/hooks/useShowMemberModal'

import { MemberInfo, MemberCreated } from '..'
import { Member, MemberWithDetails } from '../../types'
import { MemberRoles } from '../MemberRoles'

import { CountInfo, MemberColumn, MemberItemWrap, MemberModalTrigger, MemberRolesColumn } from './Fileds'

export const MemberListItem = ({ member }: { member: Member & Partial<Pick<MemberWithDetails, 'entry'>> }) => {
  const balance = useBalance(member.controllerAccount)
  const { slashed, terminated } = useMemberRowWorkDetails(member)
  const showMemberModal = useShowMemberModal(member.id)

  return (
    <MemberItemWrap kind="Member">
      <MemberModalTrigger onClick={showMemberModal} />

      <MemberColumn>
        <MemberInfo member={member} hideGroup withCouncil withMemberId />
      </MemberColumn>

      <MemberRolesColumn>
        <MemberRoles wrapable roles={member.roles} size="l" />
      </MemberRolesColumn>

      <MemberColumn>
        <MemberCreated member={member} />
      </MemberColumn>

      <MemberColumn>Referrer</MemberColumn>

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
