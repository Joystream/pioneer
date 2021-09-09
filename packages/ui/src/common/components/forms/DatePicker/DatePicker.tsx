import { addMonths, addWeeks, addYears, isAfter, isBefore, isEqual, startOfMonth, startOfToday } from 'date-fns'
import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import { usePopper } from 'react-popper'
import styled from 'styled-components'

import { ButtonSecondary, ButtonSecondaryStyles, ButtonsGroup, FilterButtons } from '@/common/components/buttons'
import { Colors, Shadows, ZIndex } from '@/common/constants'
import { useEscape } from '@/common/hooks/useEscape'
import { useOutsideClick } from '@/common/hooks/useOutsideClick'
import { DateRange, PartialDateRange } from '@/common/types/Dates'
import { earliest, fromRange, latest, toDDMMYY } from '@/common/utils/dates'

import { CalendarIcon } from '../../icons/CalendarIcon'
import { Calendar } from '../Calendar'
import { CALENDAR_WRAP_SIZE } from '../Calendar/components'
import { FilterLabel } from '../FilterBox'
import { InputComponent, InputContainer, InputText } from '../InputComponent'
import { ControlProps } from '../types'

interface DatePickerProps extends ControlProps<PartialDateRange> {
  title?: string
  withinDates?: PartialDateRange
  onApply?: () => void
  onClear?: () => void
  inputSize?: 'xs' | 's' | 'm' | 'l' | 'auto' | undefined
  inputWidth?: 'auto' | 's' | 'xs' | undefined
  placeholder?: string
}

export const DatePicker = ({
  title,
  value,
  withinDates,
  onApply,
  onClear,
  onChange,
  inputSize,
  inputWidth,
  placeholder = 'All time',
}: DatePickerProps) => {
  const datePlaceholder = '__/__/__'
  const { start, end } = fromRange(value)
  const dateString =
    !start && !end ? placeholder : `${toDDMMYY(start) ?? datePlaceholder} - ${toDDMMYY(end) ?? datePlaceholder}`
  const [referenceElementRef, setReferenceElementRef] = useState<HTMLDivElement | null>(null)
  const [popperElementRef, setPopperElementRef] = useState<HTMLDivElement | null>(null)

  const { styles, attributes } = usePopper(referenceElementRef, popperElementRef, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 0],
        },
      },
    ],
  })
  const [isOpen, toggleOpen] = useState(false)

  useOutsideClick(popperElementRef, isOpen, () => toggleOpen(false))
  useEscape(() => toggleOpen(false))

  const apply = () => {
    onApply?.()
    toggleOpen(false)
  }

  return (
    <DatePickerContainer ref={setReferenceElementRef} onMouseUp={() => toggleOpen(true)}>
      {title && <FilterLabel>{title}</FilterLabel>}
      <DatePickerInput tight inputWidth={inputWidth} inputSize={inputSize} icon={<CalendarIcon />} iconRight>
        <InputText placeholder="-" value={dateString} readOnly />
        {isOpen &&
          ReactDOM.createPortal(
            <DatePickerPopup ref={setPopperElementRef} style={styles.popper} {...attributes.popper} isOpen={isOpen}>
              <DatePickerCalendars value={value} within={withinDates} onChange={onChange} />
              <ButtonsGroup align="right">
                <FilterButtons onApply={apply} onClear={onClear} />
              </ButtonsGroup>
            </DatePickerPopup>,
            document.body
          )}
      </DatePickerInput>
    </DatePickerContainer>
  )
}

interface DatePickerCalendarsProps extends ControlProps<PartialDateRange> {
  within?: PartialDateRange
}

const DatePickerCalendars = ({ value, within, onChange }: DatePickerCalendarsProps) => {
  const { start, end } = fromRange(value)

  const today = useMemo(() => startOfToday(), [])
  const currentMonth = useMemo(() => startOfMonth(today), [])
  const [leftCalendarMonth, setLeftCalendarMonth] = useState(start ? startOfMonth(start) : addMonths(currentMonth, -1))
  const [rightCalendarMonth, setRightCalendarMonth] = useState(end ? startOfMonth(end) : currentMonth)

  const selectionStrategy = (preferedSide: keyof DateRange) => (day: Date) => {
    if (!value) {
      // Click anywhere when there is no range -> Set either the range start or end
      onChange({ [preferedSide]: day } as { start: Date } | { end: Date })
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
      onChange({ ...value, [preferedSide]: day })
    }
  }

  const setToNowFrom = (change: typeof addMonths, offset: number) => () => {
    const { start: min, end: max } = fromRange(within)
    const date = change(today, offset)
    const start = latest(date, min) ?? date
    const end = earliest(today, max) ?? today
    setLeftCalendarMonth(startOfMonth(start))
    setRightCalendarMonth(startOfMonth(end))
    onChange({ start, end })
  }

  return (
    <DatePickerControllersWrapper>
      <DatePickerCalendarsWrapper>
        <Calendar
          selection={value}
          month={leftCalendarMonth}
          within={within}
          withinMonths={{ end: rightCalendarMonth }}
          onChangeMonth={setLeftCalendarMonth}
          onChange={selectionStrategy('start')}
        />

        <Calendar
          selection={value}
          month={rightCalendarMonth}
          within={within}
          withinMonths={{ start: leftCalendarMonth }}
          onChangeMonth={setRightCalendarMonth}
          onChange={selectionStrategy('end')}
        />
      </DatePickerCalendarsWrapper>
      <DatePickerSideNav>
        <ButtonSecondary onClick={setToNowFrom(addWeeks, -1)} size="small">
          Last week
        </ButtonSecondary>
        <ButtonSecondary onClick={setToNowFrom(addMonths, -1)} size="small">
          Past month
        </ButtonSecondary>
        <ButtonSecondary onClick={setToNowFrom(addMonths, -3)} size="small">
          Past 3 months
        </ButtonSecondary>
        <ButtonSecondary onClick={setToNowFrom(addMonths, -6)} size="small">
          Past 6 months
        </ButtonSecondary>
        <ButtonSecondary onClick={setToNowFrom(addYears, -1)} size="small">
          Past year
        </ButtonSecondary>
      </DatePickerSideNav>
    </DatePickerControllersWrapper>
  )
}

const DatePickerContainer = styled.div`
  display: inline-block;
  &:hover,
  &:focus,
  &:focus-within,
  &:active {
    ${FilterLabel} {
      color: ${Colors.Blue[400]};
    }
  }
`

const DatePickerInput = styled(InputComponent)`
  width: unset;

  ${InputContainer} {
    border: 1px solid ${Colors.Black[200]};

    &:hover,
    &:focus,
    &:focus-within {
      border-color: ${Colors.Blue[400]};
    }
  }
`

const DatePickerPopup = styled.div<{ isOpen?: boolean }>`
  display: grid;
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  grid-row-gap: 12px;
  max-width: 624px;
  padding: 16px;
  background-color: ${Colors.White};
  box-shadow: ${Shadows.light};
  z-index: ${ZIndex.select};
`

const DatePickerControllersWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 16px;
`

const DatePickerCalendarsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, ${CALENDAR_WRAP_SIZE});
  grid-column-gap: 16px;
`

const DatePickerSideNav = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${ButtonSecondaryStyles} {
    width: 112px;
    padding: 4px;
  }
`
