import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { PageContent } from '../../common/components/page/PageContent'
import { Breadcrumbs } from '../../common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { breadcrumbsOptions } from '../constants/breadcrumbs'

interface AppPageProps extends PageLayoutProps, PageLayoutItemsProps {
  lastBreadcrumb?: string
}

interface PageLayoutItemsProps {
  header?: ReactNode
  content?: ReactNode
  sidebar?: ReactNode
  footer?: ReactNode
}

interface PageLayoutProps {
  rowGap?: 's' | 'm'
  columnGap?: 's' | 'm'
}

export const PageLayout = ({ header, content, sidebar, footer, lastBreadcrumb, rowGap }: AppPageProps) => (
  <PageContent>
    <Breadcrumbs lastBreadcrumb={lastBreadcrumb} breadcrumbsOptions={breadcrumbsOptions} />
    <PageLayoutComponent rowGap={rowGap} header={header} content={content} sidebar={sidebar} footer={footer}>
      {header}
      {content}
      {sidebar}
      {footer}
    </PageLayoutComponent>
  </PageContent>
)

export const PageLayoutComponent = styled.div<PageLayoutProps & PageLayoutItemsProps>`
  display: grid;
  align-items: start;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-row-gap: ${({ rowGap }) => {
    switch (rowGap) {
      case 's':
        return '16px'
      case 'm':
      default:
        return '24px'
    }
  }};
  width: 100%;
`
