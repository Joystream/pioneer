import React from 'react'
import styled from 'styled-components'

import { List, ListItem } from '@/common/components/List'

export interface DeadlineListProps {}

export const DeadlineList = ({}: DeadlineListProps) => {
  return (
    <div>
      <List>
        <StyledListItem>
          <p>test</p>
        </StyledListItem>
      </List>
    </div>
  )
}

export const StyledListItem = styled(ListItem)``
