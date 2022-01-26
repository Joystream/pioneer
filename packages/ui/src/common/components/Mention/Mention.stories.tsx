import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Mention, MentionProps } from './Mention'

export default {
  title: 'Common/Mention',
  component: Mention,
} as Meta

const Template: Story<MentionProps> = (args) => (
  <Mention {...args}>Mention</Mention>
)

export const Default = Template.bind({})
Default.args = {};
