import React, { Fragment, useCallback, useReducer } from 'react'
import styled from 'styled-components'

import { FilterLabel } from '@/common/components/forms/FilterBox'
import { BorderRad, Colors, Overflow, RemoveScrollbar, Shadows, ZIndex } from '@/common/constants'
import { isDefined, isString } from '@/common/utils'
import { stopEvent } from '@/common/utils/events'

import { FilterButtons } from '../buttons'
import { Toggle, ToggleButton } from '../buttons/Toggle'
import { CheckboxIcon } from '../icons'
import { TextInlineMedium } from '../typography'

import { Select } from '.'
import { EmptyOption, OptionContainer, SelectComponent, Selected, SelectedOption } from './components'
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
      <TextInlineMedium>{option}</TextInlineMedium>
      {props.selected && <CheckboxIcon />}
    </OptionContainer>
  ) : (
    <Fragment key={key}>{option}</Fragment>
  )

// Component:

export interface SimpleSelectSizingProps {
  selectSize?: 's' | 'm' | 'l'
}

interface SimpleSelectProps<Option, Value = Option> extends DefaultSelectProps<Option, Value>, SimpleSelectSizingProps {
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
  selectSize,
  renderOption = String,
  renderSelected,
  valueToOption = (value) => value as unknown as Option, // The default only works if Value and Option are the same type
  optionEquals = (optionA) => (optionB) => optionA === optionB,
  value,
  onChange,
  onApply,
  onClear,
  onSearch,
}: SimpleSelectProps<Option, Value>) => {
  const [focused, focus] = useReducer(selectFocusReducer as FocusReducer<Option>, valueToOption(value))

  const change = useCallback(
    (pickedOption: Option | null, close: () => void) => {
      focus({ type: 'set', value: pickedOption })
      !onApply && close()
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

  const equals = (reference: Option | null): ((compared: Option | null) => boolean) => {
    const isReference = reference !== null && optionEquals(reference)
    return isReference ? (compared) => compared !== null && isReference(compared) : (compared) => compared === null
  }
  const isSelected = useCallback(equals(valueToOption(value)), [value])
  const isFocused = useCallback(equals(focused), [focused])

  const renderList = useCallback(
    (select: (option: Option | null) => void, toggle: () => void) => {
      const apply =
        onApply &&
        (() => {
          toggle()
          onApply()
        })

      const optionProps = (option: Option | null): OptionProps => ({
        selected: isSelected(option),
        focus: isFocused(option),
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
          <OptionsContainer selectSize={selectSize}>
            {nullOption}
            {optionList}
          </OptionsContainer>
          {footer}
        </Options>
      )
    },
    [JSON.stringify(options), emptyOption, isSelected, isFocused]
  )

  return (
    <SelectContainer selectSize={selectSize}>
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

export const SelectContainer = styled.label<SimpleSelectSizingProps>`
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
    border: 1px solid ${Colors.Black[300]};
    cursor: pointer;
  }

  ${ToggleButton} {
    height: 100%;
  }

  ${OptionContainer},
  ${SelectComponent} {
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

  &:hover,
  &:focus,
  &:focus-within,
  &:active {
    ${FilterLabel} {
      color: ${Colors.Blue[400]};
    }

    ${Toggle} {
      border-color: ${Colors.Blue[400]};
      box-shadow: ${Shadows.focusDefault};
    }
  }
`

const Options = styled.div`
  margin-top: -1px;
  background-color: ${Colors.White};
  border: 1px solid ${Colors.Black[300]};
  border-top: 1px solid ${Colors.Blue[400]};
  border-radius: ${BorderRad.s};
  box-shadow: ${Shadows.select};
  position: absolute;
  top: 100%;
  user-select: none;
  min-width: 100%;
  width: 100%;
  max-width: 100%;
  ${Overflow.FullDots};
  z-index: ${ZIndex.select};
`

const numberOfVisibleOptions = 6.5

const OptionsContainer = styled.div<SimpleSelectSizingProps>`
  width: 100%;
  height: fit-content;
  max-height: ${({ selectSize }) => {
    switch (selectSize) {
      case 's':
      default:
        return 32 * numberOfVisibleOptions + 'px'
      case 'm':
        return 40 * numberOfVisibleOptions + 'px'
      case 'l':
        return 48 * numberOfVisibleOptions + 'px'
    }
  }};
  overflow: hidden;
  overflow-y: scroll;
  ${RemoveScrollbar};
`

const OptionsFooter = styled.div`
  display: flex;
  margin: -1px;

  & > * {
    flex-grow: 1;
  }
`
