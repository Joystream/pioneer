import { Meta, Story } from '@storybook/react'
import { addMonths, startOfToday } from 'date-fns'
import React from 'react'

import { PartialDateRange } from '@/common/types/Dates'

import { DatePicker } from '.'

export default {
  title: 'Common/DatePicker',
  component: DatePicker,
} as Meta

const Template: Story = () => {
  const today = startOfToday()
  const withinDates = { start: addMonths(today, -13), end: today }

  const display = (dates: PartialDateRange) =>
    setTimeout(() => {
      alert(JSON.stringify(dates, null, 2))
    }, 100)

  return <DatePicker withinDates={withinDates} onApply={display} />
}

export const Default = Template.bind({})
