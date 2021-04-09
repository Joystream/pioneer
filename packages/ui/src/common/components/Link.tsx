import React from 'react'
import styled from 'styled-components'

import { Colors, Transitions } from '../constants'

interface LinkProps {
  href?: string
  className?: string
  children?: React.ReactNode
}

export const Link = ({ href, className, children }: LinkProps) => (
  <LinkStyles href={href} target="_blank" className={className}>
    {children}
  </LinkStyles>
)

export const LinkStyles = styled.a`
  color: ${Colors.Blue[400]};
  text-decoration: underline;
  text-underline-offset: 1px;
  transition: ${Transitions.all};
  cursor: pointer;

  &:hover,
  &:focus,
  &:focus-within {
    color: ${Colors.Blue[500]};
  }
  &:active {
    color: ${Colors.Blue[600]};
  }
`
