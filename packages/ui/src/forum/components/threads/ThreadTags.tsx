import React from 'react'

import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { ForumThreadTag } from '@/forum/types'

interface ThreadTagsProps {
  tags: ForumThreadTag[]
}

export const ThreadTags = ({ tags }: ThreadTagsProps) => (
  <BadgesRow>
    {tags.map(({ title }, index) => (
      <BadgeStatus size="m" inverted separated key={index}>
        {title}
      </BadgeStatus>
    ))}
  </BadgesRow>
)
