import { ModifierPhases } from '@popperjs/core/lib/enums'
import { ModifierArguments } from '@popperjs/core/lib/types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { usePopper } from 'react-popper'
import styled from 'styled-components'

import { ZIndex } from '@/common/constants'
import { useEscape } from '@/common/hooks/useEscape'

import { useToggle } from '../../hooks/useToggle'
import { isDefined } from '../../utils'
import { stopEvent } from '../../utils/events'
import { Toggle } from '../buttons/Toggle'

import { EmptyOption, SelectComponent, SelectToggleButton } from './components'
import { SelectProps } from './types'

const sameWidthModifier = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite' as ModifierPhases,
  requires: ['computeStyles'],
  fn: ({ state }: ModifierArguments<Record<string, unknown>>) => {
    state.styles.popper.width = `${state.rects.reference.width}px`
  },
  effect: ({ state }: ModifierArguments<Record<string, unknown>>) => {
    state.elements.popper.style.width = `${(state.elements.reference as any).offsetWidth}px`
  },
}

const flipModifier = {
  name: 'flip',
  options: {
    fallbackPlacements: ['top', 'right'],
  },
}

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
  const [popperElementRef, setPopperElementRef] = useState<HTMLDivElement | null>(null)

  const { styles, attributes } = usePopper(selectNode.current, popperElementRef, {
    placement: 'bottom',
    modifiers: [sameWidthModifier, flipModifier],
  })
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

      if (
        isOpen &&
        selectNode.current &&
        popperElementRef &&
        !(event.composedPath().includes(popperElementRef) || event.composedPath().includes(selectNode.current))
      ) {
        if (shouldToggle) {
          toggleOpen()
        }
        setFilterInput('')
      }
    }
    document.addEventListener('mousedown', clickListener)

    return () => document.removeEventListener('mousedown', clickListener)
  }, [isOpen, popperElementRef])

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
    <>
      <SelectComponent ref={selectNode} id={id} tabIndex={-1} onKeyDown={onKeyDown} className={className}>
        <Toggle onClick={isOpen ? undefined : onToggleClick} isOpen={isOpen} disabled={disabled}>
          <SelectToggleButton isOpen={isOpen} disabled={disabled} onToggleClick={onToggleClick} />

          {onSearch && (isOpen || !isDefined(selected)) ? (
            <EmptyOption
              id={`${id}-input`}
              ref={textInput}
              type="text"
              placeholder={placeholder}
              autoComplete="new-password"
              value={filterInput}
              disabled={disabled}
              onChange={(t) => setFilterInput(t.target.value)}
            />
          ) : (
            isDefined(selected) && renderSelected(selected)
          )}
        </Toggle>
      </SelectComponent>
      {isOpen &&
        ReactDOM.createPortal(
          <SelectPopper
            id="select-popper-wrapper"
            ref={setPopperElementRef}
            style={styles.popper}
            {...attributes.popper}
          >
            {renderList(onOptionClick, toggleOpen)}
          </SelectPopper>,
          document.body
        )}
    </>
  )
}

const SelectPopper = styled.div`
  z-index: ${ZIndex.popover};
`
