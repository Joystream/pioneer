import React from 'react'
import styled, { ThemedStyledProps } from 'styled-components'

interface IconProps extends ThemedStyledProps<React.SVGProps<SVGSVGElement>, any> {
  size: string
}

export interface StyledIcon {
  className?: string
}

export const Icon = React.memo(styled.svg<IconProps>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  position: relative;
`)
