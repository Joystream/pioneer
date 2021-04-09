import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { PageContent } from '../../common/components/page/PageContent'
import { PageHeader } from '../../common/components/page/PageHeader'
import { PageTitle } from '../../common/components/page/PageTitle'
import { Breadcrumbs } from '../../common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { Tabs, TabProps } from '../../common/components/Tabs'

interface AppPageProps {
  crumbs: { href: string; text: string }[]
  pageTitle: string
  tabs: TabProps[]
  children: ReactNode
}

export const AppPage = ({ children, crumbs, pageTitle, tabs }: AppPageProps) => (
  <PageContent>
    <Breadcrumbs crumbs={crumbs} />
    <PageContainer>
      <PageHeader>
        <PageTitle>{pageTitle}</PageTitle>
        <Tabs tabs={tabs} />
      </PageHeader>
      {children}
    </PageContainer>
  </PageContent>
)

export const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: 24px;
  width: 100%;
`
