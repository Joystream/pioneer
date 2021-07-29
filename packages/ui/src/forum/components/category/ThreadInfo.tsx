import React from 'react'
import styled from 'styled-components'

import { TextExtraSmall, TextMedium } from '@/common/components/typography'
import { Overflow } from '@/common/constants'
import { plural } from '@/common/helpers'
import { spacing } from '@/common/utils/styles'
import { ForumThread } from '@/forum/types'

interface ThreadInfoProps {
  thread: ForumThread & { postCount: number }
}
export const ThreadInfo = ({ thread }: ThreadInfoProps) => (
  <ThreadInfoStyles>
    <TextMedium as="h6" bold>
      {thread.title}
    </TextMedium>
    <TextExtraSmall lighter>
      {thread.postCount} Post{plural(thread.postCount)}
    </TextExtraSmall>
  </ThreadInfoStyles>
)
const ThreadInfoStyles = styled.div`
  & > ${TextMedium} {
    margin-bottom: ${spacing(3 / 2)};
    ${Overflow.FullDots};
  }
`
