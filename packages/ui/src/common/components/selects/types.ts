import { MouseEventHandler, ReactNode } from 'react'

import { ControlProps } from '../forms'

  disabled?: boolean
  placeholder: string
  selected?: T
  onNavigate?: React.KeyboardEventHandler
  onChange: (selected: T) => void
  onSearch?: (search: string) => void

export type OptionNode = string | ReactNode

export interface OptionProps {
  selected: boolean
  focus: boolean
  onClick?: MouseEventHandler
}

export interface DefaultSelectProps<T> extends ControlProps<T> {
  title?: string
  options: T[]
  renderOption?: (option: T, props?: OptionProps) => OptionNode
  renderSelected?: (value: T) => OptionNode
}
