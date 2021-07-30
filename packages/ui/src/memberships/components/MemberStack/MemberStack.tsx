import React, { memo } from 'react'
import styled from 'styled-components'

import { DefaultTooltip, Tooltip, TooltipContainer } from '@/common/components/Tooltip'
import { TextInlineExtraSmall } from '@/common/components/typography'
import { Colors, Transitions } from '@/common/constants'
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
        <Tooltip forBig key={id} tooltipTitle={handle} tooltipText={`Worker ID: ${id}`}>
          <MemberAvatar avatarUri={avatar} />
        </Tooltip>
      ))}
      {hasExtra && (
        <Tooltip forBig tooltipText={`And ${remaining} more`}>
          <HiddenMember>
            <TextInlineExtraSmall bold black>
              +{remaining}
            </TextInlineExtraSmall>
          </HiddenMember>
        </Tooltip>
      )}
    </MemberStackStyles>
  )
})

const HiddenMember = styled(DefaultTooltip)`
  width: fit-content;
  min-width: 24px;
  height: 24px;
  border: 1px solid ${Colors.Black[200]};
  background-color: ${Colors.Blue[50]};
`

const MemberStackStyles = styled.div`
  display: flex;

  ${TooltipContainer} {
    position: relative;
    transition: ${Transitions.all};

    &:before {
      content: '';
      width: 0px;
      transition: ${Transitions.all};
    }
    &:not(:first-child) {
      margin-left: -8px;
    }
    &:hover + ${TooltipContainer}:before {
      width: 10px;
    }
  }
  ${MemberPhoto} {
    height: 24px;
    width: 24px;
    cursor: pointer;
    border: none;
    box-shadow: 0px 0px 0px 2px ${Colors.White};
  }
`
