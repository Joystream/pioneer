import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { Page } from '../../common/components/page/Page'
import { PageContent } from '../../common/components/page/PageContent'
import { PageHeader } from '../../common/components/page/PageHeader'
import { PageTabs, TabProps } from '../../common/components/page/PageTabs'
import { PageTitle } from '../../common/components/page/PageTitle'
import { Breadcrumbs } from '../../common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'

import { SideBar } from './SideBar'

interface AppPageProps {
  crumbs: { href: string; text: string }[]
  pageTitle: string
  tabs: TabProps[]
  children: ReactNode
}

export const AppPage = ({ children, crumbs, pageTitle, tabs }: AppPageProps) => (
  <Page>
    <SideBar />
    <PageContent>
      <Breadcrumbs crumbs={crumbs} />
      <PageContainer>
        <PageHeader>
          <PageTitle>{pageTitle}</PageTitle>
          <PageTabs tabs={tabs} />
        </PageHeader>
        {children}
      </PageContainer>
    </PageContent>
  </Page>
)

export const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: 24px;
  width: 100%;
`
