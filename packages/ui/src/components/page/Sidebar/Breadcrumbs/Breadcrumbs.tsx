import React from 'react'
import styled from 'styled-components'

import { BreadcrumbsList, BreadcrumbsListProps } from './BreadcrumbsList'
import { HomeLink } from './HomeLink'

export type BreadcrumbsNavProps = BreadcrumbsListProps

export function Breadcrumbs({ crumbs }: BreadcrumbsNavProps) {
  return (
    <BreadcrumbsNavigation>
      <HomeLink />
      <BreadcrumbsList crumbs={crumbs} />
    </BreadcrumbsNavigation>
  )
}

const BreadcrumbsNavigation = styled.nav`
  display: inline-flex;
  align-items: center;
  position: absolute;
  top: 6px;
  left: 0;
`
