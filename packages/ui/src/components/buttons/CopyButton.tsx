import React from 'react'
import styled from 'styled-components'
import { CopyIcon } from '../icons'

export function CopyButton() {
  return (
    <Button>
      <CopyIcon />
    </Button>
  )
}

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  color: inherit;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  margin: 0 0 0 8px;
`
