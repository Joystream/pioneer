import React, { ReactNode, useMemo, useReducer } from 'react'
import styled, { css } from 'styled-components'

import { ControlProps } from '@/common/components/forms'
import { FilterLabel } from '@/common/components/forms/FilterBox'
import { Colors } from '@/common/constants'
import { isDefined } from '@/common/utils'
import { stopEvent } from '@/common/utils/events'

import { Select } from '.'
import { EmptyOption } from './components'

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

interface SimpleSelectProps<T> extends FilterSelectProps<T> {
  emptyOption?: Option
  onSearch?: (search: string) => void
}

export const SimpleSelect = <T extends any>({
  title,
  options,
  emptyOption,
  renderOption = String,
  renderSelected,
  value,
  onChange,
  onSearch,
}: SimpleSelectProps<T>) => {
  const [focused, focus] = useReducer(selectFocusReducer as FocusReducer<T | null>, value)

  const entries = useMemo<[Option, T | null][]>(() => {
    const valueEntries: [Option, T][] = options.map((value) => [renderOption(value), value])
    return isDefined(emptyOption) ? [[emptyOption, null], ...valueEntries] : valueEntries
  }, [options, renderOption, emptyOption])

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
          <Option key={key} selected={val === value} focus={val === focused} onClick={onClick}>
            {label}
          </Option>
        )
      })}
    </OptionsContainer>
  )

  return (
    <SelectContainer>
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

interface FilterSelectProps<T> extends ControlProps<T | null> {
  title?: string
  options: T[]
  renderOption?: ValueToOption<T>
  renderSelected?: (value: T | null) => Option
}

export const FilterSelect = <T extends any>(props: FilterSelectProps<T>) => (
  <SimpleSelect {...props} emptyOption="All" />
)

const SelectContainer = styled.label`
  display: block;

  ${EmptyOption} {
    padding: 0 16px;
  }
  & > :last-child {
    height: 48px;
  }
`

const Selected = styled.div`
  cursor: pointer;
  display: block;
  text-transform: capitalize;
  padding: 0.5rem 0;
  grid-column: span 2;
  user-select: none;
`
const OptionsContainer = styled.div`
  background: ${Colors.White};
  border: 1px solid ${Colors.Black[300]};
  border-radius: 2px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 100%;
  user-select: none;
  width: 100%;
  z-index: 10;
`

interface OptionProps {
  focus?: boolean
  selected?: boolean
}
const OptionFocused = css`
  color: ${Colors.Blue[500]};
`
const Option = styled.div`
  cursor: pointer;
  display: block;
  padding: 1rem;
  text-transform: capitalize;
  ${({ focus, selected }: OptionProps) => (selected || focus) && OptionFocused}
  &:hover {
    ${OptionFocused}
  }
  ${({ selected }: OptionProps) =>
    selected &&
    css`
      background: ${Colors.Blue[50]};
      font-weight: bold;
    `}
`
