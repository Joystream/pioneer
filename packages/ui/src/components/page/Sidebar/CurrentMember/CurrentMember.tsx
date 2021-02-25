import React, { useState } from 'react'
import styled from 'styled-components'
import { BorderRad, Colors } from '../../../../constants'
import { useMembership } from '../../../../hooks/useMembership'
import { AddMembershipButton } from '../../../AddMembershipButton'
import { MemberInfo } from '../../../MemberInfo'
import { Badge } from '../../../typography'
import { SwitchMemberModal } from './SwitchMemberModal'

export const CurrentMember = () => {
  const { count, members, active } = useMembership()
  const [isOpen, setIsOpen] = useState(false)

  if (count < 1) {
    return <AddMembershipButton />
  }

  return (
    <>
      <Memberships>
        Memberships <MembershipsBadge>{count}</MembershipsBadge>
      </Memberships>
      <SwitchMember onClick={() => setIsOpen(true)}>
        <MemberInfo member={active || members[0]} />
      </SwitchMember>
      {isOpen && <SwitchMemberModal onClose={() => setIsOpen(false)} />}
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

const MembershipsBadge = styled(Badge)`
  position: absolute;
  right: -24px;
`

const SwitchMember = styled.div`
  background-color: ${Colors.Black[700]};
  padding: 10px 8px;
  border-radius: ${BorderRad.s};
  grid-area: memberaccount;
  cursor: pointer;

  &:hover {
    background: ${Colors.Black[600]};
  }
`
