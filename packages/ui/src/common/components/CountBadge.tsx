import React from 'react'
import styled from 'styled-components'

import { Colors } from '../constants'

import { Badge } from './typography'

interface CountBadgeProps {
  count: number
  className?: string
}

export const CountBadge = React.memo(({ count, className }: CountBadgeProps) => (
  <CountBadgeComponent className={className}>{count}</CountBadgeComponent>
))

export const CountBadgeComponent = styled(Badge)`
  color: ${Colors.Blue[500]};
  background-color: ${Colors.Blue[50]};
  -webkit-text-stroke-width: 0;
  -webkit-text-stroke-color: transparent;
`
