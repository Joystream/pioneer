import React from 'react'
import styled from 'styled-components'
import { BorderRad, Colors, Transitions } from '../../constants/styles'

export function Buttons() {
  return (
    <>
      <ButtonPrimary></ButtonPrimary>
    </>
  )
}

export const ButtonPrimary = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  padding: 16px;
  border: 1px solid ${Colors.Blue[500]};
  border-radius: ${BorderRad.s};
  color: ${Colors.White};
  background-color: ${Colors.Blue[500]};
  outline: none;
  transition: ${Transitions.all};
  cursor: pointer;

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
    border-color: ${Colors.Blue[100]};
    background-color: ${Colors.Blue[100]};
    cursor: not-allowed;
  }
`

export const ButtonPrimarySquare = styled(ButtonPrimary)`
  padding: 8px;
  max-width: 48px;
`

export const ButtonGhost = styled(ButtonPrimary)`
  border-color: ${Colors.Black[200]};
  color: ${Colors.Black[900]};
  background-color: ${Colors.White};

  svg {
    color: ${Colors.Black[400]};
  }

  &:hover {
    border-color: ${Colors.Blue[200]};
    background-color: ${Colors.White};
  }

  &:focus,
  &:active {
    border-color: ${Colors.Blue[300]};
    background-color: ${Colors.White};
  }

  &:disabled {
    color: ${Colors.Black[300]};
    border-color: ${Colors.Blue[100]};
    background-color: ${Colors.White};
  }
`

export const ButtonGhostMedium = styled(ButtonGhost)`
  height: 40px;
  padding: 8px;
`

export const ButtonGhostMediumSquare = styled(ButtonGhostMedium)`
  width: 40px;
`
