import React from 'react'
import styled from 'styled-components'

import { BorderRad, Colors, Fonts, Transitions } from '../../constants'

export interface RadioProps {
  id: string
  name: string
  isRequired?: boolean
  children?: React.ReactNode
  enabled?: boolean
  isChecked?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Radio({ id, name, isRequired, children, enabled = true, isChecked = false, onChange }: RadioProps) {
  return (
    <RadioLabel
      htmlFor={id}
      onClick={() => (isChecked = !isChecked)}
      isLabelEnabled={enabled}
      isRadioChecked={isChecked}
    >
      <RadioNative
        type="radio"
        id={id}
        name={name}
        value={id}
        required={isRequired}
        checked={isChecked}
        disabled={!enabled}
        onChange={onChange}
      />
      <RadioStyled disabled={!enabled} isChecked={isChecked} />
      <RadioSideText>{children}</RadioSideText>
    </RadioLabel>
  )
}

export const RadioSideText = styled.span`
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
`

export const RadioStyled = styled.span<{ disabled?: boolean; isChecked?: boolean }>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  margin: 4px;
  border: 2px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.round};
  background-color: ${({ disabled, isChecked }) => {
    if (isChecked === true) {
      return 'transparent'
    } else if (isChecked === false && disabled) {
      return Colors.Black[75]
    }
  }};
  color: ${Colors.Black[300]};
  transition: ${Transitions.all};
  pointer-events: none;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: ${BorderRad.round};
    background-color: ${Colors.Black[900]};
    transform: translateY(-16px);
    transition: ${Transitions.all};
  }
`

interface RadioLabelProps {
  isLabelEnabled?: boolean
  isRadioChecked?: boolean
}

export const RadioLabel = styled.label<RadioLabelProps>`
  display: inline-grid;
  position: relative;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
  color: ${(props) => {
    if (props.isRadioChecked === false) {
      return Colors.Black[600]
    } else if (props.isRadioChecked === true) {
      return Colors.Black[900]
    } else {
      return props.isLabelEnabled == false ? Colors.Black[600] : Colors.Black[900]
    }
  }};
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  font-family: ${Fonts.Inter};
  opacity: ${(props) => (props.isLabelEnabled == false ? '0.4' : '1')};
  cursor: ${(props) => (props.isLabelEnabled == false ? 'not-allowed' : 'pointer')};
  user-select: none;
  transition: ${Transitions.all};

  &:hover,
  &:focus-within {
    color: ${(props) => (props.isLabelEnabled == false ? Colors.Black[600] : Colors.Blue[500])};

    ${RadioStyled} {
      border-color: ${Colors.Blue[400]};

      &:before {
        background-color: ${Colors.Blue[500]};
      }
    }
  }
`

export const RadioNative = styled.input`
  position: absolute;
  width: 1px;
  max-width: 1px;
  height: 1px;
  max-height: 1px;
  margin: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  outline: none;

  &:focus + ${RadioStyled}, &:hover + ${RadioStyled} {
    border-color: ${Colors.Black[300]};
    color: ${Colors.Black[400]};

    &:before {
      background-color: ${Colors.Blue[500]};
    }
  }

  &:checked + ${RadioStyled} {
    border-color: ${Colors.Blue[500]};

    &:before {
      transform: translateY(0);
      background-color: ${Colors.Black[900]};
    }
  }
  &:checked&:focus + ${RadioStyled}, &:checked&:hover + ${RadioStyled} {
    border-color: ${Colors.Blue[400]};

    &:before {
      background-color: ${Colors.Blue[500]};
    }
  }
  &:focus + ${RadioStyled}, &:hover + ${RadioStyled} {
    border-color: ${Colors.Blue[400]};

    &:before {
      background-color: ${Colors.Blue[500]};
    }
  }
  &:disabled&:focus + ${RadioStyled}, &:disabled&:hover + ${RadioStyled} {
    border-color: ${({ checked }) => (checked === true ? Colors.Blue[400] : Colors.Black[300])};

    &:before {
      background-color: ${Colors.Blue[500]};
    }
  }
`
