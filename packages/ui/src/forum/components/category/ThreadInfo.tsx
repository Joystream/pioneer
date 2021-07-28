import React from 'react'
import styled from 'styled-components'

import { TextMedium, TextSmall } from '@/common/components/typography'
import { spacing } from '@/common/utils/styles'
import { ForumThread } from '@/forum/types'

interface ThreadInfoProps {
  thread: ForumThread
}
export const ThreadInfo = ({ thread }: ThreadInfoProps) => (
  <ThreadInfoStyles>
    <TextMedium as="h6" bold>
      {thread.title}
    </TextMedium>
    <TextSmall lighter>1201 Posts</TextSmall>
  </ThreadInfoStyles>
)
const ThreadInfoStyles = styled.div`
  & > ${TextMedium} {
    margin-bottom: ${spacing(3 / 2)};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`
