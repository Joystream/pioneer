import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { PageContentFullHeight } from '../../common/components/page/PageContent'
import { Breadcrumbs } from '../../common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { breadcrumbsOptions } from '../constants/breadcrumbs'

export interface OverviewPageLayoutProps {
  main: ReactNode
  sidebar: ReactNode
}

export const OverviewPageLayout = ({ main, sidebar }: OverviewPageLayoutProps) => (
  <PageContentFullHeight>
    <Breadcrumbs breadcrumbsOptions={breadcrumbsOptions} />
    <PageLayoutComponent>
      <PageMain>{main}</PageMain>
      <PageSidebar>{sidebar}</PageSidebar>
    </PageLayoutComponent>
  </PageContentFullHeight>
)

const PageMain = styled.main`
  width: 100%;
  grid-area: main;
  padding-top: 48px;
`

const PageSidebar = styled.aside`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  grid-area: sidebar;
`

const SidebarWidth = '489px'

export const PageLayoutComponent = styled.div`
  display: grid;
  position: relative;
  align-items: start;
  width: 100%;
  min-height: 100%;
  grid-template-columns: 1fr ${SidebarWidth};
  grid-template-areas: 'main sidebar';
`
