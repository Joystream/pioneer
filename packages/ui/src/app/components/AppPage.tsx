import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { PageContent } from '../../common/components/page/PageContent'
import { Breadcrumbs } from '../../common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { breadcrumbsOptions } from '../constants/breadcrumbs'

interface AppPageProps {
  lastBreadcrumb?: string
  children: ReactNode
}

export const AppPage = ({ children, lastBreadcrumb }: AppPageProps) => (
  <PageContent>
    <Breadcrumbs lastBreadcrumb={lastBreadcrumb} breadcrumbsOptions={breadcrumbsOptions} />
    <PageContainer>{children}</PageContainer>
  </PageContent>
)

export const PageContainer = styled.div`
  display: grid;
  align-items: start;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-row-gap: 24px;
  width: 100%;
  flex-grow: 1;
`
