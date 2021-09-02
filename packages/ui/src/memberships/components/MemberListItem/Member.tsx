import React, { useCallback } from 'react'

import { CheckboxIcon, CrossIcon } from '@/common/components/icons'
import { TokenValue } from '@/common/components/typography/TokenValue'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useObservable } from '@/common/hooks/useObservable'

import { MemberInfo } from '..'
import { Member } from '../../types'
import { MemberModalCall } from '../MemberProfile'
import { MemberRoles } from '../MemberRoles'

import { CountInfo, Info, MemberColumn, MemberItemWrap, MemberModalTrigger, MemberRolesColumn } from './Fileds'

export const MemberListItem = ({ member }: { member: Member }) => {
  const { api, connectionState } = useApi()
  const council = useObservable(api?.query.council.councilMembers(), [connectionState])
  const councilMembersIds = council?.map(({ membership_id }) => membership_id.toNumber()) ?? []
  const isCouncil = (id: number) => councilMembersIds.includes(id)
  const { showModal } = useModal()
  const showMemberModal = useCallback(
    (event?: React.MouseEvent<HTMLElement>) => {
      event?.stopPropagation()
      member && showModal<MemberModalCall>({ modal: 'Member', data: { id: member.id } })
    },
    [member?.id]
  )

  return (
    <MemberItemWrap kind="Member">
      <MemberModalTrigger onClick={showMemberModal} />
      <MemberColumn>
        <Info>#{member.id}</Info>
      </MemberColumn>

      <MemberColumn>
        <MemberInfo member={member} showGroup={false} />
      </MemberColumn>

      <MemberColumn>
        <Info>{isCouncil(parseInt(member.id)) ? <CheckboxIcon /> : <CrossIcon />}</Info>
      </MemberColumn>

      <MemberRolesColumn>
        <MemberRoles wrapable roles={member.roles} size="l" />
      </MemberRolesColumn>
      <MemberColumn>
        <CountInfo count={0} />
      </MemberColumn>
      <MemberColumn>
        <CountInfo count={0} />
      </MemberColumn>

      <MemberColumn>
        <TokenValue value={0} />
      </MemberColumn>
      <MemberColumn>
        <TokenValue value={0} />
      </MemberColumn>
    </MemberItemWrap>
  )
}
