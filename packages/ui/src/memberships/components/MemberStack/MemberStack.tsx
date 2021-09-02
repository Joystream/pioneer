import React, { memo } from 'react'
import styled from 'styled-components'

import { DefaultTooltip, Tooltip, TooltipContainer, TooltipText, TooltipPopupTitle } from '@/common/components/Tooltip'
import { TextInlineExtraSmall } from '@/common/components/typography'
import { Colors, Transitions } from '@/common/constants'
import { ForumModerator } from '@/forum/types'
import { MemberPhoto } from '@/memberships/components'
import { MemberAvatar } from '@/memberships/components/Avatar'

import { MemberInfoList, MemberInfoItem } from '../MemberInfo'

export interface MemberSummary {
  handle?: string
  description?: string
  avatar?: string
}

export const moderatorsSummary = (moderators: ForumModerator[]): MemberSummary[] =>
  moderators.map(({ id, handle, avatar }) => ({
    handle,
    avatar,
    description: `Worker ID: ${id}`,
  }))

interface MemberStackProps {
  members: MemberSummary[]
  max?: number
}
export const MemberStack = memo(({ members, max = 0 }: MemberStackProps) => {
  const remaining = members.length > max && max > 0 ? members.length - (max - 1) : 0
  const remainingList = remaining ? members.slice(members.length - max) : members
  const toDisplay = remaining ? members.slice(0, -remaining) : members
  return (
    <MemberStackStyles>
      {toDisplay.map(({ handle, description, avatar }, index) => (
        <Tooltip forBig key={index} tooltipTitle={handle} tooltipText={description}>
          <MemberAvatar avatarUri={avatar} />
        </Tooltip>
      ))}
      {remaining > 0 && (
        <Tooltip
          forBig
          tooltipText={`And ${remaining} more`}
          popupContent={
            <MemberInfoList>
              {remainingList.map(({ handle, description }, index) => (
                <MemberInfoItem key={index}>
                  <TooltipPopupTitle>{handle}</TooltipPopupTitle>
                  <TooltipText>{description}</TooltipText>
                </MemberInfoItem>
              ))}
            </MemberInfoList>
          }
        >
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

export const MemberStackStyles = styled.div`
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
