import React from 'react'
import styled from 'styled-components'

import { ButtonBareGhost, ButtonGhost } from '@/common/components/buttons'
import { FileIcon } from '@/common/components/icons/FileIcon'
import { Colors, Transitions } from '@/common/constants'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

interface WorkerProps {
  member: Member
  isLeader?: boolean
  past?: boolean
}

export const Worker = ({ member, isLeader, past }: WorkerProps) => (
  <WorkerWrap past={past}>
    <MemberInfo member={member} isLeader={isLeader} showId />
    <ButtonBareGhost square size="small">
      <FileIcon />
    </ButtonBareGhost>
  </WorkerWrap>
)

const WorkerWrap = styled.div<{ past?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 40px;
  grid-column-gap: 24px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 94px;
  padding: 16px;
  background-color: ${({ past }) => (past ? Colors.Black[50] : Colors.White)};
  transition: ${Transitions.all};
`
