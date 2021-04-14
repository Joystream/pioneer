import React from 'react'

import { Label } from '../../common/components/typography'
import { Member } from '../../memberships/types'

export interface WorkersListProps {
  leader?: Member
}

export const WorkersList = ({ leader }: WorkersListProps) => {
  return (
    <>
      <Label>Leader</Label>
      <Label>Workers</Label>
    </>
  )
}
