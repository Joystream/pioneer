import styled, { css } from 'styled-components'

export const BadgesRow = styled.div<{ space?: number }>`
  display: flex;
  align-items: center;

  ${({ space }) =>
    space &&
    css`
      gap: ${space}px;
    `}
`
