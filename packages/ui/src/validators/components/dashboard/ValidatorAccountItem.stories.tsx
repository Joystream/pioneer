import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { ValidatorAccountItem, AccountItemDataProps } from '@/validators/components/dashboard/ValidatorAccountItem'
import { AccountStakingRewards } from '@/validators/hooks/useAllAccountsStakingRewards'

export default {
  title: 'Validators/Dashboard/ValidatorAccountItem',
  component: ValidatorAccountItem,
} as Meta

const Template: Story<AccountItemDataProps> = (args) => (
  <MockApolloProvider>
    <div style={{ padding: '20px', width: '800px' }}>
      <ValidatorAccountItem {...args} />
    </div>
  </MockApolloProvider>
)

const mockAccount = {
  address: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
  name: 'Validator Account',
  source: 'polkadot-js',
}

const mockRewardsWithClaimable: AccountStakingRewards = {
  address: mockAccount.address,
  totalEarned: new BN('1000000000000'), // 1000 JOY
  claimable: new BN('500000000000'), // 500 JOY
  hasClaimable: true,
}

const mockRewardsNoClaimable: AccountStakingRewards = {
  address: mockAccount.address,
  totalEarned: new BN('1000000000000'), // 1000 JOY
  claimable: new BN('0'),
  hasClaimable: false,
}

export const WithClaimableRewards = Template.bind({})
WithClaimableRewards.args = {
  account: mockAccount,
  stakingRewards: mockRewardsWithClaimable,
}

export const NoClaimableRewards = Template.bind({})
NoClaimableRewards.args = {
  account: mockAccount,
  stakingRewards: mockRewardsNoClaimable,
}

export const WithoutRewardsData = Template.bind({})
WithoutRewardsData.args = {
  account: mockAccount,
}

export const HighRewards = Template.bind({})
HighRewards.args = {
  account: {
    ...mockAccount,
    name: 'High Reward Validator',
  },
  stakingRewards: {
    address: mockAccount.address,
    totalEarned: new BN('50000000000000'), // 50000 JOY
    claimable: new BN('10000000000000'), // 10000 JOY
    hasClaimable: true,
  },
}

export const SmallRewards = Template.bind({})
SmallRewards.args = {
  account: {
    ...mockAccount,
    name: 'Small Reward Validator',
  },
  stakingRewards: {
    address: mockAccount.address,
    totalEarned: new BN('10000000000'), // 10 JOY
    claimable: new BN('5000000000'), // 5 JOY
    hasClaimable: true,
  },
}
