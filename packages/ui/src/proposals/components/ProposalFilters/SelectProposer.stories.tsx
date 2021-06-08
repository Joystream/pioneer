import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { MembershipContextProvider } from '@/memberships/providers/membership/provider'
import { Member } from '@/memberships/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { SelectProposer } from './SelectProposer'

export default {
  title: 'Proposals/SelectProposer',
  component: SelectProposer,
  argTypes: {
    onChange: { action: 'changed' },
  },
} as Meta

export const Default: Story = ({ onChange }) => {
  const [value, setValue] = useState<Member | null>(null)

  return (
    <MockApolloProvider>
      <MembershipContextProvider>
        <SelectProposer
          value={value}
          onChange={(value) => {
            setValue(value)
            onChange(value)
          }}
        />
      </MembershipContextProvider>
    </MockApolloProvider>
  )
}
