import React, { MouseEventHandler, ReactNode } from 'react'
import styled, { css } from 'styled-components'

import {
  Animations,
  BorderRad,
  Colors,
  Overflow,
  RemoveScrollbar,
  Shadows,
  Sizes,
  Transitions,
  ZIndex,
} from '../../constants'
import { ToggleButton } from '../buttons/Toggle'
import { Arrow, CheckboxIconStyles } from '../icons'
import { TextInlineMedium } from '../typography'

import { OptionProps } from './types'

interface Props {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
  className?: string
}

export const Option = ({ children, onClick, disabled, className }: Props) => (
  <OptionComponentContainer onClick={onClick} disabled={disabled}>
    <OptionComponent disabled={disabled} className={className}>
      {children}
    </OptionComponent>
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
  padding: 0 4px 0 16px;
  width: 100%;
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

  ${ToggleButton} {
    order: 1;
  }

  &:focus-visible {
    outline: none;
  }

  & > :first-child {
    border-radius: 2px;
  }
`

export const OptionComponentContainer = styled.li<{ disabled?: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.s};
  background-color: transparent;

  ${({ disabled }) => {
    if (disabled) {
      return css`
        pointer-events: none;
        cursor: not-allowed;
      `
    }

    return css`
      &:hover {
        .accountName {
          color: ${Colors.Blue[500]};
        }
      }
    `
  }}
`

export const OptionComponent = styled.div<{ disabled?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  width: 100%;
  height: 100%;
  border: none;
  background-color: ${({ disabled }) => (disabled ? Colors.Black[75] : Colors.White)};
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
  border-top: 1px solid ${Colors.Blue[400]};
  background-color: ${Colors.White};
  box-shadow: ${Shadows.select};
  overflow-y: scroll;
  transform: translateX(-50%);
  transition: ${Transitions.all};
  animation: showOptions 0.25s ease;
  cursor: auto;
  z-index: ${ZIndex.contextMenu};
  ${RemoveScrollbar};

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

    ${OptionComponent} {
      border-radius: 0;
    }
  }

  ${OptionComponentContainer} + ${OptionComponentContainer} {
    margin-top: -1px;
  }
`

export const Selected = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 4px 0 16px;
  text-transform: capitalize;
  ${Overflow.FullDots};
  cursor: pointer;
  user-select: none;
`

const OptionFocused = css`
  color: ${Colors.Blue[500]};
  path {
    fill: ${Colors.Blue[500]};
  }
`
export const OptionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 16px;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  cursor: pointer;
  text-transform: capitalize;
  transition: ${Transitions.all};
  height: 48px;

  ${({ focus, selected }: OptionProps) => (selected || focus) && OptionFocused}
  &:hover {
    ${OptionFocused}
  }

  ${({ selected }: OptionProps) =>
    selected &&
    css`
      background-color: ${Colors.Blue[50]};
      font-weight: bold;
    `}
  ${CheckboxIconStyles} {
    width: 16px;
    height: 16px;
    ${Animations.showSymbol};
  }

  &,
  ${TextInlineMedium} {
    ${Overflow.FullDots};
  }
`
