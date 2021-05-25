import React, { AnchorHTMLAttributes } from 'react'
import styled from 'styled-components'

import { Colors, Transitions } from '../constants'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  dark?: boolean
  size?: 'm' | 'l'
}

export const Link = ({ href, className, children, dark, size, onClick }: LinkProps) => (
  <LinkStyles href={href} target="_blank" className={className} dark={dark} size={size} onClick={onClick}>
    {children}
  </LinkStyles>
)

export const LinkStyles = styled.a<LinkProps>`
  color: ${({ dark }) => (dark ? Colors.Black[900] : Colors.Blue[400])};
  ${({ size }) => size === 'l' && 'line-height: 32px'};
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
