import React from 'react'
import styled, { css } from 'styled-components'

import { BorderRad, Colors, Fonts, Transitions } from '../../constants'

export type LinkSize = 'small' | 'medium' | 'large'

export interface LinkProps extends LinkSizingProps {
  square?: boolean
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  href: string
}

interface LinkSizingProps {
  size: LinkSize
}

const height: { [key in LinkSize]: string } = {
  large: '48px',
  medium: '40px',
  small: '32px',
}

const getHeight = (props: LinkProps) => height[props.size || 'large']
const getFontSize = (props: LinkProps) => (props.size === 'small' ? '14px' : '16px')
const getLineHeight = (props: LinkProps) => (props.size === 'small' ? '20px' : '24px')
const getPadding = (props: LinkProps) => {
  if (props.size == 'small') {
    return props.square ? '6px' : '4px 8px'
  }

  if (props.size == 'medium') {
    return props.square ? '8px' : '4px 16px'
  }

  return props.square ? '8px' : '8px 16px'
}

export function LinkPrimary({ className, children, size, square, disabled, href }: LinkProps) {
  return (
    <LinkPrimaryStyles className={className} size={size} square={square} disabled={disabled} href={href}>
      <LinkInnerWrapper size={size}>{children}</LinkInnerWrapper>
    </LinkPrimaryStyles>
  )
}

export function LinkSecondary({ className, children, size, square, disabled, href }: LinkProps) {
  return (
    <LinkSecondaryStyles className={className} size={size} square={square} disabled={disabled} href={href}>
      <LinkInnerWrapper size={size}>{children}</LinkInnerWrapper>
    </LinkSecondaryStyles>
  )
}

export function LinkGhost({ className, children, size, square, disabled, href }: LinkProps) {
  return (
    <LinkGhostStyles className={className} size={size} square={square} disabled={disabled} href={href}>
      <LinkInnerWrapper size={size}>{children}</LinkInnerWrapper>
    </LinkGhostStyles>
  )
}
export function LinkBareGhost({ className, children, size, square, disabled, href }: LinkProps) {
  return (
    <LinkBareGhostStyles className={className} size={size} square={square} disabled={disabled} href={href}>
      <LinkInnerWrapper size={size}>{children}</LinkInnerWrapper>
    </LinkBareGhostStyles>
  )
}
export function LinkLink({
  className,
  children,
  square,
  disabled,
  href,
  accentColor,
}: LinkProps & { accentColor?: boolean }) {
  return (
    <LinkLinkStyles
      className={className}
      square={square}
      disabled={disabled}
      href={href}
      accentColor={accentColor}
      size="small"
    >
      <LinkInnerWrapper size="small">{children}</LinkInnerWrapper>
    </LinkLinkStyles>
  )
}

const LinkInnerWrapper = styled.span<LinkSizingProps>`
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

export const BasicLinkStyles = css<LinkProps>`
  &,
  &:visited {
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
    user-select: none;
    cursor: pointer;
    overflow: hidden;
    transition: ${Transitions.all};
    z-index: 1;

    ${LinkInnerWrapper} > svg {
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
  }
`

export const LinkPrimaryStyles = styled.a<LinkProps>`
  ${BasicLinkStyles};
  &,
  &:visited {
    color: ${Colors.White};
    border-color: ${Colors.Blue[500]};
    background-color: ${Colors.Blue[500]};

    ${LinkInnerWrapper} > svg {
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
  }
`

export const LinkSecondaryStyles = styled.a<LinkProps>`
  ${BasicLinkStyles};
  &,
  &:visited {
    border-color: ${Colors.Black[75]};
    background-color: ${Colors.Black[75]};

    ${LinkInnerWrapper} > svg {
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

      ${LinkInnerWrapper} > svg {
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
  }
`

export const LinkGhostStyles = styled.a<LinkProps>`
  ${BasicLinkStyles};
  &,
  &:visited {
    color: ${Colors.Black[900]};
    border-color: ${Colors.Black[200]};
    background-color: ${Colors.White};

    ${LinkInnerWrapper} > svg {
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
      ${LinkInnerWrapper} > svg {
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
  }
`

export const LinkBareGhostStyles = styled.a<LinkProps>`
  ${BasicLinkStyles};
  &,
  &:visited {
    color: ${Colors.Black[900]};
    border-color: transparent;
    background-color: ${Colors.White};

    ${LinkInnerWrapper} > svg {
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
      ${LinkInnerWrapper} > svg {
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
    }
  }
`

export const LinkLinkStyles = styled.a<LinkProps & { accentColor?: boolean }>`
  ${BasicLinkStyles};

  &,
  &:visited {
    grid-column-gap: 4px;
    height: fit-content;
    padding: 0;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: ${({ accentColor }) => (accentColor ? Colors.Blue[400] : Colors.Black[900])};
    text-transform: none;
    border-radius: 0;
    border-color: transparent;
    background-color: transparent;

    ${LinkInnerWrapper} > svg {
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
      transform: translateX(0%);
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

      ${LinkInnerWrapper} > svg {
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
        transform: translateX(100%);
      }
    }
  }
`
