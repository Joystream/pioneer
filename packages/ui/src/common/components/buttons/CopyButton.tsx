import React from 'react'
import styled from 'styled-components'

import { useCopyToClipboard } from '@/common/hooks/useCopyToClipboard'

import { Colors, Transitions, Animations } from '../../constants'
import { CopyIcon } from '../icons'
import { FailureSymbol, SuccessSymbol } from '../icons/symbols'

import { ButtonGhost, ButtonSize } from './Buttons'

export interface CopyButtonProps {
  disabled?: boolean
  textToCopy?: string
  className?: string
  title?: string
}

export function CopyButton({ textToCopy, className, disabled, title }: CopyButtonProps) {
  const { copyValue, isSuccessfullyCopied, isCopyFailure, setCopyFailure, setSuccessfullyCopied } = useCopyToClipboard()

  return (
    <CopyButtonIcon
      title={title ?? 'Copy'}
      disabled={disabled}
      onClick={(evt) => {
        evt.preventDefault()
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

interface CopyButtonTemplateProps extends CopyButtonProps {
  size: ButtonSize
  icon?: React.ReactNode
  children?: React.ReactNode
  square?: boolean
  title?: string
}

export function CopyButtonTemplate({
  textToCopy,
  className,
  disabled,
  square,
  size,
  icon,
  children,
  title,
}: CopyButtonTemplateProps) {
  const { copyValue, isSuccessfullyCopied, isCopyFailure, setCopyFailure, setSuccessfullyCopied } = useCopyToClipboard()

  return (
    <CopyStyledButton
      title={title ?? 'Copy'}
      size={size}
      square={square}
      disabled={disabled}
      onClick={(evt) => {
        evt.preventDefault()
        evt.stopPropagation()
        if (textToCopy && !disabled) {
          copyValue(textToCopy)
        } else if (textToCopy == undefined) {
          setCopyFailure(true)
        }
      }}
      className={className}
    >
      {!isSuccessfullyCopied && !isCopyFailure && (icon ? icon : <CopyIcon />)}
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
      {children}
    </CopyStyledButton>
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

export const CopyStyledButton = styled(ButtonGhost)`
  ${ResultSymbol} {
    transform: translateY(-1px);
    color: inherit;
    .blackPart {
      fill: ${Colors.Blue[500]};
    }
  }
`
