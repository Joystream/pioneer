import React, { ReactNode } from 'react'

import { PageHeaderRow, PageHeaderWrapper } from '@/app/components/PageLayout'
import { ButtonsGroup } from '@/common/components/buttons'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'

export interface PageHeaderProps {
  title: string
  canGoBack?: boolean
  buttons?: ReactNode
  tabs?: ReactNode
  video?: ReactNode
  badges?: ReactNode
}

export const PageHeader = React.memo(({ title, buttons, tabs, video, badges, canGoBack = false }: PageHeaderProps) => (
  <PageHeaderWrapper>
    <PageHeaderRow>
      {canGoBack ? (
        <PreviousPage>
          <PageTitle>{title}</PageTitle>
        </PreviousPage>
      ) : (
        <PageTitle>{title}</PageTitle>
      )}
      <ButtonsGroup>{buttons}</ButtonsGroup>
    </PageHeaderRow>
    {badges}
    {tabs}
    {video}
  </PageHeaderWrapper>
))
