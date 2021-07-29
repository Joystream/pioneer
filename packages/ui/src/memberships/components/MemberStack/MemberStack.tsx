import React, { memo } from 'react'
import styled from 'styled-components'

import { DefaultTooltip, Tooltip, TooltipContainer } from '@/common/components/Tooltip'
import { TextInlineExtraSmall } from '@/common/components/typography'
import { Colors, Transitions } from '@/common/constants'
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
            <TextInlineExtraSmall bold>+{remaining}</TextInlineExtraSmall>
          </HiddenMember>
        </Tooltip>
      )}
    </MemberStackStyles>
  )
})

const HiddenMember = styled(DefaultTooltip)`
  background-color: ${Colors.Blue[50]};
  border: 1px solid ${Colors.Black[200]};
`
const borderWidth = '2px'
const MemberStackStyles = styled.div`
  display: flex;

  ${TooltipContainer} {
    margin-right: calc(${spacing(-1)} - ${borderWidth});
    transition: ${Transitions.all};
    will-change: margin-right;
    &:hover,
    &:last-child {
      margin-right: 0;
    }
  }
  ${MemberPhoto}, ${HiddenMember} {
    box-sizing: content-box;
    height: 24px;
    width: 24px;
  }
  ${MemberPhoto} {
    cursor: pointer;
    border: ${borderWidth} solid ${Colors.White};
  }
`
