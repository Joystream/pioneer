import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
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
    Dog: new BN(1000),
    Cat: new BN(3000),
    Rat: new BN(4000),
  },
  details: {
    Dog: {
      Man: new BN(3000),
      Woman: new BN(2000),
    },
    Cat: {
      Man: new BN(1000),
      Woman: new BN(2000),
    },
    Rat: {
      Man: new BN(3000),
      Woman: new BN(3000),
    },
  },
  title: 'Complex Stacked Bar',
}
