import styled from 'styled-components'

import { BorderRad, Colors } from '@/common/constants'
import { Pulse } from '@/common/constants/animations'

interface SkeletonProps {
  variant?: 'rect' | 'circle' | 'text'
  height?: string
  width?: string
}

export const Skeleton = styled.span<SkeletonProps>`
  display: block;
  background-color: ${Colors.SkeletonGrey};
  border-radius: ${({ variant }) => (variant === 'circle' ? '50%' : BorderRad.s)};
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : '1.2rem')};
  animation: ${Pulse} 1.5s ease-in-out 0.5s infinite;
`
