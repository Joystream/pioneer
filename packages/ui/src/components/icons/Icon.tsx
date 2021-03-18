import React from 'react'
import styled, { ThemedStyledProps } from 'styled-components'

interface IconProps extends ThemedStyledProps<React.SVGProps<SVGSVGElement>, any> {
  size: string
}

export const Icon = React.memo(styled.svg`
  height: ${(props) => (props as IconProps).size}px;
  width: ${(props) => (props as IconProps).size}px;
  position: relative;
`)
