import { Meta, Story } from '@storybook/react'
import { addDays, isAfter, isEqual, startOfMonth, startOfToday } from 'date-fns'
import React, { useState } from 'react'

import { Row, TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { DateSelection } from '@/common/types/Dates'

import { Calendar } from '.'

export default {
  title: 'Common/Calendar',
  component: Calendar,
} as Meta

const TODAY = startOfToday()
const THIS_MONTH = startOfMonth(TODAY)
const Template: Story = () => {
  const [month, setMonth] = useState(THIS_MONTH)
  const [selection, setSelection] = useState<DateSelection>()

  const select = (day: Date) => {
    if (selection instanceof Date) {
      if (isEqual(selection, day)) {
        setSelection(undefined)
      } else if (isAfter(day, selection)) {
        setSelection({ start: selection, end: day })
      } else {
        setSelection({ start: day, end: selection })
      }
    } else {
      setSelection(day)
    }
  }

  return (
    <TemplateBlock>
      <Row>
        <Calendar
          month={month}
          selection={{ start: addDays(THIS_MONTH, 4), end: addDays(THIS_MONTH, 22) }}
          within={{ start: addDays(THIS_MONTH, -10), end: addDays(THIS_MONTH, 26) }}
          onChangeMonth={setMonth}
        />
        <Calendar month={month} selection={selection} onChange={select} onChangeMonth={setMonth} />
      </Row>
      <Row>
        <Calendar selection={{ start: TODAY }} />
        <Calendar selection={{ end: TODAY }} />
      </Row>
    </TemplateBlock>
  )
}

export const Default = Template.bind({})
