import React, { useCallback } from 'react'

import { MemberInfo } from '..'
import { TokenValue } from '../../../common/components/typography/TokenValue'
import { useModal } from '../../../common/hooks/useModal'
import { OtherMember } from '../../types'
import { MemberModalCall } from '../MemberProfile'
import { MemberRoles } from '../MemberRoles'

import { CountInfo, Info, MemberColumn, MemberItemWrap, MemberRolesColumn } from './Fileds'

interface Props {
  member: OtherMember
}

export const MemberListItem = ({ member }: Props) => {
  const { showModal } = useModal()

  const showMemberModal = useCallback(() => {
    showModal<MemberModalCall>({ modal: 'Member', data: { id: member.id } })
  }, [member.id])

  return (
    <MemberItemWrap member={member}>
      <MemberColumn>
        <Info>#{member.id}</Info>
      </MemberColumn>

      <MemberColumn>
        <MemberInfo member={member} onClick={showMemberModal} showGroup={false} />
      </MemberColumn>

      <MemberColumn>
        <Info>{member.isConcilMember ? 'YES' : 'NO'}</Info>
      </MemberColumn>

      <MemberRolesColumn>
        <MemberRoles wrapable member={member} size="l" />
      </MemberRolesColumn>
      <MemberColumn>
        <CountInfo count={0} />
      </MemberColumn>
      <MemberColumn>
        <CountInfo count={0} />
      </MemberColumn>

      <MemberColumn>
        <TokenValue value={member.totalBalance ?? 0} />
      </MemberColumn>
      <MemberColumn>
        <TokenValue value={member.totalStacked ?? 0} />
      </MemberColumn>
    </MemberItemWrap>
  )
}
