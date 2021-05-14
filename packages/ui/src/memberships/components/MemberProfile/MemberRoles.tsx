import React from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useMemberRoles } from '@/memberships/hooks/useMemberRoles'

import { Member } from '../../types'

import { MemberRoleToggle } from './MemberRoleToggle'

export const MemberSideRoles = ({ member }: { member: Member }) => {
  const { workers, isLoading } = useMemberRoles(member.id)

  const displayRoles = () => {
    if (isLoading) {
      return <Loading />
    }

    const activeRoles = (workers && workers.filter((worker) => worker.status === 'WorkerStatusActive')) || []

    if (!activeRoles.length) {
      return <TextMedium light>This profile has no active roles.</TextMedium>
    }

    return activeRoles.map((role) => (
      <MemberRoleToggle key={role.group.name + role.membership.id} member={member} role={role} />
    ))
  }

  return <RolesDisplay gap={8}>{displayRoles()}</RolesDisplay>
}

const RolesDisplay = styled(RowGapBlock)`
  padding: 24px;
`
