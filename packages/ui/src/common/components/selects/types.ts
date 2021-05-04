import React, { ReactNode } from 'react'

export interface SelectProps<T> {
  disabled?: boolean
  placeholder: string
  selected?: T
  alwaysShowValue?: boolean
  setToggle?: React.Dispatch<React.SetStateAction<(() => void) | undefined>>
  onChange: (selected: T) => void
  onSearch?: (search: string) => void
  renderSelected: (option: T) => ReactNode
  renderList: (onOptionClick: (option: T) => void) => ReactNode
}
