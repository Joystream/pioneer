import React from 'react'
import styled from 'styled-components'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

import { routesList, excludePaths } from '../../../../model/breadcrumbs'

import { BreadcrumbsItem } from './BreadcrumbsItem'

export interface BreadcrumbsListProps {
  objectName?: string
}

export function BreadcrumbsList({ objectName }: BreadcrumbsListProps) {
  const crumbs = useBreadcrumbs(routesList, { excludePaths })
  return (
    <BreadcrumbsListComponent>
      {crumbs.map(({ match: { url }, breadcrumb, key }) => (
        <BreadcrumbsItem key={key} href={url}>
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
