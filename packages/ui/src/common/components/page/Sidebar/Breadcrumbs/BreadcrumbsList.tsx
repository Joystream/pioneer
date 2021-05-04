import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

import { knownRoutes, excludePaths } from '../../../../model/breadcrumbs'

import { BreadcrumbsItem } from './BreadcrumbsItem'

export interface BreadcrumbsListProps {
  objectName?: string
}

export function BreadcrumbsList({ objectName }: BreadcrumbsListProps) {
  const { location } = useHistory()
  const routesList = objectName ? [...knownRoutes, { path: location.pathname, breadcrumb: objectName }] : knownRoutes
  const crumbs = useBreadcrumbs(routesList, { excludePaths })
  console.log(crumbs)
  return (
    <BreadcrumbsListComponent>
      {crumbs.map(({ match: { url }, breadcrumb, key }) => (
        <BreadcrumbsItem key={key} url={url}>
          {breadcrumb}
        </BreadcrumbsItem>
      ))}
    </BreadcrumbsListComponent>
  )
}

const BreadcrumbsListComponent = styled.ul`
  display: inline-flex;
  align-items: center;
  margin: 0;
  padding: 0;
`
