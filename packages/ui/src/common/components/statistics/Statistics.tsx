import styled from 'styled-components'

export const Statistics = styled.ul<{ withMargin?: boolean }>`
  display: flex;
  width: 100%;
  justify-items: flex-start;
  ${({ withMargin }) => (withMargin ? 'margin-top: 8px;' : null)};
`
