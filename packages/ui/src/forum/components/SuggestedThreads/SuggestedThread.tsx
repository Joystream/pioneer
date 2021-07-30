import React from 'react'

import { ContentWithTabs } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { useForumSuggestedThreads } from '@/forum/hooks/useForumSuggestedThreads'
import { ForumThread } from '@/forum/types'

interface SuggestedThreadProps {
  thread: ForumThread
}

export const SuggestedThread = ({ thread }: SuggestedThreadProps) => {
  return (
    <div>
      {thread.id}: {thread.title}
    </div>
  )
}
