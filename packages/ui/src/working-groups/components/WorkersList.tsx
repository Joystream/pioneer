import React from 'react'
import styled from 'styled-components'

import { BadgeViolet } from '../../common/components/BadgeViolet'
import { ButtonGhost } from '../../common/components/buttons'
import { CopyIcon } from '../../common/components/icons'
import { Label } from '../../common/components/typography'
import { MemberInfo } from '../../memberships/components'
import { Member } from '../../memberships/types'

export interface WorkersListProps {
  leader?: Member
  workers?: Member[]
}

interface WorkerProps {
  member: Member
}

const Worker = ({ member }: WorkerProps) => (
  <WorkerWrap>
    <MemberInfo member={member} />
    <ButtonGhost square size="small">
      <CopyIcon />
    </ButtonGhost>
  </WorkerWrap>
)

export const WorkersList = ({ leader, workers }: WorkersListProps) => {
  return (
    <div>
      <Label>Leader</Label>
      {leader && <Worker member={leader} />}

      <Label>Workers {workers?.length && <BadgeViolet>{workers?.length}</BadgeViolet>}</Label>
      {workers && workers.map((member) => <Worker key={member.handle} member={member} />)}
    </div>
  )
}

const WorkerWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 20px;
  grid-column-gap: 4px;
  padding: 4px;
`
