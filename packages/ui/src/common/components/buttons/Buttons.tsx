import React, { MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'

import { BorderRad, Colors, Fonts, Transitions } from '../../constants'

export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps {
  size?: ButtonSize
  square?: boolean
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  onClick?: MouseEventHandler
}

const height: { [key in ButtonSize]: string } = {
  large: '48px',
  medium: '40px',
  small: '32px',
}

const getHeight = (props: ButtonProps) => height[props.size || 'large']
const getFontSize = (props: ButtonProps) => (props.size === 'small' ? '14px' : '16px')
const getLineHeight = (props: ButtonProps) => (props.size === 'small' ? '20px' : '24px')
const getPadding = (props: ButtonProps) => {
  if (props.size == 'small') {
    return props.square ? '6px' : '4px 8px'
  }

  if (props.size == 'medium') {
    return props.square ? '8px' : '4px 16px'
  }

  return props.square ? '8px' : '8px 16px'
}

export function ButtonPrimary({ className, children, size, square, disabled, onClick }: ButtonProps) {
  return (
    <ButtonPrimaryStyles className={className} size={size} square={square} disabled={disabled} onClick={onClick}>
      <ButtonInnerWrapper>{children}</ButtonInnerWrapper>
    </ButtonPrimaryStyles>
  )
}

export function ButtonSecondary({ className, children, size, square, disabled, onClick }: ButtonProps) {
  return (
    <ButtonSecondaryStyles className={className} size={size} square={square} disabled={disabled} onClick={onClick}>
      <ButtonInnerWrapper>{children}</ButtonInnerWrapper>
    </ButtonSecondaryStyles>
  )
}

export function ButtonGhost({ className, children, size, square, disabled, onClick }: ButtonProps) {
  return (
    <ButtonGhostStyles className={className} size={size} square={square} disabled={disabled} onClick={onClick}>
      <ButtonInnerWrapper>{children}</ButtonInnerWrapper>
    </ButtonGhostStyles>
  )
}

export const BasicButtonStyles = css<ButtonProps>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: fit-content;
  min-width: ${getHeight};
  ${(props) => {
    if (props.square)
      return css`
        max-width: ${getHeight(props)};
      `
  }};
  height: ${getHeight};
  padding: ${getPadding};
  border: 1px solid transparent;
  border-radius: ${BorderRad.s};
  font-family: ${Fonts.Grotesk};
  font-size: ${getFontSize};
  line-height: ${getLineHeight};
  font-weight: 700;
  text-transform: capitalize;
  outline: none;
  cursor: pointer;
  overflow: hidden;
  transition: ${Transitions.all};
  z-index: 1;

  & > svg {
    z-index: 2;
    transition: ${Transitions.all};
  }
  & .blackPart,
  & .primaryPart {
    transition: ${Transitions.all};
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 150%;
    height: 150%;
    border-radius: ${BorderRad.full};
    transform: translate(-150%, -50%);
    transition: ${Transitions.all};
    z-index: -1;
    pointer-events: none;
  }

  &:hover,
  &:focus {
    &:before {
      transform: translate(-50%, -50%);
    }
  }
  &:active {
    transform: scale(0.96);
    &:after {
      transform: translate(-50%, -50%);
    }
  }
  &:disabled {
    cursor: not-allowed;

    &:hover,
    &:focus,
    &:active {
      transform: scale(1);
      &:after,
      &:before {
        transform: translate(-150%, -50%);
      }
    }
  }
`

const ButtonInnerWrapper = styled.span<ButtonProps>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${({ size }) => (size == 'small' ? '4px' : '8px')};
  justify-items: center;
  align-items: center;
  width: fit-content;
  transform: translateY(1px);
  & > svg {
    transform: translateY(-1px);
  }
`

export const ButtonPrimaryStyles = styled.button<ButtonProps>`
  ${BasicButtonStyles};

  color: ${Colors.White};
  border-color: ${Colors.Blue[500]};
  background-color: ${Colors.Blue[500]};

  & > svg {
    color: ${Colors.White};
  }

  &:before {
    background-color: ${Colors.Blue[400]};
  }
  &:after {
    background-color: ${Colors.Blue[700]};
  }

  &:hover,
  &:focus {
    border-color: ${Colors.Blue[400]};
  }

  &:active {
    border-color: ${Colors.Blue[700]};
  }

  &:disabled {
    border-color: ${Colors.Blue[100]};
    background-color: ${Colors.Blue[100]};
  }
`

export const ButtonSecondaryStyles = styled.button<ButtonProps>`
  ${BasicButtonStyles};

  border-color: ${Colors.Black[75]};
  background-color: ${Colors.Black[75]};

  & > svg {
    color: ${({ square }) => (square ? Colors.Black[900] : Colors.Black[400])};
  }

  &:before {
    background-color: ${Colors.Black[50]};
  }
  &:after {
    background-color: ${Colors.Black[100]};
  }

  &:hover,
  &:focus {
    border-color: ${Colors.Black[50]};
    color: ${Colors.Blue[500]};

    & > svg {
      color: ${Colors.Blue[500]};
    }
    & .blackPart,
    & .primaryPart {
      color: ${Colors.Blue[500]};
      fill: ${Colors.Blue[500]};
    }
  }

  &:active {
    border-color: ${Colors.Black[100]};
  }

  &:disabled {
    & > svg {
      color: ${Colors.Black[300]};
    }
    & .blackPart,
    & .primaryPart {
      color: ${Colors.Black[300]};
      fill: ${Colors.Black[300]};
    }
    color: ${Colors.Black[300]};
    border-color: ${Colors.Black[50]};
    background-color: ${Colors.Black[50]};
  }
`

export const ButtonGhostStyles = styled.button<ButtonProps>`
  ${BasicButtonStyles};

  color: ${Colors.Black[900]};
  border-color: ${Colors.Black[200]};
  background-color: ${Colors.White};

  & > svg {
    color: ${({ square }) => (square ? Colors.Black[900] : Colors.Black[400])};
  }

  &:before {
    background-color: ${Colors.Black[50]};
  }
  &:after {
    background-color: ${Colors.Blue[50]};
  }

  &:hover,
  &:focus {
    border-color: ${Colors.Blue[100]};
    color: ${Colors.Blue[500]};
    & > svg {
      color: ${Colors.Blue[500]};
    }
    & .blackPart,
    & .primaryPart {
      color: ${Colors.Blue[500]};
      fill: ${Colors.Blue[500]};
    }
  }

  &:active {
    border-color: ${Colors.Blue[100]};
  }

  &:disabled {
    & > svg {
      color: ${Colors.Black[300]};
    }
    & .blackPart,
    & .primaryPart {
      color: ${Colors.Black[300]};
      fill: ${Colors.Black[300]};
    }
    color: ${Colors.Black[300]};
    border-color: ${Colors.Black[200]};
    background-color: ${Colors.White};
  }
`

export const ButtonsGroup = styled.div<{ align?: 'left' | 'center' | 'right' }>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
  justify-self: ${({ align }) => {
    switch (align) {
      case 'left':
      default:
        return 'start'
      case 'center':
        return 'center'
      case 'right':
        return 'end'
    }
  }};
`
