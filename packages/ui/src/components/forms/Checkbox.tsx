import React, { useState } from 'react'
import styled from 'styled-components'
import { BorderRad, Colors, Fonts, Transitions } from '../../constants'
import { CheckboxIcon, CheckboxIconStyles } from '../icons/CheckboxIcon'

interface CheckboxProps {
  id: string
  isRequired?: boolean
  children?: React.ReactElement
  enabled?: boolean
  isChecked?: boolean
  onChange?: (value: boolean) => void
}

export function Checkbox({ id, isRequired, children, enabled = true, isChecked = false, onChange }: CheckboxProps) {
  const [isStateChecked, setStateChecked] = useState(isChecked)

  return (
    <CheckboxLabel
      htmlFor={id}
      onClick={(event) => {
        event.preventDefault()
        if (enabled !== false) {
          setStateChecked(!isStateChecked)
          onChange && onChange(!isStateChecked)
        }
      }}
      isLabelEnabled={enabled}
    >
      <CheckboxNative
        type="checkbox"
        id={id}
        name={id}
        required={isRequired}
        checked={isStateChecked}
        disabled={!enabled}
        onChange={(event) => setStateChecked(event.target.checked)}
      />
      <CheckboxStyled>
        <CheckboxIcon />
      </CheckboxStyled>
      <CheckboxSideText>{children}</CheckboxSideText>
    </CheckboxLabel>
  )
}

export const CheckboxSideText = styled.span`
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
`

export const CheckboxStyled = styled.span`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 2px solid ${Colors.Black[400]};
  border-radius: ${BorderRad.m};
  color: ${Colors.Black[400]};
  transition: ${Transitions.all};
  pointer-events: none;
  overflow: hidden;

  ${CheckboxIconStyles} {
    position: absolute;
    transform: translateY(-100%);
    transition: transform ${Transitions.duration} ease;
  }
`

interface CheckboxLabelProps {
  isLabelEnabled?: boolean
}

export const CheckboxLabel = styled.label<CheckboxLabelProps>`
  display: inline-grid;
  position: relative;
  grid-auto-flow: column;
  grid-column-gap: 10px;
  align-items: center;
  width: fit-content;
  color: ${Colors.Black[900]};
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  font-family: ${Fonts.Inter};
  opacity: ${(props) => (props.isLabelEnabled == false ? '0.5' : '1')};
  cursor: ${(props) => (props.isLabelEnabled == false ? 'not-allowed' : 'pointer')};
  user-select: none;

  &:hover {
    ${CheckboxStyled} {
      border: 2px solid ${Colors.Blue[400]};
      color: ${Colors.Blue[500]};
    }
  }
`

export const CheckboxNative = styled.input`
  position: absolute;
  width: 1px;
  max-width: 1px;
  height: 1px;
  max-height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  outline: none;

  &:focus + ${CheckboxStyled}, &:hover + ${CheckboxStyled} {
    border: 2px solid ${Colors.Black[300]};
    color: ${Colors.Black[400]};
  }

  &:checked + ${CheckboxStyled} {
    border: 2px solid ${Colors.Blue[500]};
    color: ${Colors.Black[900]};
    ${CheckboxIconStyles} {
      transform: translateY(0);
    }
  }
  &:checked&:focus + ${CheckboxStyled}, &:checked&:hover + ${CheckboxStyled} {
    border: 2px solid ${Colors.Blue[400]};
    color: ${Colors.Blue[500]};
  }
  &:disabled&:focus + ${CheckboxStyled}, &:disabled&:hover + ${CheckboxStyled} {
    border: 2px solid ${Colors.Black[300]};
    color: ${Colors.Black[400]};
  }
`
