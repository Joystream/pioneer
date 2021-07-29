import React from 'react'
import styled from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { Colors, Transitions } from '@/common/constants'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'
import { randomBlock } from '@/mocks/helpers/randomBlock'

export interface ListRowProps {
  member: Member
  past?: boolean
}

export const WorkersTableListRow = ({ member, past }: ListRowProps) => {
  return (
    <WorkerItem past={past}>
      <MemberInfo member={member} showId />
      <BlockTime block={randomBlock()} layout="reverse" />
      <BlockTime block={randomBlock()} layout="reverse" />
    </WorkerItem>
  )
}

const WorkerItem = styled.div<{ past?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 24px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 94px;
  padding: 16px;
  background-color: ${({ past }) => (past ? Colors.Black[50] : Colors.White)};
  transition: ${Transitions.all};
`
