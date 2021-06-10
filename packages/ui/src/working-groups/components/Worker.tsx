import React from 'react'
import styled from 'styled-components'

import { ButtonGhost } from '@/common/components/buttons'
import { FileIcon } from '@/common/components/icons/FileIcon'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

interface WorkerProps {
  member: Member
  isLeader?: boolean
  past?: boolean
}

export const Worker = ({ member, isLeader, past }: WorkerProps) => (
  <WorkerWrap past={past}>
    <MemberInfo member={member} isLeader={isLeader} />
    <ButtonGhost square size="small">
      <FileIcon />
    </ButtonGhost>
  </WorkerWrap>
)

const WorkerWrap = styled.div<{ past?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 32px;
  grid-column-gap: 8px;
`
