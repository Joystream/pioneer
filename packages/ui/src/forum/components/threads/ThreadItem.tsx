import React from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons'
import { CountBadge } from '@/common/components/CountBadge'
import { Arrow } from '@/common/components/icons'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { BorderRad, Colors, Transitions } from '@/common/constants'
import { ForumThread } from '@/forum/types'

import { ThreadItemContent } from './ThreadItemContent'
import { ThreadsLayoutSpacing } from './ThreadsLayout'

export interface ThreadItemProps {
  categoryLabel: string
  categoryCount?: number
  thread: ForumThread
  withButtons?: boolean
}

export const ThreadItem = ({ categoryLabel, categoryCount, thread, withButtons = true }: ThreadItemProps) => {
  return (
    <ThreadItemStyles>
      <ThreadItemHeader align="center" gap={16}>
        <Label>
          {categoryLabel} {categoryCount && <CountBadge count={categoryCount} />}
        </Label>
        {withButtons && (
          <ButtonsGroup>
            <ButtonGhost size="small" square>
              <Arrow direction="left" />
            </ButtonGhost>
            <ButtonGhost size="small" square>
              <Arrow direction="right" />
            </ButtonGhost>
          </ButtonsGroup>
        )}
      </ThreadItemHeader>
      <ThreadItemContent {...thread} />
    </ThreadItemStyles>
  )
}

export const ThreadItemSpacer = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${Colors.Black[100]};
  transition: ${Transitions.all};
`

export const ThreadItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: calc(50% - (${ThreadsLayoutSpacing} / 2));
  flex-shrink: 0;
  flex-grow: 1;
  max-width: 100%;
  max-height: 472px;
  overflow: hidden;
  transition: ${Transitions.all};
  padding: 16px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};

  &:hover,
  &:focus,
  &:focus-within {
    &,
    ${ThreadItemSpacer} {
      border-color: ${Colors.Blue[100]};
    }
  }
`

const ThreadItemHeader = styled(ColumnGapBlock)`
  justify-content: space-between;
  width: 100%;
`
