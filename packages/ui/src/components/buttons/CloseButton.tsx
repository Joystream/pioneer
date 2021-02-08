import React from 'react'
import styled from 'styled-components'
import { Colors, Transitions } from '../../constants'
import { CrossIcon } from '../icons'

export function CloseButton() {
  return (
    <Close>
      <CrossIcon />
    </Close>
  )
}

export const Close = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  margin: 0;
  border: none;
  color: ${Colors.Black[400]};
  outline: none;
  background-color: transparent;
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover {
    color: ${Colors.Blue[200]};
  }

  &:focus,
  &:active {
    color: ${Colors.Blue[400]};
  }

  &:disabled {
    color: ${Colors.Black[300]};
    cursor: not-allowed;
  }
`
