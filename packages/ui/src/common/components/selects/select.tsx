import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useEscape } from '@/common/hooks/useEscape'

import { useToggle } from '../../hooks/useToggle'
import { isDefined } from '../../utils'
import { stopEvent } from '../../utils/events'
import { Toggle } from '../buttons/Toggle'

import { EmptyOption, SelectComponent, SelectToggleButton } from './components'
import { SelectProps } from './types'

export const Select = <T extends any, V extends any = T>({
  id,
  disabled,
  placeholder,
  selected,
  onNavigate,
  onChange,
  onSearch,
  renderSelected,
  renderList,
  className,
  onBlur,
}: SelectProps<T, V>) => {
  const [filterInput, setFilterInput] = useState('')
  const search = filterInput
  const [isOpen, toggleOpen] = useToggle()
  const selectNode = useRef<HTMLDivElement>(null)
  const textInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    onSearch?.(search)
  }, [search])

  const onOptionClick = useCallback(
    (option: T) => {
      onChange(option, () => {
        toggleOpen()
        onBlur?.()
        setFilterInput('')
      })
    },
    [toggleOpen, onChange]
  )

  useEffect(() => {
    const clickListener = (event: MouseEvent) => {
      // for enabling links in tooltips in AccountLockTooltip:
      const tooltipLinks = document.getElementsByClassName('tooltipLink')
      const shouldToggle =
        tooltipLinks.length > 0
          ? !event.composedPath().some((path) => Array.from(tooltipLinks).includes(path as Element))
          : true

      if (isOpen && selectNode.current && !event.composedPath().includes(selectNode.current)) {
        if (shouldToggle) {
          toggleOpen()
        }
        setFilterInput('')
      }
    }
    document.addEventListener('mousedown', clickListener)

    return () => document.removeEventListener('mousedown', clickListener)
  }, [isOpen])

  useEscape(() => {
    setFilterInput('')
    toggleOpen()
  })

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
    <SelectComponent ref={selectNode} id={id} tabIndex={-1} onKeyDown={onKeyDown} className={className}>
      <Toggle onClick={isOpen ? undefined : onToggleClick} isOpen={isOpen} disabled={disabled}>
        <SelectToggleButton isOpen={isOpen} disabled={disabled} onToggleClick={onToggleClick} />

        {onSearch && (isOpen || !isDefined(selected)) ? (
          <EmptyOption
            id={`${id}-input`}
            ref={textInput}
            type="text"
            placeholder={placeholder}
            autoComplete="off"
            value={filterInput}
            disabled={disabled}
            onChange={(t) => setFilterInput(t.target.value)}
          />
        ) : (
          isDefined(selected) && renderSelected(selected)
        )}
      </Toggle>
      {isOpen && renderList(onOptionClick, toggleOpen)}
    </SelectComponent>
  )
}
