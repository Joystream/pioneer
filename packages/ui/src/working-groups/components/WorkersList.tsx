import React from 'react'

import { Label } from '../../common/components/typography'
import { MemberInfo } from '../../memberships/components'
import { Member } from '../../memberships/types'

export interface WorkersListProps {
  leader?: Member
}

export const WorkersList = ({ leader }: WorkersListProps) => {
  return (
    <>
      <Label>Leader</Label>
      {leader && <MemberInfo member={leader} />}
      <Label>Workers</Label>
    </>
  )
}
