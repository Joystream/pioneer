import React from 'react'

import { PageLayoutContent, PageLayoutProps } from '@/app/components/PageLayout'
import { PageContent } from '@/common/components/page/PageContent'
import { CategoryBreadcrumbs } from '@/forum/components/CategoryBreadcrumbs'
import { ThreadBreadcrumbs } from '@/forum/components/ThreadBreadcrumbs'

interface ForumLayoutProps extends PageLayoutProps {
  isThread?: boolean
  isCategory?: boolean
}

export const ForumPageLayout = ({ header, main, sidebar, footer, isThread }: ForumLayoutProps) => {
  const Breadcrumbs = isThread ? ThreadBreadcrumbs : CategoryBreadcrumbs
  return (
    <PageContent>
      <Breadcrumbs />
      <PageLayoutContent header={header} main={main} sidebar={sidebar} footer={footer} />
    </PageContent>
  )
}
