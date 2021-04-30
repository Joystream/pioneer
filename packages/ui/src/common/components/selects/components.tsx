import React, { MouseEventHandler, ReactNode } from 'react'
import styled from 'styled-components'

import { BorderRad, Colors, Shadows, Sizes, Transitions } from '../../constants'
import { ToggleButton } from '../buttons/Toggle'
import { Arrow } from '../icons'

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

interface SelectToggleButtonProps {
  isOpen?: boolean
  disabled?: boolean
  onToggleClick: MouseEventHandler
}

export const SelectToggleButton = ({ isOpen, disabled, onToggleClick }: SelectToggleButtonProps) => (
  <ToggleButton isOpen={isOpen} className="ui-toggle" disabled={disabled} onClick={onToggleClick}>
    <Arrow direction="down" />
  </ToggleButton>
)

export const SelectedOption = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  padding: 10px 4px 10px 16px;
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
    line-height: 78px;
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

  &:hover {
    .accountName {
      color: ${Colors.Blue[500]};
    }
  }
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
  left: 50%;
  top: 100%;
  width: calc(100% + 2px);
  height: auto;
  max-height: calc(${Sizes.selectHeight} * 2.5);
  margin: 0;
  border-radius: ${BorderRad.s};
  border: 1px solid ${Colors.Black[300]};
  background-color: ${Colors.White};
  box-shadow: ${Shadows.select};
  overflow-y: scroll;
  transform: translateX(-50%);
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
