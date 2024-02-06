import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { InsufficientFundsModal, InsufficientFundsModalProps } from './InsufficientFundsModal'

export default {
  title: 'Accounts/InsufficientFundsModal',
  component: InsufficientFundsModal,
} as Meta

const Template: Story<InsufficientFundsModalProps> = (args) => <InsufficientFundsModal {...args} />

export const Default = Template.bind({})
Default.args = {
  onClose: () => undefined,
  address: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
  amount: new BN(420),
}
