import React from 'react'
import styled from 'styled-components'

import { Colors, Fonts } from '@/common/constants'
import { MemberWithDetails } from '@/memberships/types'

export interface MemberCreatedProps {
  member: MemberWithDetails
}

export const MemberCreated = React.memo(({ member }: MemberCreatedProps) => {
  const { entry, createdAt } = member
  const block = entry.type === 'genesis' ? { number: 0, timestamp: createdAt } : entry.block

  return (
    <MemeberCreated>
      <MemberCreatedDate>{new Date(block.timestamp).toLocaleDateString('en-GB')}</MemberCreatedDate>
      <MemberCreatedBlock>{block.number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} block</MemberCreatedBlock>
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
