import React from 'react'
import styled from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { Colors, Transitions } from '@/common/constants'
import { MemberInfo } from '@/memberships/components'
import { PastWorker } from '@/working-groups/types'

export interface ListRowProps {
  worker: PastWorker
}

export const PastWorkersListRow = ({ worker: { member, dateStarted, dateFinished } }: ListRowProps) => {
  return (
    <WorkerItem>
      <MemberInfo member={member} showIdOrText />
      <BlockTime block={dateStarted} layout="reverse" />
      <BlockTime block={dateFinished} layout="reverse" />
    </WorkerItem>
  )
}

const WorkerItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 24px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 94px;
  padding: 16px;
  background-color: ${Colors.Black[50]};
  transition: ${Transitions.all};
`
