import React from 'react'
import styled from 'styled-components'

export const BlockIcon = ({ className }: { className?: string }) => (
  <BlockIconStyles
    viewBox="0 0 16 16"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    color="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 1L14 4.75V11.5094L8 14.8844L2 11.5094V4.75L8 1ZM3.33333 6.2594L7.33333 8.5094V12.9796L3.33333 10.7296V6.2594ZM8.66667 12.9796L12.6667 10.7296V5.489L8 2.57233L3.97283 5.08931L7.99397 7.35121L11.0927 5.54365L11.7645 6.69535L8.66667 8.50241V12.9796Z"
      fill="currentColor"
    />
  </BlockIconStyles>
)

export const BlockIconStyles = styled.svg`
  width: 16px;
  height: 16px;
`
