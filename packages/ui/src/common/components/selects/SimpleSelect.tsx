import React, { ReactNode, useMemo, useReducer } from 'react'
import styled, { css } from 'styled-components'

import { ControlProps } from '@/common/components/forms'
import { FilterLabel } from '@/common/components/forms/FilterBox'
import { BorderRad, Colors, Overflow, Shadows, Transitions } from '@/common/constants'
import { isDefined } from '@/common/utils'
import { stopEvent } from '@/common/utils/events'

import { Toggle } from '../buttons/Toggle'
import { CheckboxIcon, CheckboxIconStyles } from '../icons'
import { TextInlineMedium } from '../typography'

import { Select } from '.'
import { EmptyOption, SelectComponent, SelectedOption } from './components'

type Option = string | ReactNode
type ValueToOption<T> = (value: T) => Option

type Move<T> = { type: 'move'; entries: [Option, T][]; step: number }
type Set<T> = { type: 'set'; value: T | undefined }
type Action<T> = Move<T> | Set<T>

type FocusReducer<T> = (value: T | undefined, action: Action<T>) => T | undefined

const cycle = (i: number, s: number, len: number) => (len + i + s) % len

const selectFocusReducer = <T extends any>(value: T | undefined, action: Action<T>): T | undefined => {
  switch (action.type) {
    case 'set':
      return action.value

    case 'move': {
      const focusedIndex = isDefined(value) ? action.entries.findIndex(([, v]) => v === value) : -1
      const toFocusIndex = focusedIndex >= 0 ? cycle(focusedIndex, action.step, action.entries.length) : undefined
      return action.entries[toFocusIndex ?? 0]?.[1]
    }
  }
}

interface SimpleSelectProps<T> extends FilterSelectProps<T>, SimpleSelectSizingProps {
  emptyOption?: Option
  onSearch?: (search: string) => void
}

interface SimpleSelectSizingProps {
  selectSize?: 's' | 'm' | 'l'
}

export const SimpleSelect = <T extends any>({
  title,
  values,
  emptyOption,
  renderOption = String,
  renderSelected,
  value,
  onChange,
  onSearch,
  selectSize,
}: SimpleSelectProps<T>) => {
  const [focused, focus] = useReducer(selectFocusReducer as FocusReducer<T | null>, value)

  const entries = useMemo<[Option, T | null][]>(() => {
    const valueEntries: [Option, T][] = values.map((value) => [renderOption(value), value])
    return isDefined(emptyOption) ? [[emptyOption, null], ...valueEntries] : valueEntries
  }, [values, renderOption, emptyOption])

  const forwardChange = (value: T | null) => {
    focus({ type: 'set', value })
    onChange(value)
  }

  const navigate: React.KeyboardEventHandler = ({ key }) => {
    switch (key) {
      case 'ArrowDown':
        return focus({ type: 'move', entries, step: 1 })

      case 'ArrowUp':
        return focus({ type: 'move', entries, step: -1 })

      case 'Enter':
        return isDefined(focused) && onChange(focused)
    }
  }

  const renderSelectedOption = (value: T | null) => (
    <Selected>{renderSelected?.(value) ?? (value === null ? emptyOption : renderOption(value))}</Selected>
  )

  const renderList = (select: (value: T | null) => void) => (
    <OptionsContainer>
      {entries.map(([label, val], key) => {
        const onClick: React.MouseEventHandler = (evt) => {
          stopEvent(evt)
          select(val)
        }
        return (
          <OptionItem key={key} selected={val === value} focus={val === focused} onClick={onClick}>
            <TextInlineMedium>{label}</TextInlineMedium>
            {val == value && <CheckboxIcon />}
          </OptionItem>
        )
      })}
    </OptionsContainer>
  )

  return (
    <SelectContainer selectSize={selectSize}>
      {title && <FilterLabel>{title}</FilterLabel>}
      <Select
        placeholder=""
        selected={value}
        onNavigate={navigate}
        onChange={forwardChange}
        onSearch={onSearch}
        renderSelected={renderSelectedOption}
        renderList={renderList}
      />
    </SelectContainer>
  )
}

interface FilterSelectProps<T> extends ControlProps<T | null>, SimpleSelectSizingProps {
  title?: string
  values: T[]
  renderOption?: ValueToOption<T>
  renderSelected?: (value: T | null) => Option
}

export const FilterSelect = <T extends any>(props: FilterSelectProps<T>) => (
  <SimpleSelect {...props} emptyOption="All" />
)

const Selected = styled.div`
  display: block;
  text-transform: capitalize;
  cursor: pointer;
  user-select: none;
  ${Overflow.FullDots};
`

const OptionsContainer = styled.ul`
  position: absolute;
  top: 100%;
  width: 100%;
  max-width: 100%;
  margin-top: -1px;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
  box-shadow: ${Shadows.select};
  user-select: none;
  z-index: 10;
  overflow: hidden;
`

interface OptionProps {
  focus?: boolean
  selected?: boolean
}

const OptionFocused = css`
  color: ${Colors.Blue[500]};
`

const OptionItem = styled.li`
  display: grid;
  grid-template-columns: ${({ selected }) => (selected ? '1fr 16px' : '1fr')};
  grid-column-gap: 16px;
  align-items: center;
  padding: 0 16px;
  font-size: 14px;
  line-height: 20px;
  text-transform: capitalize;
  cursor: pointer;
  transition: ${Transitions.all};
  ${({ focus, selected }: OptionProps) => (selected || focus) && OptionFocused};

  &,
  ${TextInlineMedium} {
    ${Overflow.FullDots};
  }

  &:hover {
    ${OptionFocused}
  }

  ${({ selected }: OptionProps) =>
    selected &&
    css`
      background-color: ${Colors.Blue[50]};
      font-weight: 700;
    `}

  ${CheckboxIconStyles} {
    width: 16px;
    height: 16px;
  }
`

const SelectContainer = styled.label<SimpleSelectSizingProps>`
  display: grid;
  width: 100%;

  ${EmptyOption} {
    padding: 0 16px;
  }

  ${SelectedOption} {
    grid-template-columns: 1fr;
    ${Overflow.FullDots}
  }

  ${Toggle} {
    border: 1px solid ${Colors.Black[200]};
    cursor: pointer;
  }

  ${SelectComponent},
  ${OptionItem} {
    height: ${({ selectSize }) => {
      switch (selectSize) {
        case 's':
        default:
          return '32px;'
        case 'm':
          return '40px'
        case 'l':
          return '48px'
      }
    }};
  }
`
