import React from 'react'
import styled, { StyledComponent, ThemedStyledProps } from 'styled-components'

interface IconProps extends ThemedStyledProps<React.SVGProps<SVGSVGElement>, any> {
  size: string
}

export const Icon: StyledComponent<'svg', IconProps, any> = styled.svg`
  height: ${(props) => (props as IconProps).size}px;
  width: ${(props) => (props as IconProps).size}px;
  position: relative;
`
