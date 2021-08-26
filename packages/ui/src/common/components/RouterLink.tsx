import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import styled from 'styled-components'

import { LinkStyles, StyledLinkProps } from './Link'

interface Props extends StyledLinkProps, LinkProps, React.RefAttributes<HTMLAnchorElement> {}

export const RouterLink = styled(Link)<Props>`
  ${LinkStyles}
`

export const GhostRouterLink = styled(Link)`
  color: unset;
  font-family: unset;
`
