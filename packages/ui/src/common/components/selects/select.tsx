import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useToggle } from '../../hooks/useToggle'
import { isDefined } from '../../utils'
import { stopEvent } from '../../utils/events'
import { Toggle } from '../buttons/Toggle'

import { EmptyOption, SelectComponent, SelectedOption, SelectToggleButton } from './components'
import { SelectProps } from './types'

export const Select = <T extends any, V extends any = T>({
  disabled,
  placeholder,
  selected,
  onNavigate,
  onChange,
  onSearch,
  renderSelected,
  renderList,
}: SelectProps<T, V>) => {
  const [filterInput, setFilterInput] = useState('')
  const search = filterInput
  const [isOpen, toggleOpen] = useToggle()
  const [selectedOption, setSelectedOption] = useState<V | undefined>(selected)
  const selectNode = useRef<HTMLDivElement>(null)
  const textInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    onSearch?.(search)
  }, [search])

  const onOptionClick = useCallback(
    (option: T) => {
      onChange(option, () => {
        toggleOpen()
        setFilterInput('')
      })
    },
    [toggleOpen, onChange]
  )

  useEffect(() => {
    if (isDefined(selected)) {
      setSelectedOption(selected)
    }
  }, [selected])

  useEffect(() => {
    const clickListener = (event: MouseEvent) => {
      if (isOpen && selectNode.current && !event.composedPath().includes(selectNode.current)) {
        toggleOpen()
        setFilterInput('')
      }
    }
    document.addEventListener('mousedown', clickListener)

    return () => document.removeEventListener('mousedown', clickListener)
  }, [isOpen])

  useEffect(() => {
    const escListener = (event: KeyboardEvent) => {
      if (isOpen && ['Tab', 'Escape'].includes(event.key)) {
        toggleOpen()
        setFilterInput('')
      }
    }
    document.addEventListener('keydown', escListener)

    return () => document.removeEventListener('keydown', escListener)
  }, [isOpen])

  useEffect(() => {
    isOpen && textInput.current?.focus()
  }, [isOpen])

  const onToggleClick: React.MouseEventHandler = (evt) => {
    stopEvent(evt)
    !disabled && toggleOpen()
  }

  const onKeyDown: React.KeyboardEventHandler = (evt) => {
    const { key } = evt
    if (['ArrowDown', 'ArrowUp', 'Enter'].includes(key)) {
      // These interaction should open the select when it's closed (and enter should always toggle it)
      stopEvent(evt)
      onNavigate?.(evt)
      ;(!isOpen || key === 'Enter') && toggleOpen()
    }
  }

  return (
    <SelectComponent ref={selectNode} tabIndex={-1} onKeyDown={onKeyDown}>
      <Toggle onClick={isOpen ? undefined : onToggleClick} isOpen={isOpen} disabled={disabled}>
        {onSearch && (isOpen || !isDefined(selectedOption)) ? (
          <EmptyOption
            ref={textInput}
            type="text"
            placeholder={placeholder}
            autoComplete="off"
            value={filterInput}
            disabled={disabled}
            onChange={(t) => setFilterInput(t.target.value)}
          />
        ) : (
          <SelectedOption>{isDefined(selectedOption) && renderSelected(selectedOption)}</SelectedOption>
        )}

        <SelectToggleButton isOpen={isOpen} disabled={disabled} onToggleClick={onToggleClick} />
      </Toggle>
      {isOpen && renderList(onOptionClick, toggleOpen)}
    </SelectComponent>
  )
}
