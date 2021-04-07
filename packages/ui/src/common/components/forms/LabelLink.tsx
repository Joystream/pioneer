import React from 'react'
import styled from 'styled-components'

import { Colors } from '../../../app/constants'

interface LabelLinkProps {
  href?: string
  target?: string
  children?: string | React.ReactElement
  className?: string
}

export function LabelLink({ href, target, children, className }: LabelLinkProps) {
  return (
    <Link onClick={(event) => event.stopPropagation()} href={href} target={target} className={className}>
      {children}
    </Link>
  )
}

export const Link = styled.a`
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  font-style: inherit;
  font-family: inherit;
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: ${Colors.Blue[500]};
  }
  &:active,
  &:focus {
    outline: none;
    color: ${Colors.Blue[600]};
  }
`
