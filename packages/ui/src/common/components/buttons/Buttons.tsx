import React, { MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'

import { BorderRad, Colors, Fonts, Transitions } from '../../constants'

export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps extends ButtonSizingProps {
  square?: boolean
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  bold?: boolean
  inline?: boolean
  borderless?: boolean
  onClick?: MouseEventHandler
  title?: string
  outlined?: boolean
}

interface ButtonSizingProps {
  size: ButtonSize
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
    return props.square ? '4px' : '4px 8px'
  }

  if (props.size == 'medium') {
    return props.square ? '8px' : '4px 16px'
  }

  return props.square ? '8px' : '8px 16px'
}

export function ButtonPrimary({ className, children, size, square, disabled, onClick, outlined }: ButtonProps) {
  return (
    <ButtonPrimaryStyles
      className={className}
      size={size}
      square={square}
      disabled={disabled}
      onClick={onClick}
      outlined={outlined}
    >
      <ButtonInnerWrapper size={size}>{children}</ButtonInnerWrapper>
    </ButtonPrimaryStyles>
  )
}

export function ButtonSecondary({ className, children, size, square, disabled, onClick }: ButtonProps) {
  return (
    <ButtonSecondaryStyles className={className} size={size} square={square} disabled={disabled} onClick={onClick}>
      <ButtonInnerWrapper size={size}>{children}</ButtonInnerWrapper>
    </ButtonSecondaryStyles>
  )
}

export function ButtonGhost({ className, children, size, square, disabled, onClick, title }: ButtonProps) {
  return (
    <ButtonGhostStyles
      className={className}
      size={size}
      square={square}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      <ButtonInnerWrapper size={size}>{children}</ButtonInnerWrapper>
    </ButtonGhostStyles>
  )
}

export function ButtonBareGhost({ className, children, size, square, disabled, onClick }: ButtonProps) {
  return (
    <ButtonBareGhostStyles className={className} size={size} square={square} disabled={disabled} onClick={onClick}>
      <ButtonInnerWrapper size={size}>{children}</ButtonInnerWrapper>
    </ButtonBareGhostStyles>
  )
}

export function ButtonLink({ className, children, square, borderless, bold, inline, disabled, onClick }: ButtonProps) {
  return (
    <ButtonLinkStyles
      size="small"
      className={className}
      square={square}
      disabled={disabled}
      onClick={onClick}
      bold={bold}
      borderless={borderless}
      inline={inline}
    >
      <ButtonInnerWrapper size="small">{children}</ButtonInnerWrapper>
    </ButtonLinkStyles>
  )
}

export const ButtonInnerWrapper = styled.span<ButtonSizingProps>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${({ size }) => (size == 'small' ? '4px' : '8px')};
  justify-items: center;
  align-items: center;
  width: fit-content;
  white-space: nowrap;
  transform: translateY(1px);

  & > svg {
    transform: translateY(-1px);
  }
`

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

  ${ButtonInnerWrapper} > svg {
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

export const ButtonPrimaryStyles = styled.button<ButtonProps>`
  ${BasicButtonStyles};

  border-color: ${Colors.Blue[500]};
  background-color: ${({ outlined }) => (outlined ? Colors.White : Colors.Blue[500])};
  color: ${({ outlined }) => (outlined ? Colors.Blue[500] : Colors.White)};

  ${ButtonInnerWrapper} > svg {
    color: ${({ outlined }) => (outlined ? Colors.Blue[500] : Colors.White)};
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

  ${ButtonInnerWrapper} > svg {
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

    ${ButtonInnerWrapper} > svg {
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
    ${ButtonInnerWrapper} > svg {
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

  ${ButtonInnerWrapper} > svg {
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

    ${ButtonInnerWrapper} > svg {
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
    ${ButtonInnerWrapper} > svg {
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

export const ButtonBareGhostStyles = styled.button<ButtonProps>`
  ${BasicButtonStyles};

  color: ${Colors.Black[900]};
  border-color: transparent;
  background-color: ${Colors.White};

  ${ButtonInnerWrapper} > svg {
    color: ${({ square }) => (square ? Colors.Black[900] : Colors.Black[400])};
  }

  &:before,
  &:after {
    display: none;
  }

  &:hover,
  &:focus {
    border-color: transparent;
    color: ${Colors.Blue[500]};

    ${ButtonInnerWrapper} > svg {
      color: ${Colors.Blue[500]};
    }

    & .blackPart,
    & .primaryPart {
      color: ${Colors.Blue[500]};
      fill: ${Colors.Blue[500]};
    }
  }

  &:active {
    border-color: transparent;
    color: ${Colors.Blue[600]};

    ${ButtonInnerWrapper} > svg {
      color: ${Colors.Blue[600]};
    }
  }

  &:disabled {
    ${ButtonInnerWrapper} > svg {
      color: ${Colors.Black[300]};
    }

    & .blackPart,
    & .primaryPart {
      color: ${Colors.Black[300]};
      fill: ${Colors.Black[300]};
    }

    color: ${Colors.Black[300]};
    border-color: transparent;
    background-color: ${Colors.White};
  }
`

export const ButtonLinkStyles = styled.button<ButtonProps>`
  ${BasicButtonStyles};

  ${({ inline }) =>
    inline &&
    css`
      display: inline-flex;
      height: fit-content;
      border: none;
      font-size: inherit;
      line-height: inherit;
    `};
  grid-column-gap: 4px;
  min-width: fit-content;
  height: fit-content;
  padding: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: ${({ bold }) => (bold ? '700' : '400')};
  color: ${Colors.Black[900]};
  text-transform: none;
  border-radius: 0;
  border-color: transparent;
  background-color: transparent;

  ${ButtonInnerWrapper} > svg {
    color: ${Colors.Black[900]};
    width: 12px;
    height: 12px;
  }

  &:before {
    top: auto;
    bottom: 2px;
    left: 0;
    width: 100%;
    height: 1px;
    border-radius: 0;
    border: none;
    transform: ${({ borderless }) => (borderless ? 'translateX(calc(-100% - 2px))' : 'translateX(0)')};
    background-color: ${Colors.Black[900]};
  }

  &:after {
    background-color: ${Colors.Blue[50]};
    border-radius: 0;
  }

  &:hover,
  &:focus {
    border-color: transparent;
    color: ${Colors.Blue[500]};

    &:before {
      background-color: ${Colors.Blue[500]};
      transform: translateX(0%);
    }

    ${ButtonInnerWrapper} > svg {
      color: ${Colors.Blue[500]};
    }

    & .blackPart,
    & .primaryPart {
      color: ${Colors.Blue[500]};
      fill: ${Colors.Blue[500]};
    }
  }

  &:active {
    border-color: transparent;
    transform: scale(1);

    &:before {
      transform: translateX(calc(100% + 2px));
    }
  }

  &:disabled {
    ${ButtonInnerWrapper} > svg {
      color: ${Colors.Black[300]};
    }

    & .blackPart,
    & .primaryPart {
      color: ${Colors.Black[300]};
      fill: ${Colors.Black[300]};
    }

    color: ${Colors.Black[300]};
    border-color: transparent;
    background-color: transparent;
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
