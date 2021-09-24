import { Meta, Story } from '@storybook/react'
import React from 'react'

import {
  TransactionStatusProps,
  TransactionStatusStateProps,
  TransactionStatus,
  TransactionStatusHolder,
} from './TransactionStatusNotification'
import { TransactionStatusSteperProps } from './TransactionStatusSteps'

export default {
  title: 'Common/TransactionStatusNotification',
  component: TransactionStatus,
} as Meta

const Template: Story<TransactionStatusProps & TransactionStatusStateProps & TransactionStatusSteperProps> = (args) => (
  <TransactionStatusHolder>
    <TransactionStatus {...args} />
  </TransactionStatusHolder>
)

export const NotificationComponent = Template.bind({})

NotificationComponent.args = {
  title: 'Finazlizing Transaction',
  message: 'The transaction has been included in a block.',
  showClose: true,
  state: 'pending',
  steps: [{ stepState: 'past' }, { stepState: 'active' }, { stepState: undefined }, { stepState: undefined }],
}
