import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { TransactionFee, TransactionFeeProps } from '@/common/components/TransactionFee'

export default {
  title: 'Common/TransactionFee',
  component: TransactionFee,
} as Meta

export const Default: Story<TransactionFeeProps> = (args) => <TransactionFee {...args} />

Default.args = {
  title: 'Transaction Fee',
  value: new BN(6.43535),
  tooltipTitle: 'Blockchain Transaction',
  tooltipText: 'This action requires a blockchain transaction, which comes with a fee',
}
