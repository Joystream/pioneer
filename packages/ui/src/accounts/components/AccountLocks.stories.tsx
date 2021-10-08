import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { AccountLocks, AccountLocksProps } from '@/accounts/components/AccountLocks'
import { lockTypes } from '@/accounts/model/lockTypes'

export default {
  title: 'Accounts/AccountLocks',
  component: AccountLocks,
} as Meta

const Template: Story<AccountLocksProps> = (args) => <AccountLocks {...args} />

export const Default = Template.bind({})
Default.args = {
  locks: Object.values(lockTypes).map((lockType) => ({
    type: lockType,
    amount: new BN(10),
  })),
}
