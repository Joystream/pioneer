import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'

import { AccountLockInfo, AccountLockInfoProps, lockInfoLayout } from './AccountLockInfo'

export default {
  title: 'Accounts/AccountLockInfo',
  component: AccountLockInfo,
} as Meta

const Template: Story<AccountLockInfoProps> = (args) => (
  <RowGapBlock gap={8}>
    <ListHeaders $colLayout={lockInfoLayout}>
      <div />
      <ListHeader>Unlocking</ListHeader>
      <ListHeader>Recoverable stake</ListHeader>
    </ListHeaders>
    <AccountLockInfo {...args} />
  </RowGapBlock>
)

export const Default = Template.bind({})
Default.args = {
  account: {
    name: 'Alice',
    address: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
  },
  amount: new BN(1000000),
  lockType: 'Invitation',
}
