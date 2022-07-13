import React from 'react'

import { MemberWithReferrer } from '../types'

import { MemberCreatedDate, MemeberCreated, MemberCreatedBlock } from './components'

export interface MemberCreatedProps {
  member: MemberWithReferrer
}

export const MemberCreated = React.memo(({ member }: MemberCreatedProps) => {
  return (
    <MemeberCreated>
      <MemberCreatedDate>{new Date(member.createdAt).toLocaleDateString('en-GB')}</MemberCreatedDate>
      {member.entry && member.entry.type !== 'genesis' && (
        <MemberCreatedBlock>{member.entry.block.number} block</MemberCreatedBlock>
      )}
    </MemeberCreated>
  )
})
