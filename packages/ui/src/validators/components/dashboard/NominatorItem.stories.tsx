import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { NominatorAccountItem, AccountItemDataProps } from '@/validators/components/dashboard/NominatorItem'

export default {
  title: 'Validators/Dashboard/NominatorItem',
  component: NominatorAccountItem,
} as Meta

const Template: Story<AccountItemDataProps> = (args) => (
  <MockApolloProvider>
    <div style={{ padding: '20px', width: '800px' }}>
      <NominatorAccountItem {...args} />
    </div>
  </MockApolloProvider>
)

const mockAccount = {
  address: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
  name: 'Nominator Account',
  source: 'polkadot-js',
}

export const NominatingMultipleValidators = Template.bind({})
NominatingMultipleValidators.args = {
  account: mockAccount,
}

export const SingleValidator = Template.bind({})
SingleValidator.args = {
  account: {
    ...mockAccount,
    name: 'Single Nominator',
  },
}

export const NotNominating = Template.bind({})
NotNominating.args = {
  account: {
    ...mockAccount,
    name: 'Inactive Nominator',
  },
}

export const LongAccountName = Template.bind({})
LongAccountName.args = {
  account: {
    ...mockAccount,
    name: 'Very Long Nominator Account Name That Should Be Truncated',
  },
}
