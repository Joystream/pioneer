import React from 'react'
import styled from 'styled-components'
import { WorkingGroup, WorkingGroupProps } from './WorkingGroup'

interface WorkingGroupsListProps {
  groups: Array<WorkingGroupProps>
}

export const WorkingGroupsList = ({ groups }: WorkingGroupsListProps) => {
  return (
    <Groups>
      {groups.map(({ groupImage, groupTitle, groupContent, leaderAddress }) => (
        <WorkingGroup
          key={leaderAddress}
          leaderAddress={leaderAddress}
          groupImage={groupImage}
          groupTitle={groupTitle}
          groupContent={groupContent}
        />
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
