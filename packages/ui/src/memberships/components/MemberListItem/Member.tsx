import React from 'react'

import { AccountLocks } from '@/accounts/components/AccountLocks'
import { useBalance } from '@/accounts/hooks/useBalance'
import { TokenValue } from '@/common/components/typography/TokenValue'
import { MemberCreated } from '@/memberships/components/MemberListItem/components/MemberCreated'
import { MemberReferrer } from '@/memberships/components/MemberListItem/components/MemberReferrer'
import { useMemberRowWorkDetails } from '@/memberships/hooks/useMemberRowWorkDetails'
import { useShowMemberModal } from '@/memberships/hooks/useShowMemberModal'
import { MemberWithDetails } from '@/memberships/types'

import { MemberInfo } from '..'
import { MemberRoles } from '../MemberRoles'

import { CountInfo, MemberColumn, MemberItemWrap, MemberModalTrigger, MemberRolesColumn } from './Fields'

export const MemberListItem = ({ member }: { member: MemberWithDetails }) => {
  const balance = useBalance(member.controllerAccount)
  const { slashed, terminated } = useMemberRowWorkDetails(member)
  const showMemberModal = useShowMemberModal(member.id)

  return (
    <MemberItemWrap kind="Member">
      <MemberModalTrigger onClick={showMemberModal} />

      <MemberColumn>
        <MemberInfo member={member} hideGroup withID />
      </MemberColumn>

      <MemberRolesColumn>
        <MemberRoles wrapable roles={member.roles} size="l" />
      </MemberRolesColumn>

      <MemberColumn>
        <MemberCreated member={member} />
      </MemberColumn>

      <MemberColumn>
        <MemberReferrer member={member} />
      </MemberColumn>

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
