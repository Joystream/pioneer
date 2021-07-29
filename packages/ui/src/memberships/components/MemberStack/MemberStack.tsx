import React, { memo } from 'react'
import styled from 'styled-components'

import { DefaultTooltip, Tooltip, TooltipContainer } from '@/common/components/Tooltip'
import { TextInlineSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { spacing } from '@/common/utils/styles'
import { MemberPhoto } from '@/memberships/components'
import { MemberAvatar } from '@/memberships/components/Avatar'
import { Member } from '@/memberships/types'

export type MemberSumary = Pick<Member, 'id' | 'handle' | 'avatar'>

interface MemberStackProps {
  members: MemberSumary[]
  max?: number
}
export const MemberStack = memo(({ members, max = 5 }: MemberStackProps) => {
  const hasExtra = members.length > max
  const toDisplay = hasExtra ? members.slice(0, max - 1) : members
  const remaining = +hasExtra && members.length - max + 1

  return (
    <MemberStackStyles>
      {toDisplay.map(({ id, handle, avatar }) => (
        <Tooltip key={id} tooltipTitle={handle} tooltipText={`Worker ID: ${id}`}>
          <MemberAvatar avatarUri={avatar} />
        </Tooltip>
      ))}
      {hasExtra && (
        <Tooltip tooltipText={`And ${remaining} more`}>
          <HiddenMember>
            <TextInlineSmall bold>+{remaining}</TextInlineSmall>
          </HiddenMember>
        </Tooltip>
      )}
    </MemberStackStyles>
  )
})

const HiddenMember = styled(DefaultTooltip)`
  background-color: ${Colors.Blue[50]};
  outline: 1px solid ${Colors.Black[200]};
  height: 26px;
  width: 26px;

  ${TextInlineSmall} {
    font-size: 10px;
  }
`
const outlineWidth = '2px'
const MemberStackStyles = styled.div`
  display: flex;

  ${TooltipContainer} {
    margin-right: ${spacing(-1)};
    &:hover {
      margin-right: ${outlineWidth};
    }
    &:last-child {
      margin-right: 0;
    }
  }
  ${MemberPhoto} {
    cursor: pointer;
    outline: ${outlineWidth} solid ${Colors.White};
    height: 26px;
    width: 26px;
  }
`
