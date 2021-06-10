import React from 'react'
import styled from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { Colors, Transitions } from '@/common/constants'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

export interface ListRowProps {
  member: Member
  past?: boolean
}

export const WorkersTableListRow = ({ member, past }: ListRowProps) => {
  return (
    <WorkerItem past={past}>
      <MemberInfo member={member} showId />
      <BlockTime
        block={{
          id: '100',
          number: 1000,
          network: 'OLYMPIA',
          timestamp: '2012-01-26T13:51:50.417-07:00',
        }}
        layout="reverse"
      />
      <BlockTime
        block={{
          id: '100',
          number: 1000,
          network: 'OLYMPIA',
          timestamp: '2012-01-26T13:51:50.417-07:00',
        }}
        layout="reverse"
      />
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
