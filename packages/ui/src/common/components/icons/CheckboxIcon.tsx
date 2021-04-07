import React from 'react'
import styled from 'styled-components'

import { Icon } from './Icon'

export function CheckboxIcon() {
  return (
    <CheckboxIconStyles
      size="24"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      color="currentColor"
    >
      <path
        d="M20 7.5975L9.90608 18L4 12.735L5.78463 11.0132L9.77205 14.5679L18.0857 6L20 7.5975Z"
        fill="currentColor"
      />
    </CheckboxIconStyles>
  )
}

export const CheckboxIconStyles = styled(Icon)``
