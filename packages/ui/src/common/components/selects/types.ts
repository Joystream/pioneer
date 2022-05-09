import { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react'

import { ControlProps } from '../forms'

export interface SelectProps<T, V = T> {
  id?: string
  disabled?: boolean
  placeholder: string
  selected?: V
  onNavigate?: KeyboardEventHandler
  onChange: (selected: T, close: () => void) => void
  onSearch?: (search: string) => void
  onBlur?: () => void
  renderSelected: (option: V) => ReactNode
  renderList: (onOptionClick: (option: T) => void, toggle: () => void) => ReactNode
  className?: string
}

export type OptionNode = ReactNode

export interface OptionProps {
  selected: boolean
  focus: boolean
  disabled?: boolean
  onClick?: MouseEventHandler
}

export type RenderOption<Option> = (option: Option, props?: OptionProps) => OptionNode

export interface DefaultSelectProps<Option, Value = Option | null, Change = Option | null>
  extends ControlProps<Value, Change> {
  title?: string
  options: Option[]
  optionEquals?: (optionA: Option) => (optionB: Option) => boolean
  renderOption?: RenderOption<Option>
  renderSelected?: (value: Value) => OptionNode
}
