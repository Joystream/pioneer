import React from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

import { BreadcrumbsProps } from './Breadcrumbs'
import { BreadcrumbsItem } from './BreadcrumbsItem'

export const BreadcrumbsList = React.memo(
  ({ lastBreadcrumb, breadcrumbsOptions: { knownRoutes, excludePaths } }: BreadcrumbsProps) => {
    const location = useLocation()
    const routesList = lastBreadcrumb
      ? [...knownRoutes, { path: location.pathname, breadcrumb: lastBreadcrumb }]
      : knownRoutes
    const crumbs = useBreadcrumbs(routesList, { excludePaths })
    return (
      <BreadcrumbsListComponent>
        {crumbs.map(({ match: { url }, breadcrumb, key }, index, { length }) => (
          <BreadcrumbsItem key={key} url={url} isLink={index < length - 1}>
            {breadcrumb}
          </BreadcrumbsItem>
        ))}
      </BreadcrumbsListComponent>
    )
  }
)

export const BreadcrumbsListComponent = styled.ul`
  display: inline-flex;
  align-items: center;
  margin: 0;
  padding: 0;
`
