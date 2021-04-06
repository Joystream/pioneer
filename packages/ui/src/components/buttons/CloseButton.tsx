import React, { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

import { Colors, Transitions } from '../../constants'
import { CrossIcon } from '../icons'

export const CloseButton = React.memo((props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Close {...props}>
    <CrossIcon />
  </Close>
))

export const Close = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 0;
  border: none;
  color: ${Colors.Black[400]};
  outline: none;
  background-color: transparent;
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover {
    color: ${Colors.Blue[500]};
  }

  &:focus,
  &:active {
    color: ${Colors.Blue[600]};
  }

  &:disabled {
    color: ${Colors.Black[300]};
    cursor: not-allowed;
  }
`
