import React, { useMemo } from 'react'
import styled from 'styled-components'

import { Arrow } from '@/common/components/icons'
import { TableListItem } from '@/common/components/List'
import { GhostRouterLink, RouterLink } from '@/common/components/RouterLink'
import { Tooltip } from '@/common/components/Tooltip'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Fonts, Overflow, Transitions } from '@/common/constants'
import { nameMapping, wgListItemMappings } from '@/common/helpers'
import { MemberHandle, MemberInfo } from '@/memberships/components'
import { AvatarPlaceholderImage } from '@/memberships/components/Avatar'
import { useMember } from '@/memberships/hooks/useMembership'
import { useCountOpenings } from '@/working-groups/hooks/useCountOpenings'
import { useCountWorkers } from '@/working-groups/hooks/useCountWorkers'

import { groupNameToURLParam } from '../model/workingGroupName'
import { WorkingGroup } from '../types'

import { WorkingGroupImage, WorkingGroupImageTag } from './WorkingGroupImage'

export interface WorkingGroupProps {
  group: WorkingGroup
}

export function WorkingGroupListItem({ group }: WorkingGroupProps) {
  const { isLoading: loadingOpenings, openings } = useCountOpenings(group.id)
  const { isLoading: loadingWorkers, workers } = useCountWorkers(group.id)

  const { member: lead } = useMember(group.leadId)

  const groupAddress = `/working-groups/${groupNameToURLParam(nameMapping(group.name))}`
  const isLeadActive = lead && group.isActive
  const { subtitle, tooltipLink, groupName } = useMemo(
    () => ({ ...wgListItemMappings(group.name), groupName: nameMapping(group.name) }),
    [group.name]
  )

  return (
    <GroupItem>
      <GroupImageContainer as={GhostRouterLink} to={groupAddress}>
        <WorkingGroupImage groupName={group.name} />
      </GroupImageContainer>
      <GroupContentBlock>
        <Tooltip
          tooltipTitle={groupName}
          tooltipText=""
          tooltipLinkURL={tooltipLink}
          tooltipLinkText="Learn more about this group"
        >
          <GroupTitle as={GhostRouterLink} to={groupAddress}>
            {groupName}
          </GroupTitle>
        </Tooltip>
        <GroupContent as={GhostRouterLink} to={groupAddress}>
          {subtitle}
        </GroupContent>
      </GroupContentBlock>
      <GroupStats>
        <StatsColumn>
          <StatsValue>{loadingWorkers ? '-' : workers}</StatsValue>
        </StatsColumn>
        <StatsColumn>
          <StatsValue>
            <TokenValue value={group?.budget ?? null} />
          </StatsValue>
        </StatsColumn>
        <StatsColumn>
          <StatsValue>{loadingOpenings ? '-' : openings}</StatsValue>
        </StatsColumn>
        <StatsColumn>
          <StatsValue>
            {isLeadActive ? (
              <MemberInfo member={lead} memberSize="m" />
            ) : (
              <PlaceholderWrapper>
                <AvatarPlaceholder />
                <MemberHandle>No Lead</MemberHandle>
              </PlaceholderWrapper>
            )}
          </StatsValue>
        </StatsColumn>
      </GroupStats>
      <StyledRouterLink to={groupAddress}>
        <Arrow direction="right" className="WorkingGroupArrow" />
      </StyledRouterLink>
    </GroupItem>
  )
}

const GroupImageContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-right: 1px solid ${Colors.Black[100]};
  overflow: hidden;
  cursor: pointer;
  transition: ${Transitions.all};
`
const StyledRouterLink = styled(RouterLink)`
  color: ${Colors.Black[600]};
`
const GroupContentBlock = styled.article`
  display: grid;
  grid-template-rows: 24px 40px;
  grid-row-gap: 8px;
  width: 100%;
`

const GroupTitle = styled.h5`
  text-transform: capitalize;
  ${Overflow.FullDots};
  transition: ${Transitions.all};
  cursor: pointer;

  &:active {
    color: ${Colors.Blue[600]};
  }
`

const GroupContent = styled(TextMedium)`
  height: fit-content;
  max-height: 100%;
  max-width: 100%;
  color: ${Colors.Black[500]};
  ${Overflow.DotsTwoLine};
`

const GroupStats = styled.div`
  display: grid;
  grid-template-columns: 64px 116px 30px 140px;
  justify-content: space-between;
  width: 100%;
  grid-column-gap: 8px;
`

const StatsColumn = styled.div`
  display: grid;
  grid-row-gap: 10px;
`

const StatsValue = styled.span`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  align-items: center;
  width: fit-content;
  font-family: ${Fonts.Grotesk};
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: ${Colors.Black[900]};
`

const GroupItem = styled(TableListItem)`
  display: grid;
  grid-template-columns: 108px 1fr 1fr 40px;
  grid-template-rows: 1fr;
  grid-column-gap: 24px;
  width: 100%;
  height: 100%;
  max-height: 108px;
  align-items: center;
  padding: 0 16px 0 0;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
  overflow: hidden;
  transition: ${Transitions.all};

  .WorkingGroupArrow {
    transition: ${Transitions.all};
  }

  &:hover,
  &:focus-within {
    border-color: ${Colors.Blue[100]};

    ${GroupImageContainer} {
      border-color: ${Colors.Blue[100]};

      ${WorkingGroupImageTag} {
        transform: scale(1);
      }
    }

    ${GroupTitle},
    .WorkingGroupArrow {
      color: ${Colors.Blue[500]};
    }
  }
`
const PlaceholderWrapper = styled.div`
  display: flex;
  align-items: center;
`
const AvatarPlaceholder = styled(AvatarPlaceholderImage)`
  border-radius: 50%;
  max-width: 40px;
  max-height: 40px;
  margin-right: 5px;
`
