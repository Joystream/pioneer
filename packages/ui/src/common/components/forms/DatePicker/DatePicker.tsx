import { addMonths, addWeeks, addYears, isAfter, isBefore, isEqual, startOfMonth, startOfToday } from 'date-fns'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { ButtonSecondary } from '@/common/components/buttons'
import { Shadows } from '@/common/constants'
import { DateRange, PartialDateRange } from '@/common/types/Dates'
import { earliest, fromRange, latest, toDDMMYY } from '@/common/utils/dates'

import { Calendar } from '../Calendar'
import { InputComponent, InputText } from '../InputComponent'

interface DatePickerProps {
  dates: PartialDateRange
  withinDates?: PartialDateRange
  onDatesChange: (dates: PartialDateRange) => void
}
export const DatePicker = ({ dates, withinDates, onDatesChange }: DatePickerProps) => {
  const placeholder = '__/__/__'
  const { start, end } = fromRange(dates)
  const dateString = `${toDDMMYY(start) ?? placeholder} - ${toDDMMYY(end) ?? placeholder}`

  return (
    <InputComponent tight inputWidth="xs">
      <InputText placeholder="-" value={dateString} readOnly />
      <DatePickerPopupContainer>
        <DatePickerCalendars value={dates} within={withinDates} onChange={onDatesChange} />
      </DatePickerPopupContainer>
    </InputComponent>
  )
}

interface DatePickerCalendarsProps {
  value: PartialDateRange
  within?: PartialDateRange
  onChange: (value: PartialDateRange) => void
}
const DatePickerCalendars = ({ value, within, onChange }: DatePickerCalendarsProps) => {
  const today = useMemo(() => startOfToday(), [])
  const thisMonth = useMemo(() => startOfMonth(today), [])
  const [monthL, setMonthL] = useState(addMonths(thisMonth, -1))
  const [monthR, setMonthR] = useState(thisMonth)
  const { start, end } = fromRange(value)

  const selectionStrategy = (k1: keyof DateRange) => (day: Date) => {
    if (!value) {
      // Click anywhere when there is no range -> Set either the range start or end
      onChange({ [k1]: day } as { start: Date } | { end: Date })
    } else if (isBefore(day, start ?? (end as Date))) {
      // Clicked before the range (or selected day) -> Expand the range
      onChange({ ...value, start: day })
    } else if (isAfter(day, end ?? (start as Date))) {
      // Clicked after the range (or selected day) -> Expand the range
      onChange({ ...value, end: day })
    } else if (start && isEqual(day, start)) {
      // Clicked on the range start -> Remove the range start
      onChange(end ? { end } : undefined)
    } else if (end && isEqual(day, end)) {
      // Clicked on the range end -> Remove the range end
      onChange(start ? { start } : undefined)
    } else {
      // Clicked within the range -> Shrink the range from either its start or end
      onChange({ ...value, [k1]: day } as PartialDateRange)
    }
  }

  const setToNowFrom = (change: typeof addMonths, offset: number) => () => {
    const { start: min, end: max } = fromRange(within)
    const date = change(today, offset)
    const start = latest(date, min) ?? date
    const end = earliest(today, max) ?? today
    setMonthL(startOfMonth(start))
    setMonthR(startOfMonth(end))
    onChange({ start, end })
  }

  return (
    <DatePickerCalendarsContainer>
      <Calendar
        selection={value}
        month={monthL}
        within={within}
        withinMonths={{ end: monthR }}
        onChangeMonth={setMonthL}
        onChange={selectionStrategy('start')}
      />

      <Calendar
        selection={value}
        month={monthR}
        within={within}
        withinMonths={{ start: monthL }}
        onChangeMonth={setMonthR}
        onChange={selectionStrategy('end')}
      />

      <DatePickerSideNav>
        <ButtonSecondary onClick={setToNowFrom(addWeeks, -1)}>Last week</ButtonSecondary>
        <ButtonSecondary onClick={setToNowFrom(addMonths, -1)}>Past month</ButtonSecondary>
        <ButtonSecondary onClick={setToNowFrom(addMonths, -3)}>Past 3 months</ButtonSecondary>
        <ButtonSecondary onClick={setToNowFrom(addMonths, -6)}>Past 6 months</ButtonSecondary>
        <ButtonSecondary onClick={setToNowFrom(addYears, -1)}>Past year</ButtonSecondary>
      </DatePickerSideNav>
    </DatePickerCalendarsContainer>
  )
}

const DatePickerPopupContainer = styled.div`
  pointer-events: none;
  position: absolute;
  left: 0;
  top: calc(100% + 4px);
  width: 100vw;
`

const DatePickerCalendarsContainer = styled.div`
  box-shadow: ${Shadows.light};
  pointer-events: all;
  display: inline-grid;
  gap: 16px;
  grid-auto-flow: column;
  justify-items: center;
  padding: 16px;
`

const DatePickerSideNav = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > * {
    width: 100%;
  }
`
