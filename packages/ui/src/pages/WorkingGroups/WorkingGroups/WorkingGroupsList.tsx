import React from 'react'
import styled from 'styled-components'

import { WorkingGroup } from '../../../common/types'
import { WorkingGroupListItem } from './WorkingGroupListItem'

interface WorkingGroupsListProps {
  groups: Array<WorkingGroup>
}

export const WorkingGroupsList = ({ groups }: WorkingGroupsListProps) => {
  return (
    <Groups>
      {groups.map((group) => (
        <WorkingGroupListItem key={group.name} group={group} />
      ))}
    </Groups>
  )
}

const Groups = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 108px;
  grid-row-gap: 8px;
  width: 100%;
`
