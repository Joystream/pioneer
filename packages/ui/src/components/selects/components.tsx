import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { BorderRad, Colors, Shadows, Sizes, Transitions } from '../../constants'
import { useToggle } from '../../hooks/useToggle'
import { Toggle, ToggleButton } from '../buttons/Toggle'
import { ArrowDownIcon } from '../icons'

interface Props {
  children: ReactNode
  onClick: () => void
}

export const Option = ({ children, onClick }: Props) => (
  <OptionComponentContainer onClick={onClick}>
    <OptionComponent>{children}</OptionComponent>
  </OptionComponentContainer>
)

interface OptionSectionHeaderProps {
  children: ReactNode
}

export const OptionSectionHeader = ({ children }: OptionSectionHeaderProps) => (
  <OptionComponentContainer>
    <OptionHeaderComponent>{children}</OptionHeaderComponent>
  </OptionComponentContainer>
)

export const SelectedOption = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  min-height: ${Sizes.selectHeight};
  max-height: ${Sizes.selectHeight};
  padding: 10px 28px 10px 16px;
`

export const EmptyOption = styled.input`
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: ${Colors.Black[900]};
  width: 100%;
  height: 100%;
  padding: 16px;
  border: none;
  outline: none;
  background-color: transparent;

  &::placeholder {
    font-size: 14px;
    line-height: 45px;
    font-weight: 400;
    color: ${Colors.Black[400]};
  }
  &:disabled {
    cursor: not-allowed;
  }
`

export const SelectComponent = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
`

export const OptionComponentContainer = styled.li`
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.s};
  background-color: transparent;
`

export const OptionComponent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  width: 100%;
  height: 100%;
  border: none;
  background: ${Colors.White};
  cursor: pointer;
  border-radius: ${BorderRad.s};
  transition: ${Transitions.all};
  min-height: ${Sizes.selectHeight};
  max-height: ${Sizes.selectHeight};
  padding: 10px 72px 10px 16px;

  &:active,
  &:focus {
    outline: none;
  }
`

export const OptionHeaderComponent = styled(OptionComponent)`
  min-height: auto;
`

export const OptionsListComponent = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  height: auto;
  max-height: calc(${Sizes.selectHeight} * 2.5);
  margin: -1px 0 0;
  border-radius: ${BorderRad.s};
  border: 1px solid ${Colors.Black[300]};
  background-color: ${Colors.White};
  box-shadow: ${Shadows.select};
  overflow-y: scroll;
  transition: ${Transitions.all};
  animation: showOptions 0.25s ease;
  cursor: auto;
  z-index: 10;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @keyframes showOptions {
    from {
      opacity: 0;
      max-height: 0;
    }
  }

  ${OptionComponentContainer} {
    border-left: none;
    border-right: none;
    border-radius: 0;

    &:first-child {
      border-top: none;
    }

    &:last-child {
      border-bottom: none;
    }

    ${OptionComponent} {
      border-radius: 0;
    }
  }

  ${OptionComponentContainer} + ${OptionComponentContainer} {
    margin-top: -1px;
  }
`

interface SelectProps<T> {
  disabled?: boolean
  placeholder: string
  selected?: T
  onChange: (selected: T) => void
  onSearch: (search: string) => void
  renderSelected: (option: T) => ReactNode
  renderList: (onOptionClick: (option: T) => void) => ReactNode
}

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

  return (
    <SelectComponent ref={selectNode}>
      <Toggle onClick={() => !isOpen && toggleOpen()} isOpen={isOpen} disabled={disabled}>
        {selectedOption && !isOpen && <SelectedOption>{renderSelected(selectedOption)}</SelectedOption>}
        {(!selectedOption || isOpen) && (
          <EmptyOption
            ref={textInput}
            type="text"
            placeholder={placeholder}
            autoComplete="off"
            value={filterInput}
            onChange={(t) => setFilterInput(t.target.value)}
          />
        )}
        <ToggleButton disabled={disabled}>
          <ArrowDownIcon />
        </ToggleButton>
      </Toggle>
      {isOpen && renderList(onOptionClick)}
    </SelectComponent>
  )
}
