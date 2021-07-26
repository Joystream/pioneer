import { Meta, Story } from '@storybook/react'
import React from 'react'

import { A_DAY, A_MINUTE } from '@/common/constants'

import { DurationStatistics, DurationStatisticsProps, Statistics } from '.'

export default {
  title: 'Common/Statistics/DurationStatistics',
  component: DurationStatistics,
  argTypes: { value: { control: 'date' } },
} as Meta

const Template: Story<DurationStatisticsProps> = ({ value, ...props }) => (
  <Statistics>
    <DurationStatistics {...props} value={new Date(value).toISOString()} />
  </Statistics>
)

export const Default = Template.bind({})
Default.args = {
  value: new Date(Date.now() + A_DAY + 10 * A_MINUTE).toISOString(),

  title: 'Statistic title',
  tooltipText: 'Text to help',
  tooltipTitle: 'Title to help',
  tooltipLinkText: 'More info',
}
