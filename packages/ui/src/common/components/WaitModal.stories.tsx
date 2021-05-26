import { Meta, Story } from '@storybook/react'
import React from 'react'

import { info } from '@/common/logger'

import { WaitModal, WaitModalProps } from './WaitModal'

export default {
  title: 'Common/Modals/WaitModal',
  component: WaitModal,
} as Meta

const Template: Story<WaitModalProps> = (args) => <WaitModal {...args} />

export const WaitModalComponent = Template.bind({})
WaitModalComponent.args = {
  onClose: () => {
    info('Wait modal now is closed, but not realy')
  },
  title: 'Wait modal title',
  description: 'Some text which you can read when waiting for response',
}
