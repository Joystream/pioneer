import { Meta, Story } from '@storybook/react'
import React from 'react'

import {
  TransactionStatusProps,
  TransactionStatusNotification,
} from './TransactionStatusNotification'

export default {
  title: 'Common/TransactionStatusNotification',
  component: TransactionStatusNotification,
} as Meta

const Template: Story<TransactionStatusProps> = (args) => (
    <TransactionStatusNotification {...args} />
)

export const NotificationComponent = Template.bind({})

NotificationComponent.args = {
  title: 'Finazlizing Transaction',
  message: 'The transaction has been included in a block.',
  onClose: () => undefined,
  state: 'pending',
  steps: [{ stepState: 'past' }, { stepState: 'active' }, { stepState: undefined }, { stepState: undefined }],
}
