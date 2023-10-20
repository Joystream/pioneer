import React from 'react'
import styled from 'styled-components'

import { ListHeaders } from '@/common/components/List/ListHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Colors } from '@/common/constants'
import { WorkingGroupListItem } from '@/working-groups/components/WorkingGroupListItem'

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
          <HeaderColumnTitle />
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
  display: flex;
  justify-content: flex-end;
`

const ElementsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
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
  width: 100%;
`
const WorkingGroupListStyles = styled(RowGapBlock)`
  ${ListHeaders} {
    padding: 0 24px;
  }
`
