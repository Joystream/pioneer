import React from 'react'
import styled, { StyledComponent, ThemedStyledProps } from 'styled-components'

interface IconProps extends ThemedStyledProps<React.SVGProps<SVGSVGElement>, any> {
  size: string
}

export const Icon: StyledComponent<'svg', IconProps, any> = styled.svg`
  height: ${(props) => (props as any).size}px;
  width: ${(props) => (props as any).size}px;
  position: relative;
`
