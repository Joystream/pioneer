import { Meta, Story } from '@storybook/react'
import React from 'react'

import { FailureModal, FailureModalProps } from './FailureModal'

export default {
  title: 'Common/Modals/FailureModal',
  component: FailureModal,
} as Meta

const Template: Story<FailureModalProps> = (args) => <FailureModal {...args}>{args.children}</FailureModal>

export const Default = Template.bind({})
Default.args = {
  children: 'This is a failure',
}
