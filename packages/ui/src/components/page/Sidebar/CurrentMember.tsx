import React, { useState } from 'react'
import styled from 'styled-components'
import { MemberFieldsFragment } from '../../../api/queries'
import { BorderRad, Colors } from '../../../constants'
import { useMembership } from '../../../hooks/useMembership'
import { Row } from '../../../modals/common'
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
        <h3>
          My memberships: <Badge>{count}</Badge>
        </h3>
        <div>
          {members.map((member) => (
            <Row key={member.handle} onClick={() => switchMember(member)}>
              <MemberInfo member={member} />
            </Row>
          ))}
        </div>
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

const Badge = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: ${BorderRad.round};
  background-color: ${Colors.Black[500]};
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.White};
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
`
