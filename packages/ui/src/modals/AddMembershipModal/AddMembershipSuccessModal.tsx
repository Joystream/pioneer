import React from 'react'
import { SuccessIcon } from '../../components/icons'
import { MemberInfo } from '../../components/MemberInfo'
import { ModalHeader, Modal, SuccessModalBody } from '../../components/Modal'
import { Text } from '../../components/typography'
import { Member } from './MembershipFormModal'

interface Props {
  onClose: () => void
  member: Member
}

export function AddMembershipSuccessModal({ onClose, member }: Props) {
  return (
    <Modal modalSize="m" modalHeight="s">
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />
      <SuccessModalBody>
        <Text>You have just successfully create a new membership</Text>
        <MemberInfo member={member} />
      </SuccessModalBody>
    </Modal>
  )
}
