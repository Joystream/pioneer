import { Meta, Story } from '@storybook/react'
import React from 'react'

import { A_DAY, A_MINUTE } from '@/common/constants'

import { BlockDurationStatistics } from './BlockDurationStatistics'
import { DurationStatistics } from './DurationStatistics'
import { StatisticItemProps } from './StatisticItem'
import { Statistics } from './Statistics'

export default {
  title: 'Common/Statistics/DurationStatistics',
  subcomponents: { BlockDurationStatistics, DurationStatistics },
  argTypes: { dateValue: { control: 'date' }, dateFrom: { control: 'date' } },
} as Meta

interface Props extends StatisticItemProps {
  dateValue: string
  dateFrom: string
  blockValue: number
}

const Template: Story<Props> = ({ dateValue, dateFrom, blockValue, ...props }) => (
  <Statistics>
    <DurationStatistics {...props} title="Time until value" value={new Date(dateValue).toISOString()} />
    <DurationStatistics
      {...props}
      title="Time difference"
      value={new Date(dateValue).toISOString()}
      from={dateFrom && new Date(dateFrom).toISOString()}
    />
    <BlockDurationStatistics {...props} title="Block Duration" value={blockValue} />
  </Statistics>
)

export const Default = Template.bind({})
Default.args = {
  dateValue: new Date(Date.now() + A_DAY + 10 * A_MINUTE).toISOString(),
  dateFrom: new Date(Date.now() + A_DAY).toISOString(),
  blockValue: 738,
  tooltipText: 'Text to help',
  tooltipTitle: 'Title to help',
  tooltipLinkText: 'More info',
}
