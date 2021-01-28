import React from 'react'
import styled from 'styled-components'
import { BreadcrumbsItem, BreadcrumbsItemProps } from './BreadcrumbsItem'

export interface BreadcrumbsListProps {
  crumbs: Array<BreadcrumbsItemProps>
}

export function BreadcrumbsList({ crumbs }: BreadcrumbsListProps) {
  return (
    <BreadcrumbsListComponent>
      {crumbs.map(({ href, text }, index) => (
        <BreadcrumbsItem key={index} href={href} text={text} />
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
