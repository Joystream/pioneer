import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Colors } from '../../constants'

interface LabelLinkProps {
  to: string
  target?: string
  children?: React.ReactNode
  className?: string
}

export function LabelLink({ to, target, children, className }: LabelLinkProps) {
  return (
    <StyledLink onClick={(event) => event.stopPropagation()} to={to} target={target} className={className}>
      {children}
    </StyledLink>
  )
}

export const StyledLink = styled(Link)`
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  font-style: inherit;
  font-family: inherit;
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: ${Colors.Blue[400]};
  }
  &:active,
  &:focus {
    outline: none;
    color: ${Colors.Blue[400]};
  }
`
