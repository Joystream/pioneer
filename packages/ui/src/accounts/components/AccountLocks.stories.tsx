import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { AccountLocks, AccountLocksProps } from '@/accounts/components/AccountLocks'

export default {
  title: 'Accounts/AccountLocks',
  component: AccountLocks,
} as Meta

const Template: Story<AccountLocksProps> = (args) => <AccountLocks {...args} />

export const Default = Template.bind({})
Default.args = {
  locks: [
    { type: 'Voting', amount: new BN(10) },
    { type: 'Staking Candidate', amount: new BN(0) },
    { type: 'Councilor', amount: new BN(20) },
  ],
}
