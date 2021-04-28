import React from 'react'
import styled from 'styled-components'

import { Fonts, Sizes } from '../../../common/constants'
import { Membership, OtherMember } from '../../types'

export const colLayoutByType = (kind: (Membership | OtherMember)['kind']) => {
  const id = 70
  const name = 194
  const concil = 80
  const roles = 200
  const count = kind === 'Member' ? 20 : 76
  const total = 100

  return kind === 'Member'
    ? `${id}px ${name}px ${concil}px ${roles}px ${count}px ${count}px ${total}px ${total}px`
    : `${name}px ${roles}px ${count}px ${count}px 96px 76px 54px`
}

export const Info = styled.span`
  font-family: ${Fonts.Grotesk};
  font-weight: 700;
`
export const CountInfo = ({ count, times }: { count: number; times?: boolean }) => (
  <Info>
    {count}
    {times && ' times'}
  </Info>
)

export const MemberItemWrap = styled.div`
  display: grid;
  grid-template-columns: ${({ member }: { member: Membership | OtherMember }) => colLayoutByType(member.kind)};
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: start;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px 0 16px 14px;
`

export const MemberColumn = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  align-items: center;
  width: fit-content;
  max-width: 100%;
`

export const MemberRolesColumn = styled(MemberColumn)`
  width: 100%;
  max-width: 164px;
  max-height: 52px;
`

export const MemberControls = styled.div``
