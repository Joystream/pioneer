import React from 'react'

import { ModeratedItem } from '@/common/components/ModeratedItem'
import { ForumPost } from '@/forum/types'

interface Props {
  post: ForumPost
  children: React.ReactNode | React.ReactNode[]
}

export const ModeratedPostWrapper = ({ post, children }: Props) => {
  const { status, moderator } = post
  if (status !== 'PostStatusModerated') return <>{children}</>

  return (
    <ModeratedItem
      title="This post has been moderated"
      reason="This post does not belong to this thread"
      moderatorMemberId={moderator?.id}
    >
      {children}
    </ModeratedItem>
  )
}
