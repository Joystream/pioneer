import { Meta, Story } from '@storybook/react'
import React, { useRef } from 'react'

import { FilterPageHeader } from '@/common/components/forms/FilterBox'
import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { MembershipContextProvider } from '@/memberships/providers/membership/provider'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { MemberListFilters, MemberListFiltersProps } from '.'

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
    <MockApolloProvider workingGroups>
      <MembershipContextProvider>
        <TemplateBlock>
          <FilterPageHeader ref={searchSlot} title="Members" />
          <MemberListFilters {...props} memberCount={648} />
        </TemplateBlock>
      </MembershipContextProvider>
    </MockApolloProvider>
  )
}
Default.args = {}
