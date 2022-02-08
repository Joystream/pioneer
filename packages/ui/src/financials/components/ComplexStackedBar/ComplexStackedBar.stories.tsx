import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ComplexStackedBar, ComplexStackedBarProps } from '@/financials/components/ComplexStackedBar/ComplexStackedBar'

export default {
  title: 'Financials/ComplexStackedBar',
  component: ComplexStackedBar,
} as Meta

const Template: Story<ComplexStackedBarProps> = (args) => {
  return <ComplexStackedBar {...args} />
}

export const Default = Template.bind({})
Default.args = {
  data: {
    Dog: 1000,
    Cat: 3000,
    Rat: 4000,
  },
  details: {
    Dog: {
      Man: 3000,
      Woman: 2000,
    },
    Cat: {
      Man: 1000,
      Woman: 2000,
    },
    Rat: {
      Man: 3000,
      Woman: 3000,
    },
  },
  title: 'Complex Stacked Bar',
}
