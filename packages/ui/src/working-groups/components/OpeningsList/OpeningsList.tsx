import React from 'react'
import styled from 'styled-components'

import { List, ListItem } from '@/common/components/List'
import { UpcomingWorkingGroupOpening, WorkingGroupOpening } from '@/working-groups/types'

import { OpeningsListRow } from './OpeningsListRow'

export interface OpeningsListProps {
  openings: WorkingGroupOpening[] | UpcomingWorkingGroupOpening[]
  past?: boolean
}

export const OpeningsList = ({ openings, past }: OpeningsListProps) => {
  return (
    <ListWrapper>
      {openings.map((opening: any) => (
        <ListItem key={opening.id}>
          <OpeningsListRow opening={opening} past={past} />
        </ListItem>
      ))}
    </ListWrapper>
  )
}

const ListWrapper = styled(List)`
  overflow: auto;

  > li {
    min-width: 750px;
  }
`
