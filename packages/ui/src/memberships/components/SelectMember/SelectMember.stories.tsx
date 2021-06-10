import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { InputComponent } from '@/common/components/forms'
import { Member } from '@/memberships/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { SelectMember } from '.'

export default {
  title: 'Member/SelectMember',
  component: SelectMember,
} as Meta

export const Default: Story = () => {
  const [selected, setSelected] = useState<Member>()

  return (
    <MockApolloProvider members>
      <InputComponent
        label="Member select"
        tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
        required
        inputSize="l"
      >
        <SelectMember selected={selected} onChange={setSelected} />
      </InputComponent>
    </MockApolloProvider>
  )
}
