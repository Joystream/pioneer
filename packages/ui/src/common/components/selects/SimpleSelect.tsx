import { isDefined } from '@/common/utils'
import React, { useEffect, useReducer, useState } from 'react'
import styled, { css } from 'styled-components'

import { Colors } from '../../constants'
import { ControlProps } from '../forms'

import { Select } from '.'

let timeout: ReturnType<typeof setTimeout>

interface SimpleSelectProps<T> extends ControlProps<T> {
  title?: string
  options: { [label: string]: T }
}

type Search<T> = { type: 'search'; entries: [string, T][]; search: string }
type Move<T> = { type: 'move'; entries: [string, T][]; step: number }
type Set<T> = { type: 'set'; value: T | undefined }
type Action<T> = Search<T> | Move<T> | Set<T>

type FocusReducer<T> = (value: T | undefined, action: Action<T>) => T | undefined

const cycle = (i: number, s: number, len: number) => (len + i + s) % len

const selectFocusReducer = <T extends any>(value: T | undefined, action: Action<T>): T | undefined => {
  switch (action.type) {
    case 'set':
      return action.value

    case 'search': {
      const re = RegExp(action.search, 'i')
      return action.entries.find(([label]) => re.test(label))?.[1]
    }

    case 'move': {
      const focusedIndex = typeof value !== undefined ? action.entries.findIndex(([, v]) => v === value) : -1
      const toFocusIndex = focusedIndex >= 0 ? cycle(focusedIndex, action.step, action.entries.length) : undefined
      return action.entries[toFocusIndex ?? 0]?.[1]
    }
  }
}

export const SimpleSelect = <T extends any>({ title = '', options, value, onChange }: SimpleSelectProps<T>) => {
  const [focused, focus] = useReducer(selectFocusReducer as FocusReducer<T>, value)
  const [toggle, setToggle] = useState<() => void>()
  const [search, setSearch] = useState('')

  const entries = Object.entries(options) as [string, T][]

  useEffect(() => {
    timeout && clearTimeout(timeout)
    if (search) {
      focus({ type: 'search', entries, search })
      timeout = setTimeout(() => {
        setSearch('')
      }, 1000)
    }
    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [search])

  return (
    <SelectContainer
      onKeyDown={(evt) => {
        const { key } = evt
        if (entries.length > 0) {
          if (key === 'ArrowDown') {
            focus({ type: 'move', entries, step: 1 })
            evt.stopPropagation()
          } else if (key === 'ArrowUp') {
            focus({ type: 'move', entries, step: -1 })
            evt.stopPropagation()
          } else if (onChange && isDefined(focused) && (key === 'Enter' || key === 'Tab')) {
            onChange(focused)
            toggle?.()
            evt.stopPropagation()
          } else if (key.length === 1) {
            const char = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].includes(key)
              ? `\\${key}`
              : key
            setSearch(search + char)
            evt.stopPropagation()
          }
        }
      }}
    >
      {title && <LabelSelect>{title}</LabelSelect>}
      <Select
        placeholder=""
        selected={value}
        setToggle={setToggle}
        onChange={(value) => {
          focus({ type: 'set', value })
          onChange && onChange(value)
        }}
        renderSelected={(value) => <Selected>{entries.find(([, v]) => v === value)?.[0]}</Selected>}
        renderList={(select) => (
          <OptionsContainer>
            {entries.map(([label, val], key) => (
              <Option key={key} onClick={() => select(val)} selected={val === value} focus={val === focused}>
                {label}
              </Option>
            ))}
          </OptionsContainer>
        )}
        alwaysShowValue
      />
    </SelectContainer>
  )
}

const SelectContainer = styled.div`
  display: flex;
  & > div {
    height: auto;
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
  padding: 0.5rem 0;
`
const OptionsContainer = styled.div`
  background: ${Colors.White};
  border: 1px solid ${Colors.Black[300]};
  border-radius: 2px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 10;
`

interface OptionProps {
  focus?: boolean
  selected?: boolean
}
const OptionFocused = css`
  color: ${Colors.Blue[500]};
`
const Option = styled.label`
  display: block;
  padding: 1rem;
  text-transform: capitalize;
  ${({ focus, selected }: OptionProps) => (selected || focus) && OptionFocused}
  &:hover {
    ${OptionFocused}
  }
  ${({ selected }: OptionProps) =>
    selected &&
    css`
      background: ${Colors.Blue[50]};
      font-weight: bold;
    `}
`
