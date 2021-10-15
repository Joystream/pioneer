import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SidePanel } from '@/common/components/page/SidePanel'
import { ForumPageHeader } from '@/forum/components/ForumPageHeader'
import { MyThreadsBrowser } from '@/forum/components/threads/MyThreadsBrowser'
import { PopularThreadsBrowser } from '@/forum/components/threads/PopularThreadsBrowser'
import { ThreadsLayout } from '@/forum/components/threads/ThreadsLayout'
import { WatchlistThreadsBrowser } from '@/forum/components/threads/WatchlistThreadsBrowser'
import { useForumActivities } from '@/forum/hooks/useForumActivities'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { ForumTabs } from './components/ForumTabs'

export const ForumOverview = () => {
  const { activities } = useForumActivities()
  const { hasMembers } = useMyMemberships()

  return (
    <PageLayout
      header={
        <ForumPageHeader title={<PageTitle>Forum</PageTitle>}>
          <ForumTabs />
        </ForumPageHeader>
      }
      main={
        <MainPanel>
          <ThreadsLayout>
            {hasMembers && (
              <>
                <MyThreadsBrowser />
                <WatchlistThreadsBrowser />
              </>
            )}
            <PopularThreadsBrowser />
          </ThreadsLayout>
        </MainPanel>
      }
      sidebar={
        <SidePanel>
          <ActivitiesBlock activities={activities} label="Forum Activities" />
        </SidePanel>
      }
    />
  )
}
