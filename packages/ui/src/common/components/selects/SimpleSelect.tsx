import React, { useState } from 'react'
import styled from 'styled-components'

import { Colors } from '../../constants'
import { ControlProps } from '../forms'

import { Select } from '.'

interface SimpleSelectProps<T> extends ControlProps<T> {
  title?: string
  options: { [label: string]: T }
}
export const SimpleSelect = <T extends any>({ title = '', options, value, onChange }: SimpleSelectProps<T>) => {
  const [focused, focus] = useState(value)
  const entries = Object.entries(options) as [string, T][]

  return (
    <SelectContainer
      onKeyDown={({ key }) => {
        if (onChange && typeof focused !== 'undefined' && (key === 'Enter' || key === 'Tab')) {
          onChange(focused)
        }
      }}
    >
      {title && <LabelSelect>{title}</LabelSelect>}
      <Select
        placeholder=""
        selected={value}
        onChange={(value) => {
          focus(value)
          onChange && onChange(value)
        }}
        onSearch={(search) => {
          const re = RegExp(search, 'i')
          const value = entries.find(([label]) => re.test(label))?.[1]
          focus(value)
        }}
        renderSelected={(value) => <Selected>{entries.find(([, v]) => v === value)?.[0]}</Selected>}
        renderList={(select) => (
          <OptionsContainer>
            {entries.map(([label, value], key) => (
              <Option key={key} onClick={() => select(value)} focus={value === focused}>
                {label}
              </Option>
            ))}
          </OptionsContainer>
        )}
      />
    </SelectContainer>
  )
}

const SelectContainer = styled.div`
  display: flex;
  & > div {
    width: 250px;
  }
`
const LabelSelect = styled.label`
  color: ${Colors.Grey};
  line-height: 48px;
  margin: 0 1rem;
  white-space: nowrap;
`
const Selected = styled.label`
  display: block;
  text-transform: capitalize;
  padding: 0.5rem;
`
const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 10;
`

const Option = styled.label`
  display: block;
  background: ${({ focus }: { focus?: boolean }) => (focus ? Colors.Blue[50] : '#fff')};
  padding: 1rem;
  text-transform: capitalize;
`
