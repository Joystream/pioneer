import React from 'react'
import styled from 'styled-components'

import { Arrow } from '@/common/components/icons'
import { TableListItem } from '@/common/components/List'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TextMedium, ValueInJoys } from '@/common/components/typography'
import { Subscription } from '@/common/components/typography/Subscription'
import { BorderRad, Colors, Fonts, Overflow, Transitions } from '@/common/constants'
import { MemberInfoAvatar } from '@/memberships/components/Avatar'
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
  const groupAddress = `/working-groups/${groupNameToURLParam(group.name)}`

  return (
    <GroupItem as={GhostRouterLink} to={groupAddress}>
      <GroupImageContainer>
        <WorkingGroupImage groupName={group.name} />
      </GroupImageContainer>
      <GroupContentBlock>
        <GroupTitle>{group.name}</GroupTitle>
        {group.about && <GroupContent>{group.about}</GroupContent>}
      </GroupContentBlock>
      <GroupStats>
        <StatsColumn>
          <StatsValue>{loadingWorkers ? '-' : workers}</StatsValue>
          <Subscription>Workers</Subscription>
        </StatsColumn>
        <StatsColumn>
          <StatsValue>
            <ValueInJoys>{group?.budget?.toString()}</ValueInJoys>
          </StatsValue>
          <Subscription>Current budget</Subscription>
        </StatsColumn>
        <StatsColumn>
          <StatsValue>{loadingOpenings ? '-' : openings}</StatsValue>
          <Subscription>Openings</Subscription>
        </StatsColumn>
        <StatsColumn>
          <StatsValue>
            {lead ? <MemberInfoAvatar avatarUri={lead.avatar} small noArea member={lead} /> : 'None'}
          </StatsValue>
          <Subscription>WG Lead</Subscription>
        </StatsColumn>
      </GroupStats>
      <Arrow direction="right" className="WorkingGroupArrow" />
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
  hyphens: auto;
  height: fit-content;
  max-height: 100%;
  max-width: 100%;
  color: ${Colors.Black[500]};
  ${Overflow.DotsTwoLine};
`

const GroupStats = styled.div`
  display: grid;
  grid-template-columns: 64px 116px 64px 64px;
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
