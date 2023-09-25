import styled, { css } from 'styled-components'

export const BadgesRow = styled.div<{ space?: number }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 8px;

  ${({ space }) =>
    space &&
    css`
      gap: ${space}px;
    `}
`
