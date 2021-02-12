import React from 'react'
import styled from 'styled-components'
import { Colors, Transitions } from '../../constants/styles'

interface LabelLinkProps {
  href: string
  target?: string
  children?: string | React.ReactElement
}

export function LabelLink({ href, target, children }: LabelLinkProps) {
  return (
    <Link onClick={(event) => event.stopPropagation()} href={href} target={target}>
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
  transition: ${Transitions.all};

  &:hover {
    color: ${Colors.Blue[500]};
  }
  &:active,
  &:focus {
    outline: none;
    color: ${Colors.Blue[600]};
  }
`
