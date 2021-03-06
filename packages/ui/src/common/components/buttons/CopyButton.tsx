import React from 'react'
import styled from 'styled-components'

import { useCopyToClipboard } from '@/common/hooks/useCopyToClipboard'

import { Colors, Transitions, Animations } from '../../constants'
import { CopyIcon } from '../icons'
import { FailureSymbol, SuccessSymbol } from '../icons/symbols'

export interface CopyButtonProps {
  disabled?: boolean
  textToCopy?: string
  className?: string
}

export function CopyButton({ textToCopy, className, disabled }: CopyButtonProps) {
  const { copyValue, isSuccessfullyCopied, isCopyFailure, setCopyFailure, setSuccessfullyCopied } = useCopyToClipboard()

  return (
    <CopyButtonIcon
      disabled={disabled}
      onClick={(evt) => {
        evt.stopPropagation()
        if (textToCopy && !disabled) {
          copyValue(textToCopy)
        } else if (textToCopy == undefined) {
          setCopyFailure(true)
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
  &:disabled {
    color: ${Colors.Black[300]};
    border-color: ${Colors.Black[50]};
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
