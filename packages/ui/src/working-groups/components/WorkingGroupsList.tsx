import React from 'react'
import styled from 'styled-components'

import { ListHeaders } from '@/common/components/List/ListHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Colors } from '@/common/constants'
import {
  WorkingGroupListItem,
  groupListColLayout,
  groupStatsColLayout,
} from '@/working-groups/components/WorkingGroupListItem'

import { WorkingGroup } from '../types'

interface WorkingGroupsListProps {
  groups: Array<WorkingGroup>
}

export const WorkingGroupsList = ({ groups }: WorkingGroupsListProps) => {
  return (
    <WorkingGroupListStyles gap={4}>
      <HeaderColumnWrapper>
        <ElementsWrapper>
          <HeaderColumnTitle>Workers</HeaderColumnTitle>
          <HeaderColumnTitle>Current Budget</HeaderColumnTitle>
          <HeaderColumnTitle>Openings</HeaderColumnTitle>
          <HeaderColumnTitle>WG Lead</HeaderColumnTitle>
        </ElementsWrapper>
      </HeaderColumnWrapper>
      <GroupList>
        {groups.map((group) => (
          <WorkingGroupListItem key={group.id} group={group} />
        ))}
      </GroupList>
    </WorkingGroupListStyles>
  )
}

const HeaderColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: ${groupListColLayout};
  grid-template-rows: 1fr;
  grid-column-gap: 24px;
`

const ElementsWrapper = styled.div`
  display: grid;
  grid-template-columns: ${groupStatsColLayout};
  justify-content: space-between;
  width: 100%;
  grid-column-gap: 8px;
  grid-column: 3;
`

const HeaderColumnTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  padding-right: 40px;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  text-align: left;
`

const GroupList = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 108px;
  grid-row-gap: 8px;
  min-width: 1123px;
`
const WorkingGroupListStyles = styled(RowGapBlock)`
  overflow: auto;
  width: calc(100vw - 276px);
  max-width: 1150px;
  @media (max-width: 1023px) {
    width: calc(100vw - 48px);
  }
  @media (max-width: 1023px) {
    width: calc(100vw - 32px);
  }

  ${ListHeaders} {
    padding: 0 24px;
  }

  * {
    word-break: normal;
  }
`
