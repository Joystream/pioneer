import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

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
  const change = (value: Member | null) => {
    setValue(value)
    onChange(value)
  }

  return (
    <MockApolloProvider members>
      <SelectProposer value={value} onChange={change} />
    </MockApolloProvider>
  )
}
