import React from 'react'
import styled from 'styled-components'
import { BorderRad, Colors } from '../../../constants'
import { useMembership } from '../../../hooks/useMembership'
import { AddMembershipButton } from '../../AddMembershipButton'
import { MemberInfo } from '../../MemberInfo'

export const CurrentMember = () => {
  const { count, members } = useMembership()

  if (count < 1) {
    return <AddMembershipButton />
  }

  return (
    <>
      <Memberships>
        Memberships <MembershipsBadge>{count}</MembershipsBadge>
      </Memberships>
      <SwitchMember>
        <MemberInfo member={members[0]} />
      </SwitchMember>
    </>
  )
}

const Memberships = styled.span`
  display: inline-flex;
  position: relative;
  align-items: center;
  grid-area: memberships;
  margin-left: 8px;
  width: fit-content;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
`

const MembershipsBadge = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -24px;
  width: 16px;
  height: 16px;
  border-radius: ${BorderRad.round};
  background-color: ${Colors.Black[500]};
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.White};
`

const SwitchMember = styled.div`
  background-color: ${Colors.Black[700]};
  padding: 10px 8px;
  border-radius: ${BorderRad.s};
  grid-area: memberaccount;
`
