import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { Member } from '@/memberships/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { SmallMemberSelect } from './SmallMemberSelect'

export default {
  title: 'Member/SmallMemberSelect',
  component: SmallMemberSelect,
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
      <SmallMemberSelect value={value} onChange={change} />
    </MockApolloProvider>
  )
}
