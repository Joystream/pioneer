import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { PageTitle } from '@/common/components/page/PageTitle'
import { ForumMain } from '@/forum/components/category'
import { ForumPageHeader } from '@/forum/components/ForumPageHeader'

import { ForumTabs } from './components/ForumTabs'

export const Forum = () => {
  return (
    <PageLayout
      header={
        <ForumPageHeader title={<PageTitle>Forum</PageTitle>}>
          <ForumTabs />
        </ForumPageHeader>
      }
      main={<ForumMain />}
    />
  )
}
