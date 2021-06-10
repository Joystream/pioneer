import { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react'

import { ControlProps } from '../forms'

export interface SelectProps<T, V> {
  disabled?: boolean
  placeholder: string
  selected?: V
  onNavigate?: KeyboardEventHandler
  onChange: (selected: T, close: () => void) => void
  onSearch?: (search: string) => void
  renderSelected: (option: V) => ReactNode
  renderList: (onOptionClick: (option: T) => void, toggle: () => void) => ReactNode
}

export type OptionNode = string | ReactNode

export interface OptionProps {
  selected: boolean
  focus: boolean
  onClick?: MouseEventHandler
}

export type RenderOption<Option> = (option: Option, props?: OptionProps) => OptionNode

export interface DefaultSelectProps<Option, Value = Option | null, Change = Option | null>
  extends ControlProps<Value, Change> {
  title?: string
  options: Option[]
  renderOption?: RenderOption<Option>
  renderSelected?: (value: Value) => OptionNode
}
