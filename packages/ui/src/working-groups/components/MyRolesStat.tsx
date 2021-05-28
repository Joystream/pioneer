import React from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { StatisticItem } from '@/common/components/statistics'
import { useModal } from '@/common/hooks/useModal'
import { MemberRoles } from '@/memberships/components'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

export const MyRolesStat = () => {
  const { active } = useMyMemberships()
  const { showModal } = useModal()

  const onClick = () => showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })

  return (
    <StatisticItem title="My Roles">
      {active ? (
        <MemberRoles roles={active.roles} size="l" max={6} />
      ) : (
        <ButtonPrimary size="small" onClick={onClick}>
          Select membership
        </ButtonPrimary>
      )}
    </StatisticItem>
  )
}
