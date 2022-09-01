import React from 'react'
import styled from 'styled-components'

import { Colors, Fonts } from '@/common/constants'
import { MemberWithDetails } from '@/memberships/types'

export interface MemberCreatedProps {
  member: MemberWithDetails
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

export const MemeberCreated = styled.div`
  display: grid;
  font-family: ${Fonts.Grotesk};
  line-height: 20px;
`
export const MemberCreatedDate = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: ${Colors.Black[900]};
`
export const MemberCreatedBlock = styled.div`
  font-size: 12px;
  color: ${Colors.Black[400]};
  font-weight: 400;
`
