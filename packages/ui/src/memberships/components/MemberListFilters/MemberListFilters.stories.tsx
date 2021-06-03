import { Meta, Story } from '@storybook/react'
import React, { useRef } from 'react'

import { FilterPageHeader } from '@/common/components/forms/FilterBox'
import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { MemberRole } from '@/memberships/types'

import { MemberListFilters, MemberListFiltersProps } from '.'

const Roles: MemberRole[] = [
  { groupName: 'Member Role', isLeader: false },
  { groupName: 'Forum', isLeader: true },
]

export default {
  title: 'Member/MemberListFilters',
  component: MemberListFilters,
  argTypes: {
    onApply: { action: 'Apply' },
  },
} as Meta

export const Default: Story<Pick<MemberListFiltersProps, 'onApply'>> = (props) => {
  const searchSlot = useRef<HTMLDivElement>(null)

  return (
    <TemplateBlock>
      <FilterPageHeader ref={searchSlot} title="Members" />
      <MemberListFilters {...props} searchSlot={searchSlot} memberCount={648} roles={Roles} />
    </TemplateBlock>
  )
}
Default.args = {}
