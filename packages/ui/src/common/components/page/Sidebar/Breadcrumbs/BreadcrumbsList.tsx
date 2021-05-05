import React from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

import { knownRoutes, excludePaths } from '../../../../model/breadcrumbs'

import { BreadcrumbsItem } from './BreadcrumbsItem'

export const BreadcrumbsList = React.memo(({ lastBreadcrumb }: { lastBreadcrumb?: string }) => {
  const location = useLocation()
  const routesList = lastBreadcrumb
    ? [...knownRoutes, { path: location.pathname, breadcrumb: lastBreadcrumb }]
    : knownRoutes
  const crumbs = useBreadcrumbs(routesList, { excludePaths })
  return (
    <BreadcrumbsListComponent>
      {crumbs.map(({ match: { url }, breadcrumb, key }) => (
        <BreadcrumbsItem key={key} url={url}>
          {breadcrumb}
        </BreadcrumbsItem>
      ))}
    </BreadcrumbsListComponent>
  )
})

const BreadcrumbsListComponent = styled.ul`
  display: inline-flex;
  align-items: center;
  margin: 0;
  padding: 0;
`
