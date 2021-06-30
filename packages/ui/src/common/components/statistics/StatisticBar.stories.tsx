import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ratioControl } from '@/common/components/storybookParts/previewStyles'
import { plural } from '@/common/helpers'

import { Statistics, StatisticBar, StatisticBarProps, TwoRowStatistic } from '.'

export default {
  title: 'Common/Statistics/StatisticBar',
  component: StatisticBar,
  argTypes: { value: ratioControl, threshold: ratioControl },
} as Meta

const { ceil, floor } = Math

const Template: Story<StatisticBarProps> = (args) => {
  const { value, threshold } = args
  const thresholdVotes = threshold ? ceil(10 * threshold) : '-'
  const thresholdVoteDenominator = `${thresholdVotes} vote${plural(thresholdVotes)}`
  const thresholdPercent = threshold ? `${floor(100 * threshold)}%` : '-'

  return (
    <Statistics>
      <TwoRowStatistic>
        <StatisticBar {...args} numerator={floor(10 * value)} denominator={thresholdVoteDenominator} />
        <StatisticBar {...args} numerator={`${ceil(100 * value)}%`} denominator={thresholdPercent} />
      </TwoRowStatistic>
      <TwoRowStatistic>
        <StatisticBar {...args} numerator={floor(10 * value)} denominator={`max ${thresholdVoteDenominator}`} />
        <StatisticBar {...args} numerator={`${ceil(100 * value)}%`} denominator={`max ${thresholdPercent}`} />
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
