import styled, { css } from 'styled-components'

export const PageTitle = styled.h2<{ $isRemovedThread?: boolean }>`
  margin-right: auto;
  text-transform: capitalize;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  overflow: hidden;
  ${({ $isRemovedThread }) =>
    $isRemovedThread &&
    css`
      text-decoration-line: line-through;
    `}
  @media (max-width: 767px) {
    display: block;
  }
`
PageTitle.defaultProps = {
  $isRemovedThread: false,
}
