import React from 'react'
import styled from 'styled-components'

import { BreadcrumbsOptions } from '@/app/constants/breadcrumbs'

import { BreadcrumbsList } from './BreadcrumbsList'
import { HomeLink } from './HomeLink'

export interface BreadcrumbsProps {
  breadcrumbsOptions: BreadcrumbsOptions
  lastBreadcrumb?: string
}

export const Breadcrumbs = React.memo(({ breadcrumbsOptions, lastBreadcrumb }: BreadcrumbsProps) => {
  return (
    <BreadcrumbsNavigation>
      <HomeLink />
      <BreadcrumbsList lastBreadcrumb={lastBreadcrumb} breadcrumbsOptions={breadcrumbsOptions} />
    </BreadcrumbsNavigation>
  )
})

export const BreadcrumbsNavigation = styled.nav`
  display: inline-flex;
  align-items: center;
  position: absolute;
  top: 6px;
  left: 0;
`
