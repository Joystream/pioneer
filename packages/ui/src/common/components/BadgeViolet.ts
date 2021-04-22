import styled, { css } from 'styled-components'

import { BorderRad, Colors, Overflow } from '../constants'

interface BadgeVioletProps {
  inverted?: boolean
  size?: 'm' | 'l'
}

export const BadgeViolet = styled.span<BadgeVioletProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: ${({ size }) => (size === 'l' ? '24px' : '16px')};
  padding: 0 8px;
  border-radius: ${BorderRad.full};
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  text-transform: uppercase;
  ${Overflow.Dots}

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
`
