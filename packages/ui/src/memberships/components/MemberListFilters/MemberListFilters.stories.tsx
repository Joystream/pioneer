import { Meta, Story } from '@storybook/react'
import React, { useRef } from 'react'

import { FilterPageHeader } from '@/common/components/forms/FilterBox'

import { MemberListFilters } from '.'

const Roles = { AB: 'ab' }

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
