import { addDays, startOfMonth, startOfWeek } from 'date-fns'
import React, { memo, useMemo } from 'react'

import { Arrow } from '@/common/components/icons'
import { DateSelection, PartialDateRange } from '@/common/types/Dates'
import { repeat } from '@/common/utils'
import { earliest, fromRange, latest } from '@/common/utils/dates'

import {
  CalendarMonth,
  CalendarWeekDay,
  CalendarHeaderContainer,
  CalendarDay,
  CalendarTitle,
  CalendarNav,
} from './components'

export interface CalendarProps {
  month?: Date
  within?: PartialDateRange
  withinMonths?: PartialDateRange
  selection?: DateSelection
  onChangeMonth?: (month: Date) => void
  onChange?: (day: Date) => void
}

export const Calendar = ({
  selection,
  month = startOfMonth(new Date()),
  within,
  withinMonths,
  onChangeMonth,
  onChange,
}: CalendarProps) => (
  <CalendarMonth>
    <CalendarHeader month={month} within={within} withinMonths={withinMonths} onChange={onChangeMonth} />
    <CalendarBody month={month} within={within} selection={selection} onChange={onChange} />
  </CalendarMonth>
)

interface CalendarHeaderProps {
  month: Date
  within?: PartialDateRange
  withinMonths?: PartialDateRange
  onChange?: (month: Date) => void
}

const CalendarHeader = memo(({ month, within, withinMonths, onChange }: CalendarHeaderProps) => {
  const title = month.toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })
  const { start: min, end: max } = fromRange(within)
  const { start: minMonth, end: maxMonth } = fromRange(withinMonths)

  return (
    <CalendarHeaderContainer>
      <CalendarNav month={month} direction={-1} min={latest(min, minMonth)} onClick={onChange}>
        <Arrow direction="left" />
      </CalendarNav>
      <CalendarTitle bold>{title}</CalendarTitle>
      <CalendarNav month={month} direction={1} max={earliest(max, maxMonth)} onClick={onChange}>
        <Arrow direction="right" />
      </CalendarNav>
    </CalendarHeaderContainer>
  )
})

const DAYS_PER_CALENDAR_PAGE = 6 * 7
const DAY_NAMES = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']

interface CalendarBodyProps {
  month: Date
  within?: PartialDateRange
  selection?: DateSelection
  onChange?: (day: Date) => void
}

const CalendarBody = memo(({ month, within, selection, onChange }: CalendarBodyProps) => {
  const firstDay = useMemo(() => startOfWeek(addDays(month, -1), { weekStartsOn: 1 }), [month])

  return (
    <>
      <CalendarHeaderContainer>
        {DAY_NAMES.map((day) => (
          <CalendarWeekDay key={day}>{day}</CalendarWeekDay>
        ))}
      </CalendarHeaderContainer>

      {repeat(
        (index) => (
          <CalendarDay
            key={index}
            day={addDays(firstDay, index)}
            month={month}
            selection={selection}
            within={within}
            onClick={onChange}
          />
        ),
        DAYS_PER_CALENDAR_PAGE
      )}
    </>
  )
})
