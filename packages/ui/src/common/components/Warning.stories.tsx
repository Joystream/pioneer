import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Warning, WarningProps } from '@/common/components/Warning'

export default {
  title: 'Common/Warning',
  component: Warning,
} as Meta

const Template: Story<WarningProps> = (args) => <Warning {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Role ended!',
  content: 'Put your content here!',
}

export const NonClosable = Template.bind({})
NonClosable.args = {
  title: 'Role ended!',
  content: 'Put your content here!',
  isClosable: false,
}
