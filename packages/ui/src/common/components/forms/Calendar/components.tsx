import { addDays, addMonths, isAfter, isBefore, isEqual, isSameMonth } from 'date-fns'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'

import { TextSmall } from '@/common/components/typography'
import { Colors, Fonts } from '@/common/constants'
import { DateSelection, PartialDateRange } from '@/common/types/Dates'
import { fromRange } from '@/common/utils/dates'

import { ButtonGhost, ButtonInnerWrapper } from '../../buttons'

interface CalendarNavProps {
  month: Date
  direction: -1 | 1
  min?: Date
  max?: Date
  onClick?: (month: Date) => void
}

export const CalendarNav: FC<CalendarNavProps> = ({ month, direction, min, max, children, onClick }) => {
  const target = addMonths(month, direction)
  const isOutofBounds = direction > 0 ? max && isAfter(target, max) : min && isBefore(addDays(month, -1), min)
  if (!onClick || isOutofBounds) {
    return <ChangeMonthButton disabled>{children}</ChangeMonthButton>
  } else {
    const changeMonth = () => {
      onClick(addMonths(month, direction))
    }
    return <ChangeMonthButton onClick={changeMonth}>{children}</ChangeMonthButton>
  }
}

interface CalendarDayProps {
  day: Date
  month: Date
  selection?: DateSelection
  within?: PartialDateRange
  onClick?: (day: Date) => void
}

export const CalendarDay = ({ day, month, selection, within, onClick }: CalendarDayProps) => {
  const { start: min, end: max } = fromRange(within)
  const tooEarly = min && isBefore(day, min)
  const tooLate = max && isAfter(day, max)
  if (tooEarly || tooLate) {
    return <DayButton disabled>{day.getDate()}</DayButton>
  }

  return (
    <DayButton
      {...selectionFlags(day, selection)}
      inMonth={isSameMonth(day, month)}
      onClick={onClick && (() => onClick(day))}
    >
      {day.getDate()}
    </DayButton>
  )
}

interface SelectionFlags {
  first?: boolean
  last?: boolean
  selected?: boolean
}

const selectionFlags = (day: Date, selection?: DateSelection): SelectionFlags => {
  if (selection) {
    if (selection instanceof Date) {
      if (isEqual(day, selection)) {
        return { selected: true, first: true, last: true }
      }
    } else if ('start' in selection || 'end' in selection) {
      const after = !('start' in selection) || isAfter(day, selection.start)
      const before = !('end' in selection) || isBefore(day, selection.end)
      const first = 'start' in selection && isEqual(day, selection.start)
      const last = 'end' in selection && isEqual(day, selection.end)
      const selected = (after && before) || first || last
      return { selected, first, last }
    }
  }
  return {}
}

const ITEM_SIZE = '32px'

export const CalendarGrid = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(7, ${ITEM_SIZE});
  grid-auto-rows: ${ITEM_SIZE};
  user-select: none;
`

export const CalendarMonth = styled(CalendarGrid)`
  justify-content: start;
`

const ItemStyle = css`
  text-align: center;
  vertical-align: middle;
  line-height: ${ITEM_SIZE};
`

export const CalendarHeaderContainer = styled(CalendarGrid)`
  grid-column: span 7;
  background-color: ${Colors.White};
`
export const CalendarTitle = styled(TextSmall)`
  ${ItemStyle}
  grid-column: 2 / span 5;
`

export const CalendarWeekDay = styled.span`
  ${ItemStyle}
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${ITEM_SIZE};
  height: ${ITEM_SIZE};
  text-align: center;
  font-family: ${Fonts.Grotesk};
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
`

const CalendarButton = styled(ButtonGhost).attrs(() => ({
  size: 'small',
  square: true,
}))`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 100%;
  font-size: 10px;
  line-height: 16px;
  border-radius: 0;

  &:focus {
    border-color: ${Colors.Black[200]};
    color: ${Colors.Black[900]};
    &:before {
      transform: translate(-150%, -50%);
    }
  }
`

const ChangeMonthButton = styled(ButtonGhost).attrs(() => ({
  size: 'small',
  square: true,
}))`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 100%;
  font-size: 10px;
  line-height: 16px;
  ${({ disabled }) =>
    disabled &&
    css`
      visibility: hidden;
    `}
`

interface SelectableDayProps extends SelectionFlags {
  inMonth?: boolean
  disabled?: boolean
}

const DayButton = styled(CalendarButton)<SelectableDayProps>`
  font-family: ${Fonts.Inter};
  font-weight: 400;
  border: none;
  box-shadow: 0px 0px 0px 1px ${Colors.Black[200]};

  &:hover,
  &:focus {
    box-shadow: 0px 0px 0px 1px ${Colors.Blue[100]};
  }

  &:active {
    box-shadow: 0px 0px 0px 1px ${Colors.Blue[100]};
  }

  &:disabled {
    color: ${Colors.Black[300]};
    box-shadow: 0px 0px 0px 1px ${Colors.Black[200]};
  }

  ${ButtonInnerWrapper} {
    transform: translateY(0);
  }

  ${({ selected, first, last, inMonth, disabled }: SelectableDayProps) => {
    if (disabled) {
      return css`
        background-color: ${Colors.Black[50]};
        color: ${Colors.Black[200]};
        cursor: not-allowed;
      `
    } else if (!inMonth) {
      return css`
        background-color: ${selected ? Colors.Blue[50] : Colors.Black[50]};
        color: ${Colors.Black[400]};
      `
    } else if (first || last) {
      return css`
        background-color: ${Colors.Blue[500]};
        color: ${Colors.White};
        &:focus {
          color: ${Colors.White};
        }
        ${first &&
        css`
          border-top-left-radius: 50%;
          border-bottom-left-radius: 50%;
        `}
        ${last &&
        css`
          border-top-right-radius: 50%;
          border-bottom-right-radius: 50%;
        `}
      `
    } else if (selected) {
      return css`
        background-color: ${Colors.Blue[50]};
      `
    }
  }}
`
