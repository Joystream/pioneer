import React, { AnchorHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

import { Colors, Transitions } from '../constants'

export interface StyledLinkProps {
  dark?: boolean
  size?: 'm' | 'l'
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, StyledLinkProps {}

export const Link = ({ href, className, children, dark, size, onClick }: LinkProps) => (
  <StyledLink href={href} target="_blank" className={className} dark={dark} size={size} onClick={onClick}>
    {children}
  </StyledLink>
)

export const LinkStyles = css<StyledLinkProps>`
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

export const StyledLink = styled.a<StyledLinkProps>`
  ${LinkStyles}
`
