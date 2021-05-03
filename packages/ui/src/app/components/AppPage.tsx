import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { PageContent } from '../../common/components/page/PageContent'
import { Breadcrumbs } from '../../common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'

interface AppPageProps {
  objectName?: string
  children: ReactNode
}

export const AppPage = ({ children, objectName }: AppPageProps) => (
  <PageContent>
    <Breadcrumbs objectName={objectName} />
    <PageContainer>{children}</PageContainer>
  </PageContent>
)

export const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: 24px;
  width: 100%;
`
