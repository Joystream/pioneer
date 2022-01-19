import { Meta, Story } from '@storybook/react'
import React from 'react'

import { LanguageSelect } from '.'

export default {
  title: 'Common/LanguageSelect',
  component: LanguageSelect,
} as Meta

const Template: Story = (args) => {
  return <LanguageSelect {...args} />
}

export const Default = Template.bind({})
Default.args = {}
