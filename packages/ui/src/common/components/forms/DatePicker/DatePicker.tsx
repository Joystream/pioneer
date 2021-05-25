import { addMonths, addWeeks, addYears, isAfter, isBefore, isEqual, startOfMonth, startOfToday } from 'date-fns'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import { ButtonSecondary, FilterButtons } from '@/common/components/buttons'
import { Shadows } from '@/common/constants'
import { DateRange, PartialDateRange } from '@/common/types/Dates'
import { earliest, fromRange, latest, toDDMMYY } from '@/common/utils/dates'

import { Calendar } from '../Calendar'
import { InputComponent, InputText } from '../InputComponent'

interface DatePickerProps {
  title?: string
  value: PartialDateRange
  withinDates?: PartialDateRange
  onApply?: () => void
  onClear?: () => void
  onChange: (value: PartialDateRange) => void
}

export const DatePicker = ({ title, value, withinDates, onApply, onClear, onChange }: DatePickerProps) => {
  const placeholder = '__/__/__'
  const { start, end } = fromRange(value)
  const dateString = `${toDDMMYY(start) ?? placeholder} - ${toDDMMYY(end) ?? placeholder}`

  const container = useRef<HTMLDivElement>(null)
  const [isOpen, toggleOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const closePopup = (evt: MouseEvent) => {
      evt.stopPropagation()
      if (!evt.target) return

      const target = evt.target as Node
      const clickedOutside = !container.current?.contains(target) ?? false
      clickedOutside && toggleOpen(false)
    }

    window.addEventListener('mousedown', closePopup)
    return () => window.removeEventListener('mousedown', closePopup)
  }, [isOpen])

  const apply = () => {
    onApply?.()
    toggleOpen(false)
  }

  return (
    <DatePickerContainer ref={container} onMouseDown={() => !isOpen && toggleOpen(true)}>
      <InputComponent tight inputWidth="xs">
        <InputText placeholder="-" value={dateString} readOnly />
        {isOpen && (
          <DatePickerPopup>
            <DatePickerCalendars value={value} within={withinDates} onChange={onChange} />
            <DatePickerFooter>
              <FilterButtons onApply={apply} onClear={onClear} />
            </DatePickerFooter>
          </DatePickerPopup>
        )}
      </InputComponent>
    </DatePickerContainer>
  )
}

interface DatePickerCalendarsProps {
  value: PartialDateRange
  within?: PartialDateRange
  onChange: (value: PartialDateRange) => void
}
const DatePickerCalendars = ({ value, within, onChange }: DatePickerCalendarsProps) => {
  const { start, end } = fromRange(value)

  const today = useMemo(() => startOfToday(), [])
  const thisMonth = useMemo(() => startOfMonth(today), [])
  const [monthL, setMonthL] = useState(start ? startOfMonth(start) : addMonths(thisMonth, -1))
  const [monthR, setMonthR] = useState(end ? startOfMonth(end) : thisMonth)

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
    <>
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
    </>
  )
}

const DatePickerContainer = styled.div`
  display: inline-block;
`

const DatePickerPopup = styled.div`
  position: absolute;
  left: 0;
  top: calc(100% + 4px);
  box-shadow: ${Shadows.light};
  padding: 16px;

  display: inline-grid;
  gap: 16px;
  grid-template-columns: auto auto auto;
  justify-items: center;
  width: 672px;
`

const DatePickerFooter = styled.div`
  display: contents;

  & > :first-child {
    grid-column: 2;
    justify-self: end;
  }
  & > :last-child {
    grid-column: 3;
    width: 100%;
  }
`

const DatePickerSideNav = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > * {
    width: 100%;
  }
`
