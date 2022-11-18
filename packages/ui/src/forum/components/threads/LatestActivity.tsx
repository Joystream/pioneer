import React, { memo } from 'react'
import styled from 'styled-components'

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

  if (!post) return <Loading withoutMargin />

  return (
    <LatestActivityRowGapBlock>
      <MemberInfo member={post.author} size="s" memberSize="s" hideGroup />
      <TextInlineExtraSmall lighter>{relativeTime(post.createdAt)}</TextInlineExtraSmall>
    </LatestActivityRowGapBlock>
  )
})

export const LatestActivityRowGapBlock = styled(RowGapBlock)`
  row-gap: 12px;
`
