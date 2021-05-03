import React from 'react'
import styled from 'styled-components'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

import { BreadcrumbsItem } from './BreadcrumbsItem'

export interface BreadcrumbsListProps {
  objectName?: string
}

export function BreadcrumbsList({ objectName }: BreadcrumbsListProps) {
  const crumbs = useBreadcrumbs()
  return (
    <BreadcrumbsListComponent>
      {crumbs.map(({ match, key }, index) => (
        <BreadcrumbsItem key={index} href={match.url} text={key} />
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
