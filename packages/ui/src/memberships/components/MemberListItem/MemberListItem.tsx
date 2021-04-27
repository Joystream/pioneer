import React, { FC, useCallback } from 'react'
import styled from 'styled-components'

import { MemberInfo } from '..'
import { EditSymbol } from '../../../common/components/icons/symbols'
import { TokenValue } from '../../../common/components/typography/TokenValue'
import { Fonts, Sizes } from '../../../common/constants'
import { useModal } from '../../../common/hooks/useModal'
import { Member } from '../../types'
import { EditMembershipButton } from '../EditMembershipButton'
import { colLayoutByType } from '../MemberList/MemberList'
import { MemberModalCall } from '../MemberProfile'
import { MemberRoles } from '../MemberRoles'
import { TransferInviteButton } from '../TransferInviteButton'

interface Props {
  member: Member
}

export const MemberListItem = ({ member }: Props) => {
  const { showModal } = useModal()

  const showMemberModal = useCallback(() => {
    showModal<MemberModalCall>({ modal: 'Member', data: { id: member.id } })
  }, [member.id])

  return (
    <MemberItemWrap member={member}>
      {member.type === 'Members' && (
        <MemberColumn>
          <Info>#{member.id}</Info>
        </MemberColumn>
      )}

      <MemberColumn>
        <MemberInfo member={member} onClick={showMemberModal} showId={member.type === 'Membership'} />
      </MemberColumn>

      {member.type === 'Members' && (
        <MemberColumn>
          <Info>{member.isConcilMember ? 'YES' : 'NO'}</Info>
        </MemberColumn>
      )}

      <MemberRolesColumn>
        <MemberRoles wrapable member={member} size="l" />
      </MemberRolesColumn>
      <MemberColumn>
        <CountInfo count={0} times={member.type !== 'Members'} />
      </MemberColumn>
      <MemberColumn>
        <CountInfo count={0} times={member.type !== 'Members'} />
      </MemberColumn>

      {member.type !== 'Members' && (
        <>
          <MemberColumn>
            <CountInfo count={member.inviteCount} />
            <TransferInviteButton member={member} />
          </MemberColumn>
          <MemberColumn>
            <CountInfo count={0} />
          </MemberColumn>
          <MemberControls>
            <EditMembershipButton member={member} size="small">
              <EditSymbol />
            </EditMembershipButton>
          </MemberControls>
        </>
      )}
      {member.type === 'Members' && (
        <>
          <MemberColumn>
            <TokenValue value={member.totalBalanced} />
          </MemberColumn>
          <MemberColumn>
            <TokenValue value={member.totalStacked} />
          </MemberColumn>
        </>
      )}
    </MemberItemWrap>
  )
}

const Info = styled.span`
  font-family: ${Fonts.Grotesk};
  font-weight: 700;
`
const CountInfo: FC<{ count: number; times?: boolean }> = ({ count, times }) => (
  <Info>
    {count}
    {times && ' times'}
  </Info>
)

const MemberItemWrap = styled.div`
  display: grid;
  grid-template-columns: ${({ member }: Props) => colLayoutByType(member.type)};
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: start;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px 0 16px 14px;
`

const MemberColumn = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  align-items: center;
  width: fit-content;
  max-width: 100%;
`

const MemberRolesColumn = styled(MemberColumn)`
  width: 100%;
  max-width: 164px;
  max-height: 52px;
`

const MemberControls = styled.div``
