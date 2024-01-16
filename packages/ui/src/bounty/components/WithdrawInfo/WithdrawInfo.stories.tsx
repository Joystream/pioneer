import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { WithdrawInfo, WithdrawInfoProps } from '@/bounty/components/WithdrawInfo/WithdrawInfo'

export default {
  title: 'Bounty/WithdrawInfo',
  component: WithdrawInfo,
} as Meta

const Template: Story<WithdrawInfoProps> = (args) => <WithdrawInfo {...args} />

export const Default = Template.bind({})
Default.args = {
  account: { name: 'Alice Account', address: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf' },
  amountTitle: 'Contribution amount',
  rows: [{ stakingFromTitle: 'Staking from bounty', amount: new BN(20000) }],
}
