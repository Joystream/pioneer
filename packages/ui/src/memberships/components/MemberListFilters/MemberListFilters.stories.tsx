import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MemberRolesList } from '../MemberRoles'

import { MemberListFilters } from '.'

export default {
  title: 'Member/MemberListFilters',
  component: MemberListFilters,
} as Meta

type MemberListFiltersStory = Story<Parameters<typeof MemberListFilters>[0]>
export const Default: MemberListFiltersStory = (props) => <MemberListFilters {...props} />
Default.args = {
  roles: Object.fromEntries(MemberRolesList.map(({ abbreviation }) => [abbreviation, abbreviation])),
  onApply: (filters) => {
    alert(JSON.stringify(filters, null, 2))
  },
}
