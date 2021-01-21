import React from 'react'
import styled from 'styled-components'
import { BorderRad, Colors, Transitions } from '../../constants/styles'

export function ButtonPrimary() {
  return <Button></Button>
}

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-height: 48px;
  padding: 16px;
  border: 1px solid ${Colors.Blue[500]};
  border-radius: ${BorderRad.s};
  color: ${Colors.White};
  background-color: ${Colors.Blue[500]};
  outline: none;
  transition: ${Transitions.all};

  &:hover {
    border-color: ${Colors.Blue[600]};
    background-color: ${Colors.Blue[600]};
  }

  &:focus,
  &:active {
    border-color: ${Colors.Blue[700]};
    background-color: ${Colors.Blue[700]};
  }

  &:disabled {
    background-color: ${Colors.Blue[100]};
  }
`
