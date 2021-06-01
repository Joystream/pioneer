import { Meta, Story } from '@storybook/react'
import { addMonths, startOfToday } from 'date-fns'
import React, { useState } from 'react'

import { PartialDateRange } from '@/common/types/Dates'

import { DatePicker } from '.'

export default {
  title: 'Common/Forms/DatePicker',
  component: DatePicker,
} as Meta

const Template: Story = () => {
  const [value, setValue] = useState<PartialDateRange>()
  const today = startOfToday()
  const withinDates = { start: addMonths(today, -13), end: today }

  const display = () =>
    setTimeout(() => {
      alert(JSON.stringify(value, null, 2))
    }, 100)

  return (
    <DatePicker
      value={value}
      withinDates={withinDates}
      onApply={display}
      onClear={() => setValue(undefined)}
      onChange={setValue}
    />
  )
}

export const Default = Template.bind({})
