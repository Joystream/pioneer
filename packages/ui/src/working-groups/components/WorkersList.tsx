import React from 'react'

import { Label } from '../../common/components/typography'
import { MemberInfo } from '../../memberships/components'
import { Member } from '../../memberships/types'

export interface WorkersListProps {
  leader?: Member
  workers?: Member[]
}

export const WorkersList = ({ leader, workers }: WorkersListProps) => {
  return (
    <>
      <Label>Leader</Label>
      {leader && <MemberInfo member={leader} />}
      <Label>Workers</Label>
      {workers && workers.map((w) => <MemberInfo key={w.handle} member={w} />)}
    </>
  )
}
