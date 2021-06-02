import styled, { css } from 'styled-components'

import { BorderRad, Colors, Overflow } from '../../constants'
import { spacing } from '../../utils/styles'

export interface BadgeStatusProps {
  inverted?: boolean
  size?: 'm' | 'l'
  separated?: boolean
  ended?: boolean
}

export const BadgeStatus = styled.span<BadgeStatusProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  min-width: ${({ size }) => (size === 'l' ? '24px' : '16px')};
  height: ${({ size }) => (size === 'l' ? '24px' : '16px')};
  padding: 0 8px;
  border-radius: ${BorderRad.full};
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  text-transform: uppercase;
  ${Overflow.FullDots}

  ${({ separated }) =>
    separated &&
    css`
      margin: ${spacing(0, 0.5)};

      &:last-child {
        margin-right: 0;
      }

      &:first-child {
        margin-left: 0;
      }
    `};

  ${({ inverted }) =>
    inverted
      ? css`
          color: ${Colors.Blue[500]};
          background-color: ${Colors.Blue[100]};
        `
      : css`
          color: ${Colors.White};
          background-color: ${Colors.Blue[200]};
        `};

  ${({ ended }) =>
    ended &&
    css`
      color: ${Colors.Red[400]};
      background-color: ${Colors.Red[50]};
    `}
`
