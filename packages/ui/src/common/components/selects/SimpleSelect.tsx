import React, { Fragment, useCallback, useReducer } from 'react'
import styled from 'styled-components'

import { FilterLabel } from '@/common/components/forms/FilterBox'
import { Colors } from '@/common/constants'
import { isDefined, isString } from '@/common/utils'
import { stopEvent } from '@/common/utils/events'

import { FilterButtons } from '../buttons'

import { Select } from '.'
import { EmptyOption, OptionContainer, Selected } from './components'
import { DefaultSelectProps, OptionNode, OptionProps } from './types'

// Focus management:

type Move<T> = { type: 'move'; options: T[]; step: number }
type Set<T> = { type: 'set'; value: T | null }
type Action<T> = Move<T> | Set<T>

type FocusReducer<T> = (value: T | null, action: Action<T>) => T | null

const cycle = (i: number, s: number, len: number) => (len + i + s) % len

const selectFocusReducer = <T extends any>(value: T | null, action: Action<T>): T | null => {
  switch (action.type) {
    case 'set':
      return action.value

    case 'move': {
      const { options } = action
      const focusedIndex = value === null ? 0 : 1 + options.indexOf(value)
      const toFocusIndex = cycle(focusedIndex, action.step, 1 + options.length)
      return options[toFocusIndex - 1] ?? null
    }
  }
}

// Helpers:

const wrapOption = (option: OptionNode, props: OptionProps, key?: any) =>
  isString(option) ? (
    <OptionContainer key={key} {...props}>
      {option}
    </OptionContainer>
  ) : (
    <Fragment key={key}>{option}</Fragment>
  )

// Component:

interface SimpleSelectProps<Option, Value = Option> extends DefaultSelectProps<Option, Value> {
  emptyOption?: OptionNode
  valueToOption?: (value: Value) => Option | null
  onApply?: () => void
  onClear?: () => void
  onSearch?: (search: string) => void
}

export const SimpleSelect = <Option extends any, Value extends any = Option>({
  title,
  options,
  emptyOption,
  renderOption = String,
  renderSelected,
  valueToOption = (value) => value as Option,
  value,
  onChange,
  onApply,
  onClear,
  onSearch,
}: SimpleSelectProps<Option, Value>) => {
  const [focused, focus] = useReducer(selectFocusReducer as FocusReducer<Option>, valueToOption(value))

  const change = useCallback(
    (pickedOption: Option | null, reset: () => void) => {
      focus({ type: 'set', value: pickedOption })
      !onApply && reset()
      onChange(pickedOption)
    },
    [onChange]
  )

  const navigate: React.KeyboardEventHandler = ({ key }) => {
    switch (key) {
      case 'ArrowDown':
        return focus({ type: 'move', options, step: 1 })

      case 'ArrowUp':
        return focus({ type: 'move', options, step: -1 })

      case 'Enter':
        return isDefined(focused) && onChange(focused)
    }
  }

  const renderSelectedOption = useCallback(
    (value: Value) => {
      if (renderSelected) {
        const selectedNode = renderSelected(value)
        return isString(selectedNode) ? <Selected>{selectedNode}</Selected> : selectedNode
      } else {
        const option = valueToOption(value)
        return <Selected>{option === null ? emptyOption : renderOption(option)}</Selected>
      }
    },
    [value, emptyOption]
  )

  const renderList = useCallback(
    (select: (option: Option | null) => void, toggle: () => void) => {
      const apply =
        onApply &&
        (() => {
          toggle()
          onApply()
        })

      const optionProps = (option: Option | null): OptionProps => ({
        selected: option === value,
        focus: option === focused,
        onClick: (evt) => {
          stopEvent(evt)
          select(option)
        },
      })

      const nullOption = emptyOption && wrapOption(emptyOption, optionProps(null))

      const optionList = options.map((option, key) => {
        const props = optionProps(option)
        const optionNode = renderOption(option, props)
        return wrapOption(optionNode, props, key)
      })

      const footer = apply && (
        <OptionsFooter>
          <FilterButtons onApply={apply} onClear={onClear} />
        </OptionsFooter>
      )

      return (
        <Options>
          {nullOption}
          {optionList}
          {footer}
        </Options>
      )
    },
    [JSON.stringify(options), focused, value, emptyOption]
  )

  return (
    <SelectContainer>
      {title && <FilterLabel>{title}</FilterLabel>}
      <Select
        placeholder=""
        selected={value}
        onNavigate={navigate}
        onChange={change}
        onSearch={onSearch}
        renderSelected={renderSelectedOption}
        renderList={renderList}
      />
    </SelectContainer>
  )
}

const SelectContainer = styled.label`
  display: block;
  flex-basis: 184px;
  width: 184px;

  ${EmptyOption} {
    padding: 0 16px;
  }
  & > :last-child {
    height: 48px;
  }
`

const Options = styled.div`
  background: ${Colors.White};
  border: 1px solid ${Colors.Black[300]};
  border-radius: 2px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 100%;
  user-select: none;
  min-width: 100%;
  z-index: 10;
`

const OptionsFooter = styled.div`
  display: flex;
`
