import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { BorderRad, Colors, Fonts, Transitions } from '@/common/constants'

export type LinkButtonSize = 'small' | 'medium' | 'large'

export interface LinkButtonProps extends LinkButtonSizingProps {
  square?: boolean
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  to: string
}

interface LinkButtonSizingProps {
  size: LinkButtonSize
}

const height: { [key in LinkButtonSize]: string } = {
  large: '48px',
  medium: '40px',
  small: '32px',
}

const getHeight = (props: BasicLinkButtonStylesProps) => height[props.size || 'large']
const getFontSize = (props: BasicLinkButtonStylesProps) => (props.size === 'small' ? '14px' : '16px')
const getLineHeight = (props: BasicLinkButtonStylesProps) => (props.size === 'small' ? '20px' : '24px')
const getPadding = (props: BasicLinkButtonStylesProps) => {
  if (props.size == 'small') {
    return props.$square ? '6px' : '4px 8px'
  }

  if (props.size == 'medium') {
    return props.$square ? '8px' : '4px 16px'
  }

  return props.$square ? '8px' : '8px 16px'
}

export function LinkButtonPrimary({ className, children, size, square, disabled, to }: LinkButtonProps) {
  return (
    <LinkButtonPrimaryStyles className={className} size={size} $square={square} disabled={disabled} to={to}>
      <LinkButtonInnerWrapper size={size}>{children}</LinkButtonInnerWrapper>
    </LinkButtonPrimaryStyles>
  )
}

export function LinkButtonSecondary({ className, children, size, square, disabled, to }: LinkButtonProps) {
  return (
    <LinkButtonSecondaryStyles className={className} size={size} $square={square} disabled={disabled} to={to}>
      <LinkButtonInnerWrapper size={size}>{children}</LinkButtonInnerWrapper>
    </LinkButtonSecondaryStyles>
  )
}

export function LinkButtonGhost({ className, children, size, square, disabled, to }: LinkButtonProps) {
  return (
    <LinkButtonGhostStyles className={className} size={size} $square={square} disabled={disabled} to={to}>
      <LinkButtonInnerWrapper size={size}>{children}</LinkButtonInnerWrapper>
    </LinkButtonGhostStyles>
  )
}

export function LinkButtonBareGhost({ className, children, size, square, disabled, to }: LinkButtonProps) {
  return (
    <LinkButtonBareGhostStyles className={className} size={size} $square={square} disabled={disabled} to={to}>
      <LinkButtonInnerWrapper size={size}>{children}</LinkButtonInnerWrapper>
    </LinkButtonBareGhostStyles>
  )
}

export function LinkButtonLink({ className, children, square, disabled, to }: LinkButtonProps) {
  return (
    <LinkButtonLinkStyles className={className} $square={square} disabled={disabled} to={to} size="small">
      <LinkButtonInnerWrapper size="small">{children}</LinkButtonInnerWrapper>
    </LinkButtonLinkStyles>
  )
}

type ExternalLinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  disabled: boolean
  size: LinkButtonSize
}

export const ExternalLinkButtonPrimary = ({ disabled, ...props }: ExternalLinkButtonProps) => (
  <ExternalLinkButtonPrimaryStyles {...props} href={disabled ? undefined : props.href} $disabled={disabled} />
)

export const LinkButtonInnerWrapper = styled.span<LinkButtonSizingProps>`
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

interface LinkButtonStyleProps extends Omit<LinkButtonProps, 'square'> {
  $square?: LinkButtonProps['square']
  $disabled?: boolean
}

export type BasicLinkButtonStylesProps = Pick<LinkButtonStyleProps, '$square' | '$disabled' | 'size'>

export const BasicLinkButtonStyles = css<BasicLinkButtonStylesProps>`
  &,
  &:visited {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: fit-content;
    min-width: ${getHeight};
    ${(props) => {
      if (props.$square)
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

    ${LinkButtonInnerWrapper} > svg {
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

    ${(props) =>
      props.$disabled &&
      css`
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
      `}
  }
`

export const BasicLinkButtonPrimaryStyles = css<BasicLinkButtonStylesProps>`
  ${BasicLinkButtonStyles};

  &,
  &:visited {
    color: ${Colors.White};
    border-color: ${Colors.Blue[500]};
    background-color: ${Colors.Blue[500]};

    ${LinkButtonInnerWrapper} > svg {
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

    ${(props) =>
      props.$disabled &&
      css`
        background-color: ${Colors.Blue[100]};
        border-color: ${Colors.Blue[100]};
      `}
  }
`

export const LinkButtonPrimaryStyles = styled(Link)<LinkButtonStyleProps>`
  ${BasicLinkButtonPrimaryStyles};
`

const ExternalLinkButtonPrimaryStyles = styled.a`
  ${BasicLinkButtonPrimaryStyles}
`

export const LinkButtonSecondaryStyles = styled(Link)<LinkButtonStyleProps>`
  ${BasicLinkButtonStyles};

  &,
  &:visited {
    border-color: ${Colors.Black[75]};
    background-color: ${Colors.Black[75]};

    ${LinkButtonInnerWrapper} > svg {
      color: ${({ $square }) => ($square ? Colors.Black[900] : Colors.Black[400])};
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

      ${LinkButtonInnerWrapper} > svg {
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

export const BasicLinkButtonGhostStyles = css<BasicLinkButtonStylesProps>`
  ${BasicLinkButtonStyles};

  &,
  &:visited {
    color: ${Colors.Black[900]};
    border-color: ${Colors.Black[200]};
    background-color: ${Colors.White};

    ${LinkButtonInnerWrapper} > svg {
      color: ${({ $square }) => ($square ? Colors.Black[900] : Colors.Black[400])};
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

      ${LinkButtonInnerWrapper} > svg {
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

export const LinkButtonGhostStyles = styled(Link)<LinkButtonStyleProps>`
  ${BasicLinkButtonGhostStyles};
`

export const LinkButtonBareGhostStyles = styled(Link)<LinkButtonStyleProps>`
  ${BasicLinkButtonStyles};

  &,
  &:visited {
    color: ${Colors.Black[900]};
    border-color: transparent;
    background-color: ${Colors.White};

    ${LinkButtonInnerWrapper} > svg {
      color: ${({ $square }) => ($square ? Colors.Black[900] : Colors.Black[400])};
    }

    &:before,
    &:after {
      display: none;
    }

    &:hover,
    &:focus {
      border-color: transparent;
      color: ${Colors.Blue[500]};

      ${LinkButtonInnerWrapper} > svg {
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

export const LinkButtonLinkStyles = styled(Link)<LinkButtonStyleProps>`
  ${BasicLinkButtonStyles};

  &,
  &:visited {
    grid-column-gap: 4px;
    height: fit-content;
    padding: 0;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: ${Colors.Black[900]};
    text-transform: none;
    border-radius: 0;
    border-color: transparent;
    background-color: transparent;

    ${LinkButtonInnerWrapper} > svg {
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

      ${LinkButtonInnerWrapper} > svg {
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
