import React from 'react'
import styled, { ThemedStyledProps } from 'styled-components'

import { BorderRad, Colors } from '@/common/constants'

interface IconWrapperProps extends ThemedStyledProps<React.SVGProps<SVGSVGElement>, any> {
  size: string
  className?: string
}

export const IconWrapper = styled.div<IconWrapperProps>`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: ${({ size }) => size}px;
  max-width: ${({ size }) => size}px;
  z-index: 1;
`

export const IconDecorativeCircle = styled.div<IconWrapperProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: ${BorderRad.full};
  background-color: ${Colors.Black[700]};
  transform: translate(-50%, -50%);
  z-index: -1;
`
