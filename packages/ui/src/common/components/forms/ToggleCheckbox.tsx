import React from 'react'
import styled, { css } from 'styled-components'

import { BorderRad, Colors, Fonts, Transitions } from '../../constants'

import { Label } from './Label'

export interface Props {
  isRequired?: boolean
  disabled?: boolean
  checked: boolean
  onChange: (value: boolean) => void
  trueLabel: string
  falseLabel: string
}

export function ToggleCheckbox({ isRequired, disabled, checked, onChange, trueLabel, falseLabel }: Props) {
  const onClick = (setValue: boolean) => () => {
    if (disabled !== true) {
      onChange(setValue)
    }
  }

  return (
    <ToggleContainer groupDisabled={disabled}>
      <ToggleLabel onClick={onClick(true)}>{trueLabel}</ToggleLabel>
      <ToggleStyledInput isChecked={checked}>
        <ToggleInput
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={(event) => onChange(event.currentTarget.checked)}
          required={isRequired}
        />
      </ToggleStyledInput>
      <ToggleLabel onClick={onClick(false)}>{falseLabel}</ToggleLabel>
    </ToggleContainer>
  )
}

const ToggleLabel = styled.button`
  outline: none;
  font-family: ${Fonts.Inter};
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.Black[900]};
  cursor: pointer;
`

const ToggleInput = styled.input`
  position: absolute;
  height: 0;
  z-index: -1;
  opacity: 0;
  outline: none;
`

interface ToggleStyledInputProps {
  isChecked: boolean
}

const checkedBoxStyles = css`
  background-color: ${Colors.Blue[500]};

  &:hover,
  &:focus {
    background-color: ${Colors.Blue[400]};
  }
  &:after {
    transform: translateX(0%);
  }
`

const ToggleStyledInput = styled.label<ToggleStyledInputProps>`
  display: flex;
  align-items: center;
  width: 48px;
  height: 24px;
  margin: 0 10px;
  position: relative;
  border-radius: ${BorderRad.full};
  background-color: ${Colors.Black[300]};
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover,
  &:focus {
    background-color: ${Colors.Black[200]};
  }

  &:after {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    border: 2px solid transparent;
    border-radius: ${BorderRad.round};
    background-color: ${Colors.White};
    background-clip: content-box;
    transform: translateX(100%);
    transition: ${Transitions.all};
  }

  ${(props) => props.isChecked && checkedBoxStyles};
`

interface ToggleCheckBoxContainerProps {
  groupDisabled?: boolean
}

const disabledToggleGroupStyles = css`
  opacity: 0.5;
  cursor: not-allowed;

  ${ToggleStyledInput},
  ${ToggleLabel} {
    cursor: not-allowed;
  }
`

const ToggleContainer = styled.div<ToggleCheckBoxContainerProps>`
  display: flex;
  align-items: center;
  width: fit-content;
  ${(props) => props.groupDisabled && disabledToggleGroupStyles};
`

export const InlineToggleWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  ${Label} {
    line-height: 20px;
    margin-bottom: 0;
  }

  ${ToggleContainer} {
    margin-left: 12px;
  }
`
