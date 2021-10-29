import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { HeaderText, SortIconDown, SortIconUp } from '../SortedListHeaders'

import { ListHeader } from './ListHeader'

interface SortHeaderProps {
  onSort: () => void
  isActive: boolean
  isDescending: boolean
  children: ReactNode
}

export const SortHeader = ({ onSort, isActive, isDescending, children }: SortHeaderProps) => (
  <ClickableListHeader onClick={onSort}>
    <HeaderText>
      {children}
      {isActive && (isDescending ? <SortIconDown /> : <SortIconUp />)}
    </HeaderText>
  </ClickableListHeader>
)

const ClickableListHeader = styled(ListHeader)`
  cursor: pointer;
`
