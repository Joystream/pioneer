import { startOfToday, subDays } from 'date-fns'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ForumRoutes } from '@/forum/constant'
import { useLatestForumThreads } from '@/forum/hooks/useLatestForumThreads'
import { useThreadsCount } from '@/forum/hooks/useThreadsCount'
import { OverviewInfoElement } from '@/overview/components/OverviewInfoElement'
import { OverviewWrapper } from '@/overview/components/OverviewWrapper'

import { ForumThreadTilesList } from './ForumThreadTilesList'

const THREADS_NUMBER = 5
const WEEK_AGO = subDays(startOfToday(), 7).toISOString()

export const ForumThreadsOverview = () => {
  const { t } = useTranslation('overview')
  const { threads } = useLatestForumThreads(THREADS_NUMBER)
  const { threadsCount, isLoading: threadsCountLoading } = useThreadsCount(WEEK_AGO)

  const infoElements = useMemo(
    () => <OverviewInfoElement value={threadsCount} label={t('forum.newThreads')} isLoading={threadsCountLoading} />,
    [t, threadsCount]
  )

  return (
    <OverviewWrapper
      title={t('forum.title')}
      linkPath={ForumRoutes.forum}
      infoElements={infoElements}
      scroller={<ForumThreadTilesList threads={threads} />}
    />
  )
}
