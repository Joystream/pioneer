import React from 'react'
import styled from 'styled-components'
import { MemberFieldsFragment } from '../../../../api/queries'
import { Colors } from '../../../../constants'
import { useMembership } from '../../../../hooks/useMembership'
import { Row } from '../../../../modals/common'
import { MemberInfo } from '../../../MemberInfo'
import { Modal, ModalBody } from '../../../Modal'
import { Badge } from '../../../typography'

interface Props {
  onClose: () => void
}

export const SwitchMemberModal = ({ onClose }: Props) => {
  const { count, members, setActive } = useMembership()
  const switchMember = (member: MemberFieldsFragment) => {
    setActive(member)
    onClose()
  }

  return (
    <Modal modalSize="s" modalHeight="s" isDark>
      <ModalBody>
        <h3>
          My memberships: <Badge>{count}</Badge>
        </h3>
        <div>
          {members.map((member) => (
            <MemberRow key={member.handle} onClick={() => switchMember(member)}>
              <MemberInfo member={member} />
            </MemberRow>
          ))}
        </div>
      </ModalBody>
    </Modal>
  )
}
const MemberRow = styled(Row)`
  cursor: pointer;

  &:hover {
    background: ${Colors.Black[700]};
  }
`
