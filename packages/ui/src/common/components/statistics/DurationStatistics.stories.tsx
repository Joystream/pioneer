import { Meta, Story } from '@storybook/react'
import React from 'react'

import { A_DAY, A_MINUTE } from '@/common/constants'

import { DurationStatistics, DurationStatisticsProps, Statistics } from '.'

export default {
  title: 'Common/Statistics/DurationStatistics',
  component: DurationStatistics,
  argTypes: { value: { control: 'date' }, from: { control: 'date' } },
  parameters: { controls: { exclude: ['className', 'title'] } },
} as Meta

const Template: Story<DurationStatisticsProps> = ({ value, from, ...props }) => (
  <Statistics>
    <DurationStatistics {...props} title="Time until value" value={new Date(value).toISOString()} />
    <DurationStatistics
      {...props}
      title="Time difference"
      value={new Date(value).toISOString()}
      from={from && new Date(from).toISOString()}
    />
  </Statistics>
)

export const Default = Template.bind({})
Default.args = {
  value: new Date(Date.now() + A_DAY + 10 * A_MINUTE).toISOString(),
  from: new Date(Date.now() + A_DAY).toISOString(),
  tooltipText: 'Text to help',
  tooltipTitle: 'Title to help',
  tooltipLinkText: 'More info',
}
