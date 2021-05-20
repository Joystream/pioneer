import { Meta, Story } from '@storybook/react'
import { addMonths, startOfToday } from 'date-fns'
import React, { useState } from 'react'

import { PartialDateRange } from '@/common/types/Dates'

import { DatePicker } from '.'

export default {
  title: 'Common/DatePicker',
  component: DatePicker,
} as Meta

const Template: Story = () => {
  const [dates, setDates] = useState<PartialDateRange>()
  const today = startOfToday()
  const withinDates = { start: addMonths(today, -13), end: today }
  return <DatePicker dates={dates} withinDates={withinDates} onDatesChange={setDates} />
}

export const Default = Template.bind({})
