import React, { memo } from 'react'

import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextInlineExtraSmall } from '@/common/components/typography'
import { relativeTime } from '@/common/model/relativeTime'
import { useThreadLatestPost } from '@/forum/hooks/useThreadLatestPost'
import { MemberInfo } from '@/memberships/components'

export interface LatestActivitydProps {
  threadId: string
}
export const LatestActivity = memo(({ threadId }: LatestActivitydProps) => {
  const { post } = useThreadLatestPost(threadId)

  if (!post) return <Loading />

  return (
    <RowGapBlock gap={12}>
      <MemberInfo member={post.author} size="s" memberSize="s" showGroup={false} />
      <TextInlineExtraSmall lighter>{relativeTime(post.createdAt)}</TextInlineExtraSmall>
    </RowGapBlock>
  )
})
