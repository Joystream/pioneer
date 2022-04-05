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
  account: { name: 'Alice Account', address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY' },
  amountTitle: 'Contribution amount',
  rows: [{ stakingFromTitle: 'Staking from bounty', amount: new BN(20000) }],
}
