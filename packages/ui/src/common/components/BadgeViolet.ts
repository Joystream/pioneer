import styled, { css } from 'styled-components'

import { BorderRad, Colors, Overflow } from '../constants'

export const BadgeViolet = styled.span<{ inverted?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 16px;
  padding: 0 8px;
  border-radius: ${BorderRad.l};
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  text-transform: uppercase;
  ${Overflow.Dots}

  ${({ inverted }) =>
    inverted
      ? css`
          background-color: ${Colors.Blue[50]};
        `
      : css`
          background-color: ${Colors.Blue[200]};
          color: ${Colors.Blue[500]};
        `}
`
