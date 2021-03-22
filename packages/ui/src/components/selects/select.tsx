import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useToggle } from '../../hooks/useToggle'
import { Toggle, ToggleButton } from '../buttons/Toggle'
import { ArrowDownIcon } from '../icons'
import { EmptyOption, SelectComponent, SelectedOption } from './components'
import { SelectProps } from './types'

export const Select = <T extends any>({
  disabled,
  placeholder,
  selected,
  onChange,
  onSearch,
  renderSelected,
  renderList,
}: SelectProps<T>) => {
  const [filterInput, setFilterInput] = useState('')
  const search = filterInput
  const [isOpen, toggleOpen] = useToggle()
  const [selectedOption, setSelectedOption] = useState<T | undefined>(selected)
  const selectNode = useRef<HTMLDivElement>(null)
  const textInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    onSearch(search)
  }, [search])

  const onOptionClick = useCallback(
    (option: T) => {
      toggleOpen()
      setSelectedOption(option)
      onChange(option)
      setFilterInput('')
    },
    [toggleOpen]
  )

  useEffect(() => {
    if (selected) {
      setSelectedOption(selected)
      onChange(selected)
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
      if (isOpen && event.key === 'Escape') {
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

  const onToggleClick = () => {
    !isOpen && !disabled && toggleOpen()
  }

  return (
    <SelectComponent ref={selectNode}>
      <Toggle onClick={onToggleClick} isOpen={isOpen} disabled={disabled}>
        {selectedOption && !isOpen && <SelectedOption>{renderSelected(selectedOption)}</SelectedOption>}
        {(!selectedOption || isOpen) && (
          <EmptyOption
            ref={textInput}
            type="text"
            placeholder={placeholder}
            autoComplete="off"
            value={filterInput}
            disabled={disabled}
            onChange={(t) => setFilterInput(t.target.value)}
          />
        )}
        <ToggleButton className="ui-toggle" disabled={disabled}>
          <ArrowDownIcon />
        </ToggleButton>
      </Toggle>
      {isOpen && renderList(onOptionClick)}
    </SelectComponent>
  )
}
