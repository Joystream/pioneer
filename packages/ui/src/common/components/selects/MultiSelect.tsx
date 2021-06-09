import React, { useCallback } from 'react'
import styled from 'styled-components'

import { equals, intersperse, isString } from '@/common/utils'

import { DefaultSelectProps, OptionContainer, Selected, SimpleSelect } from '.'
import { OptionNode, OptionProps, RenderOption } from './types'

interface MultiSelectProps<T extends any> extends DefaultSelectProps<T, T[], T[]> {
  emptyOption?: OptionNode
  onApply: (value: T[]) => void
}

const defaultRenderSelected = <T extends any>(renderOption: RenderOption<T>) => (value: T[]) => {
  const optionNodes = value.map((option) => renderOption(option))
  const nodes = optionNodes.some(isString) ? optionNodes.map((node) => <u>{node}</u>) : optionNodes
  return <MultiSelected>{intersperse(nodes, ' ')}</MultiSelected>
}

export const MultiSelect = <T extends any>({
  renderOption = String,
  renderSelected = defaultRenderSelected(renderOption),
  onApply,
  onChange,
  ...props
}: MultiSelectProps<T>) => {
  const { value, options } = props

  const change = useCallback(
    (pickedOption: T | null) => {
      if (pickedOption === null) {
        onChange([])
      } else {
        const isPickedOption = equals(pickedOption)
        onChange(
          value.some(isPickedOption)
            ? // Remove from selection
              value.filter((option) => !isPickedOption(option))
            : // Add to selection (keep the `options` sorting order)
              options.filter((option) => isPickedOption(option) || value.some(equals(option)))
        )
      }
    },
    [value, options]
  )

  const apply = () => onApply?.(value)

  const clear =
    value.length === 0
      ? undefined
      : () => {
          onChange([])
          onApply?.([])
        }

  const renderMultiSelectOption = (option: T, props?: OptionProps) => {
    const { focus = false, onClick } = props ?? {}
    const selected = value.some(equals(option))
    return (
      <OptionContainer focus={focus} selected={selected} onClick={onClick}>
        {renderOption(option)}
      </OptionContainer>
    )
  }

  return (
    <SimpleSelect
      valueToOption={(value) => value[0] ?? null}
      renderOption={renderMultiSelectOption}
      renderSelected={renderSelected}
      onChange={change}
      onApply={apply}
      onClear={clear}
      {...props}
    />
  )
}

export const MultiSelected = styled(Selected)`
  word-spacing: 8px;
  & > * {
    display: inline-block;
  }
`
