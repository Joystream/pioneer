import styled, { css } from 'styled-components'

import { BorderRad, Colors, Overflow } from '../../constants'

export interface BadgeStatusProps {
  size?: 'm' | 'l'
  separated?: boolean
  succeeded?: boolean
  ended?: boolean
  inverted?: boolean
  children?: string
  color?: string
}

export const BadgeStatusCss = css<BadgeStatusProps>`
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: fit-content;
  min-width: ${({ size }) => (size === 'l' ? '24px' : '16px')};
  height: ${({ size }) => (size === 'l' ? '24px' : '16px')};
  padding: 0 8px;
  border-radius: ${BorderRad.full};
  font-size: 10px;
  line-height: ${({ size }) => (size === 'l' ? '24px' : '16px')};
  font-weight: 700;
  text-transform: uppercase;
  ${Overflow.FullDots};

  ${({ separated }) =>
    separated &&
    css`
      margin: 0 4px;

      &:last-child {
        margin-right: 0;
      }

      &:first-child {
        margin-left: 0;
      }
    `};

  ${({ inverted, ended, succeeded, color }) => {
    if (succeeded)
      return css`
        color: ${Colors.Green[500]};
        background-color: ${Colors.Green[50]};
      `
    else if (ended)
      return css`
        color: ${Colors.Red[400]};
        background-color: ${Colors.Red[50]};
      `
    else if (inverted)
      return css`
        color: ${Colors.Blue[500]};
        background-color: ${Colors.Blue[100]};
      `
    else
      return css`
        color: ${Colors.White};
        background-color: ${color || Colors.Blue[200]};
      `
  }}
`

export const BadgeStatus = styled.span.attrs((props) => ({
  title: props.children,
}))<BadgeStatusProps>`
  ${BadgeStatusCss}
`
