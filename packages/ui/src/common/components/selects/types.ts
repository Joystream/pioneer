import { ReactNode } from 'react'

export interface SelectProps<T> {
  disabled?: boolean
  placeholder: string
  selected?: T
  onChange: (selected: T) => void
  onSearch: (search: string) => void
  renderSelected: (option: T) => ReactNode
  renderList: (onOptionClick: (option: T) => void) => ReactNode
}
