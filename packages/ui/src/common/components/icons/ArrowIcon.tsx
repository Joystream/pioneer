import { styled } from '@storybook/theming'
import React from 'react'

import { Icon } from './Icon'

interface ArrowProps {
  direction?: 'down' | 'left' | 'up' | 'right'
  className?: string
}

export function Arrow({ className, direction }: ArrowProps) {
  return (
    <ArrowIcon
      size="16"
      viewBox="0 0 16 16"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      color="currentColor"
      className={className}
      direction={direction}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.13804 9.3253L3.67065 4.85791L2.66669 5.86187L8.13804 11.3332L13.6094 5.86187L12.6054 4.85791L8.13804 9.3253Z"
        fill="currentColor"
      />
    </ArrowIcon>
  )
}

const ArrowIcon = styled(Icon)<ArrowProps>`
  transform: ${({ direction }) => {
    switch (direction) {
      case 'up':
        return 'rotate(180deg)'
      case 'right':
        return 'rotate(270deg)'
      case 'left':
        return 'rotate(90deg)'
      case 'down':
      default:
        return 'rotate(0deg)'
    }
  }};
`
