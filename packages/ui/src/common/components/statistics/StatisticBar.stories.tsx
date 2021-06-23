import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ratioControl } from '@/common/components/storybookParts/previewStyles'

import { Statistics, StatisticBar, StatisticBarProps, TwoRowStatistic } from '.'

export default {
  title: 'Common/Statistics/StatisticBar',
  component: StatisticBar,
  argTypes: { value: ratioControl, threshold: ratioControl },
} as Meta

const { ceil, floor } = Math

const Template: Story<StatisticBarProps> = (args) => {
  const { value, threshold } = args
  const ratio = value / threshold

  return (
    <Statistics>
      <TwoRowStatistic>
        <StatisticBar {...args} numerator={floor(10 * value)} denominator={`${ceil(10 * threshold)} votes`} />
        <StatisticBar {...args} numerator={`${ceil(100 * ratio)}%`} denominator={`${floor(100 * threshold)}%`} />
      </TwoRowStatistic>
      <TwoRowStatistic>
        <StatisticBar {...args} numerator={floor(10 * value)} denominator={`max ${ceil(10 * threshold)} votes`} />
        <StatisticBar {...args} numerator={`${ceil(100 * ratio)}%`} denominator={`max ${floor(100 * threshold)}%`} />
      </TwoRowStatistic>
    </Statistics>
  )
}

export const Default = Template.bind({})
Default.args = {
  value: 0.25,
  threshold: 0.51,

  title: 'Statistic title',
  tooltipText: 'Text to help',
  tooltipTitle: 'Title to help',
  tooltipLinkText: 'More info',
}
