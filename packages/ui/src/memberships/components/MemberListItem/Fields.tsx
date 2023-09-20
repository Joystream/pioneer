import React from 'react'
import styled from 'styled-components'

import { TableListItemAsLinkHover } from '@/common/components/List'
import { BorderRad, Fonts, Sizes, Transitions, Colors } from '@/common/constants'

type MemberItemKind = 'Member' | 'MyMember' | 'MemberWithExternal'
export const colLayoutByType = (kind: MemberItemKind) => {
  const name = 190
  const roles = kind !== 'MyMember' ? 136 : 164
  const created = 90
  const referrer = 50
  const count = kind !== 'MyMember' ? 20 : 76
  const total = 120

  switch (kind) {
    case 'MemberWithExternal':
    case 'Member':
      return `${name}px ${roles}px ${created}px ${count}px ${referrer}px ${count}px ${total}px ${total}px`
    case 'MyMember':
      return `${name}px ${roles}px ${count}px ${count}px 96px 80px 46px`
  }
}

export const Info = styled.span`
  font-family: ${Fonts.Grotesk};
  font-weight: 700;
  z-index: 1;
`
export const CountInfo = ({ count, times }: { count?: number; times?: boolean }) => (
  <Info>
    {count ?? '-'}
    {times && ' times'}
  </Info>
)

export const MemberModalTrigger = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

export const MemberItemWrap = styled.div<{ kind: MemberItemKind }>`
  display: grid;
  position: relative;
  grid-template-columns: ${({ kind }) => colLayoutByType(kind)};
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: start;
  align-items: center;
  width: 100%;
  min-height: ${Sizes.accountHeight};
  padding: 16px 0 16px 14px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  transition: ${Transitions.all};

  ${({ kind }) => kind === 'MemberWithExternal' && 'border-bottom: none;'};
  ${TableListItemAsLinkHover}
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
