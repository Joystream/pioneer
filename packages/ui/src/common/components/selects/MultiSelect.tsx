import React, { useCallback } from 'react'

import { objectEquals } from '@/common/utils'

import { DefaultSelectProps, OptionContainer, OptionNode, OptionProps, SimpleSelect } from '.'

interface MultiSelectProps<T extends Record<string, any>> extends DefaultSelectProps<T, T[], T[]> {
  emptyOption?: OptionNode
  onApply: () => void
  onClear?: () => void
}

export const MultiSelect = <T extends Record<string, any>>({
  onChange,
  renderOption = String,
  ...props
}: MultiSelectProps<T>) => {
  const { value, options } = props

  const change = useCallback(
    (pickedOption: T | null) => {
      if (pickedOption === null) {
        onChange([])
      } else {
        const isPickedOption = objectEquals(pickedOption)
        onChange(
          value.some(isPickedOption)
            ? // Remove from selection
              value.filter((option) => !isPickedOption(option))
            : // Add to selection (keep the `options` sorting order)
              options.filter((option) => isPickedOption(option) || value.some(objectEquals(option)))
        )
      }
    },
    [value, options]
  )

  const renderMultiSelectOption = (option: T, props?: OptionProps) => {
    const { focus = false, onClick } = props ?? {}
    const selected = value.some(objectEquals(option))
    return (
      <OptionContainer focus={focus} selected={selected} onClick={onClick}>
        {renderOption(option)}
      </OptionContainer>
    )
  }

  return (
    <SimpleSelect
      {...props}
      onChange={change}
      valueToOption={(value) => value[0] ?? null}
      renderOption={renderMultiSelectOption}
    />
  )
}
