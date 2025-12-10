import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { ValidatorInfo, ValidatorInfoProps } from '@/validators/components/ValidatorInfo'

export default {
  title: 'Validators/ValidatorInfo',
  component: ValidatorInfo,
} as Meta

const Template: Story<ValidatorInfoProps> = (args) => (
  <MockApolloProvider members>
    <div style={{ padding: '20px', width: '400px' }}>
      <ValidatorInfo {...args} />
    </div>
  </MockApolloProvider>
)

export const WithMember = Template.bind({})
WithMember.args = {
  address: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
  member: {
    id: '0',
    handle: 'validator_alice',
    name: 'Alice Validator',
    avatar: undefined,
    externalResources: [
      { source: 'TWITTER', value: 'alice_validator' },
      { source: 'TELEGRAM', value: '@alice_validator' },
      { source: 'DISCORD', value: 'alice#1234' },
    ],
  } as any,
  size: 's',
}

export const WithoutMember = Template.bind({})
WithoutMember.args = {
  address: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
  size: 's',
}

export const LargeSize = Template.bind({})
LargeSize.args = {
  address: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
  member: {
    id: '0',
    handle: 'validator_bob',
    name: 'Bob Validator',
    avatar: undefined,
    externalResources: [{ source: 'TWITTER', value: 'bob_validator' }],
  } as any,
  size: 'l',
}

export const WithTwitterOnly = Template.bind({})
WithTwitterOnly.args = {
  address: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
  member: {
    id: '0',
    handle: 'validator_charlie',
    name: 'Charlie Validator',
    avatar: undefined,
    externalResources: [{ source: 'TWITTER', value: 'charlie_validator' }],
  } as any,
  size: 's',
}
