import { Meta, Story } from '@storybook/react'
import React, { useRef } from 'react'

import { FilterPageHeader } from '@/common/components/forms/FilterBox'
import { memberRoleTitle } from '@/memberships/helpers'
import { MemberRole } from '@/memberships/types'

import { MemberListFilters } from '.'

const Roles = Object.fromEntries(
  [
    { groupName: 'Member Role', isLeader: false },
    { groupName: 'Forum', isLeader: true },
    { groupName: 'Forum', isLeader: false },
  ].map((role: MemberRole) => [memberRoleTitle(role), role])
)

export default {
  title: 'Member/MemberListFilters',
  component: MemberListFilters,
} as Meta

export const Default: Story = () => {
  const searchSlot = useRef<HTMLDivElement>(null)

  const display = (filters: any) =>
    setTimeout(() => {
      alert(JSON.stringify(filters, null, 2))
    }, 100)

  return (
    <>
      <FilterPageHeader ref={searchSlot} title="Members" />
      <MemberListFilters searchSlot={searchSlot} roles={Roles} onApply={display} />
    </>
  )
}
Default.args = {}
