import React, { useReducer } from 'react'
import styled, { css } from 'styled-components'

import { ControlProps } from '@/common/components/forms'
import { FilterLabel } from '@/common/components/forms/FilterBox'
import { Colors } from '@/common/constants'
import { isDefined } from '@/common/utils'
import { stopEvent } from '@/common/utils/events'

import { Select } from '.'

interface SimpleSelectProps<T> extends ControlProps<T> {
  title?: string
  options: { [label: string]: T }
}

type Move<T> = { type: 'move'; entries: [string, T][]; step: number }
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

export const SimpleSelect = <T extends any>({ title = '', options, value, onChange }: SimpleSelectProps<T>) => {
  const [focused, focus] = useReducer(selectFocusReducer as FocusReducer<T>, value)
  const entries = Object.entries(options) as [string, T][]

  const forwardChange = (value: T) => {
    focus({ type: 'set', value })
    onChange?.(value)
  }

  const navigate: React.KeyboardEventHandler = ({ key }) => {
    switch (key) {
      case 'ArrowDown':
        return focus({ type: 'move', entries, step: 1 })

      case 'ArrowUp':
        return focus({ type: 'move', entries, step: -1 })

      case 'Enter':
        return isDefined(focused) && onChange?.(focused)
    }
  }

  const renderSelected = (value: T) => <Selected>{entries.find(([, v]) => v === value)?.[0]}</Selected>

  const renderList = (select: (value: T) => void) => (
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
      {title && (
        <FilterLabel lighter bold>
          {title}
        </FilterLabel>
      )}
      <Select
        placeholder=""
        selected={value}
        onNavigate={navigate}
        onChange={forwardChange}
        renderSelected={renderSelected}
        renderList={renderList}
        alwaysShowValue
      />
    </SelectContainer>
  )
}

const SelectContainer = styled.label`
  display: block;
  & > :last-child {
    height: 48px;
    min-width: 250px;
  }
`

const Selected = styled.div`
  display: block;
  text-transform: capitalize;
  padding: 0.5rem 0;
`
const OptionsContainer = styled.div`
  background: ${Colors.White};
  border: 1px solid ${Colors.Black[300]};
  border-radius: 2px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 100%;
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
