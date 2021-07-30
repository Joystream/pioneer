import React from 'react'
import styled from 'styled-components'

import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { CountBadge } from '@/common/components/CountBadge'
import { AnswerIcon } from '@/common/components/icons/AnswerIcon'
import { ColumnGapBlock, RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextInlineExtraSmall, TextMedium } from '@/common/components/typography'
import { Colors, Overflow } from '@/common/constants'

export interface ThreadItemContentProps {
  title: string
}

export const ThreadItemContent = ({ title }: ThreadItemContentProps) => {
  return (
    <ThreadContent gap={16}>
      <ThreadContentHeader align="center">
        <ThreadContentTitle>{title}</ThreadContentTitle>
        <ThreadContentTime lighter>15 min</ThreadContentTime>
      </ThreadContentHeader>
      <TextMedium light value>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, fugit. Est dignissimos perferendis similique
        numquam totam nam commodi reiciendis deserunt cumque blanditiis! Pariatur excepturi fugit inventore dolorum
        laboriosam sit similique?
      </TextMedium>
      <ThreadContentFooter gap={8}>
        <BadgesRow>
          <BadgeStatus size="m" inverted separated>
            badge 1
          </BadgeStatus>
          <BadgeStatus size="m" inverted separated>
            badge 2
          </BadgeStatus>
        </BadgesRow>
        <Label>
          <StyledAnswerIcon /> Answers <CountBadge count={10} />
        </Label>
      </ThreadContentFooter>
    </ThreadContent>
  )
}

const ThreadContent = styled(RowGapBlock)`
  width: 100%;
  height: fit-content;
  max-height: 100%;
  padding: 16px 0;
  overflow: hidden;
`

const ThreadContentHeader = styled(ColumnGapBlock)`
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`

const ThreadContentTitle = styled.h5`
  ${Overflow.FullDots};
`

const ThreadContentTime = styled(TextInlineExtraSmall)`
  ${Overflow.FullDots};
`

const ThreadContentFooter = styled(RowGapBlock)`
  max-width: 100%;
  overflow: hidden;
`

const StyledAnswerIcon = styled(AnswerIcon)`
  color: ${Colors.Black[300]};
`
