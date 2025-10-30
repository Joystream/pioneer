import { Meta, StoryFn } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { TransactionInfo, TransactionInfoProps } from './TransactionInfo'

export default {
  title: 'Common/TransactionInfo',
  component: TransactionInfo,
} as Meta

export const Default: StoryFn<TransactionInfoProps> = (args) => <TransactionInfo {...args} />

Default.args = {
  title: 'Transaction Fee',
  value: new BN(6.43535),
  tooltipTitle: 'Blockchain Transaction',
  tooltipText: 'This action requires a blockchain transaction, which comes with a fee',
}
