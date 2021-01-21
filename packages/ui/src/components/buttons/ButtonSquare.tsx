import React from 'react'
import styled from 'styled-components'
import { Button } from './ButtonPrimary'

export function SquareButton() {
  return <ButtonSquare></ButtonSquare>
}

export const ButtonSquare = styled(Button)`
  padding: 8px;
  max-width: 48px;
`
