import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Warning, WarningProps } from '@/common/components/Warning'
import { ButtonGhost } from './buttons'

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

export const WithIcon = Template.bind({})
WithIcon.args = {
  withIcon: true,
  title: 'Role ended!',
  content: 'Put your content here!',
  isClosable: false,
}

export const WithActionButton = Template.bind({})
WithActionButton.args = {
  withIcon: true,
  title: 'Role ended!',
  content: 'Put your content here!',
  isClosable: false,
  button: <ButtonGhost size="small"> Button </ButtonGhost>,
  description: 'Action description ...',
}
