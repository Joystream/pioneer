import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { PageContent } from '../../common/components/page/PageContent'
import { Breadcrumbs } from '../../common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { breadcrumbsOptions } from '../constants/breadcrumbs'

interface AppPageProps extends PageContainerProps {
  lastBreadcrumb?: string
  children: ReactNode
}

interface PageContainerProps {
  rowGap?: 's' | 'm'
}

export const AppPage = ({ children, lastBreadcrumb, rowGap }: AppPageProps) => (
  <PageContent>
    <Breadcrumbs lastBreadcrumb={lastBreadcrumb} breadcrumbsOptions={breadcrumbsOptions} />
    <PageContainer rowGap={rowGap}>{children}</PageContainer>
  </PageContent>
)

export const PageContainer = styled.div<PageContainerProps>`
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
