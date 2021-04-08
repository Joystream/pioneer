import { Meta, Story } from '@storybook/react'
import React from 'react'

import { FailureModal, FailureModalProps } from './FailureModal'

export default {
  title: 'Common/FailureModal',
  component: FailureModal,
} as Meta

const Template: Story<FailureModalProps> = (args) => <FailureModal {...args} />

export const Default = Template.bind({})
Default.args = {
  message: 'This is a failure',
}
