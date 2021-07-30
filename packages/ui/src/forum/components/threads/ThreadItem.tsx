import React from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons'
import { CountBadge } from '@/common/components/CountBadge'
import { Arrow } from '@/common/components/icons'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { BorderRad, Colors, Transitions } from '@/common/constants'

import { ThreadItemContent } from './ThreadItemContent'
import { ThreadsLayoutSpacing } from './ThreadsLayout'

export interface ThreadItemProps {
  label: string
  count?: number
}

export const ThreadItem = ({ label, count }: ThreadItemProps) => {
  return (
    <ThreadItemStyles>
      <ThreadItemHeader align="center" gap={16}>
        <Label>
          {label} {count && <CountBadge count={count} />}
        </Label>
        <ButtonsGroup>
          <ButtonGhost size="small" square>
            <Arrow direction="left" />
          </ButtonGhost>
          <ButtonGhost size="small" square>
            <Arrow direction="right" />
          </ButtonGhost>
        </ButtonsGroup>
      </ThreadItemHeader>
      <ThreadItemContent title="Title" />
    </ThreadItemStyles>
  )
}

const ThreadItemSpacer = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${Colors.Black[100]};
  transition: ${Transitions.all};
`

const ThreadItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: calc(50% - (${ThreadsLayoutSpacing} / 2));
  flex-shrink: 0;
  flex-grow: 1;
  max-width: 100%;
  max-height: 472px;
  padding: 16px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  overflow: hidden;
  transition: ${Transitions.all};

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
