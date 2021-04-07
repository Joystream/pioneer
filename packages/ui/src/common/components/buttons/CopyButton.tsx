import React, { useState } from 'react'
import styled from 'styled-components'

import { Colors, Transitions, Animations } from '../../constants'
import { CopyIcon } from '../icons'
import { FailureSymbol, SuccessSymbol } from '../icons/symbols'

interface CopyButtonProps {
  disabled?: boolean
  textToCopy?: string
  className?: string
}

export function CopyButton({ textToCopy, className, disabled }: CopyButtonProps) {
  const [isSuccessfullyCopied, setSuccessfullyCopied] = useState(false)
  const [isCopyFailure, setCopyFailure] = useState(false)

  return (
    <CopyButtonIcon
      disabled={disabled}
      onClick={() => {
        if (textToCopy && !disabled) {
          try {
            navigator.clipboard.writeText(textToCopy)
            setSuccessfullyCopied(!isSuccessfullyCopied)
          } catch (error) {
            setCopyFailure(!isCopyFailure)
          }
        }
      }}
      className={className}
    >
      {!isSuccessfullyCopied && !isCopyFailure && <CopyIcon />}
      {isSuccessfullyCopied &&
        setTimeout(function () {
          setSuccessfullyCopied(!isSuccessfullyCopied)
        }, 1000) && (
          <ResultSymbol>
            <SuccessSymbol />
          </ResultSymbol>
        )}
      {isCopyFailure &&
        setTimeout(function () {
          setCopyFailure(!isCopyFailure)
        }, 1000) && (
          <ResultSymbol>
            <FailureSymbol />
          </ResultSymbol>
        )}
    </CopyButtonIcon>
  )
}

export const CopyButtonIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  color: ${Colors.Black[400]};
  outline: none;
  background-color: transparent;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'copy')};
  transition: ${Transitions.all};

  &:hover,
  &:focus {
    color: ${Colors.Blue[500]};
  }
  &:active {
    color: ${Colors.Blue[600]};
  }
`

const ResultSymbol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  ${Animations.showResultSymbol};
`
