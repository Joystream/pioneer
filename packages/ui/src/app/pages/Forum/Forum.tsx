import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { PageTitle } from '@/common/components/page/PageTitle'
import { useToggle } from '@/common/hooks/useToggle'
import { ForumMain } from '@/forum/components/category'
import { ForumActivities } from '@/forum/components/ForumActivities'
import { ForumPageHeader } from '@/forum/components/ForumPageHeader'

import { ForumTabs } from './components/ForumTabs'

export const Forum = () => {
  const [value, toggle] = useToggle(false)
  return (
    <PageLayout
      header={
        <ForumPageHeader title={<PageTitle>Forum</PageTitle>}>
          <ForumTabs />
        </ForumPageHeader>
      }
      main={
        <>
          <ForumMain />
          {value && <ForumActivities onClose={toggle} />}
        </>
      }
    />
  )
}
