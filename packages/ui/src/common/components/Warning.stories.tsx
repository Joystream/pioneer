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

export const WithAdditionalContent = Template.bind({})
WithAdditionalContent.args = {
  title: 'Role ended!',
  content: 'Put your content here!',
  additionalContent: 'Additional content',
}

export const WithAlertIcon = Template.bind({})
WithAlertIcon.args = {
  title: 'Role ended!',
  content: 'Put your content here!',
  icon: 'alert',
}

export const WithInfoIcon = Template.bind({})
WithInfoIcon.args = {
  title: 'Role ended!',
  content: 'Put your content here!',
  icon: 'info',
}

export const Yellow = Template.bind({})
Yellow.args = {
  title: 'Role ended!',
  content: 'Put your content here!',
  isYellow: true,
}
