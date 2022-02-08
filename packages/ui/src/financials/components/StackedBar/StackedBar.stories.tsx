import { Meta, Story } from '@storybook/react'
import React from 'react'

import { StackedBar } from '@/financials/components/StackedBar/StackedBar'

export default {
  title: 'Financials/StackedBar',
  component: StackedBar,
} as Meta

const Template: Story = () => {
  return <StackedBar />
}

export const Default = Template.bind({})
