export interface SelectProps<T> {
  onChange: (selected: T) => void
  filter?: (option: T) => boolean
  selected?: T
  disabled?: boolean
}

export interface OptionListProps<T> {
  options: T[]
  onChange: (option: T) => void
}
