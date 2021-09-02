import React from 'react'
import styled from 'styled-components'

import { WorkingGroup } from '../types'

import { WorkingGroupListItem } from './WorkingGroupListItem'

interface WorkingGroupsListProps {
  groups: Array<WorkingGroup>
}

export const WorkingGroupsList = ({ groups }: WorkingGroupsListProps) => {
  return (
    <Groups>
      {groups.map((group) => (
        <WorkingGroupListItem key={group.id} group={group} />
      ))}
    </Groups>
  )
}

const Groups = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 108px;
  grid-row-gap: 8px;
  width: 100%;
`
