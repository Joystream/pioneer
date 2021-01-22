import React from 'react'
import styled from 'styled-components'

export function ArrowDownIcon() {
  return (
    <Icon viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="none" color="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.13804 9.3253L3.67065 4.85791L2.66669 5.86187L8.13804 11.3332L13.6094 5.86187L12.6054 4.85791L8.13804 9.3253Z"
        fill="currentColor"
      />
    </Icon>
  )
}

const Icon = styled.svg`
  height: 16px;
  width: 16px;
  position: relative;
`
