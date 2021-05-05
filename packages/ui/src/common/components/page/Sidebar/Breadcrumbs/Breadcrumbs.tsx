import React from 'react'
import styled from 'styled-components'

import { BreadcrumbsList } from './BreadcrumbsList'
import { HomeLink } from './HomeLink'

export const Breadcrumbs = React.memo(({ lastBreadcrumb }: { lastBreadcrumb?: string }) => {
  return (
    <BreadcrumbsNavigation>
      <HomeLink />
      <BreadcrumbsList lastBreadcrumb={lastBreadcrumb} />
    </BreadcrumbsNavigation>
  )
})

const BreadcrumbsNavigation = styled.nav`
  display: inline-flex;
  align-items: center;
  position: absolute;
  top: 6px;
  left: 0;
`
