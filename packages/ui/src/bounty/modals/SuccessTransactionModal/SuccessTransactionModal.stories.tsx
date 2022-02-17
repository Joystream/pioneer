import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import React from 'react'

import { SuccessTransactionModal, Props } from './SuccessTransactionModal'

export default {
  title: 'Bounty/SuccessTransactionModal',
  component: SuccessTransactionModal,
} as Meta

const Template: Story<Props> = (args) => {
  return <SuccessTransactionModal {...args} />
}

export const Default = Template.bind({})
Default.args = {
  onClose: action('onClose'),
  onButtonClick: action('onButtonClick'),
  buttonLabel: 'Confirm',
  message: 'Lorem ipsum',
}
