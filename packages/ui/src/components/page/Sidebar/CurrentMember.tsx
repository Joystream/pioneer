import React, { useState } from 'react'
import styled from 'styled-components'
import { MemberFieldsFragment } from '../../../api/queries'
import { BorderRad, Colors } from '../../../constants'
import { useMembership } from '../../../hooks/useMembership'
import { AddMembershipButton } from '../../AddMembershipButton'
import { MemberInfo } from '../../MemberInfo'
import { Modal, ModalBody } from '../../Modal'

export const CurrentMember = () => {
  const { count, members, active } = useMembership()
  const [isOpen, setIsOpen] = useState(false)

  console.log('render', !!active && active.handle)

  if (count < 1) {
    return <AddMembershipButton />
  }

  return (
    <>
      <Memberships>
        Memberships <MembershipsBadge>{count}</MembershipsBadge>
      </Memberships>
      <SwitchMember>
        <MemberInfo member={active || members[0]} onClick={() => setIsOpen(true)} />
      </SwitchMember>
      {isOpen && <SwitchMemberModal onClose={() => setIsOpen(false)} />}
    </>
  )
}

interface Props {
  onClose: () => void
}

const SwitchMemberModal = ({ onClose }: Props) => {
  const { count, members, setActive } = useMembership()
  const switchMember = (member: MemberFieldsFragment) => {
    setActive(member)
    onClose()
  }

  return (
    <Modal modalSize={'s'} modalHeight={'s'} isDark>
      <ModalBody>
        <Memberships>
          My memberships: <MembershipsBadge>{count}</MembershipsBadge>
        </Memberships>
        {members.map((member) => (
          <div key={member.handle}>
            <MemberInfo member={member} onClick={() => switchMember(member)} />
          </div>
        ))}
      </ModalBody>
    </Modal>
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
