import React from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { SuccessIcon } from '@/common/components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { MemberRow } from '@/memberships/modals/components'

import { MemberInfo } from '../../components'
import { MemberModalCall } from '../../components/MemberProfile'
import { Member } from '../../types'

import { MemberFormFields } from './BuyMembershipFormModal'

interface Props {
  onClose: () => void
  member: MemberFormFields
  memberId?: string
}

export const BuyMembershipSuccessModal = ({ onClose, member, memberId }: Props) => {
  const { showModal } = useModal()
  const viewMember = () => {
    onClose()

    if (memberId) {
      showModal<MemberModalCall>({ modal: 'Member', data: { id: memberId } })
    }
  }

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />
      <ModalBody>
        <TextMedium>You have just successfully created a new membership</TextMedium>
        <MemberRow>
          <MemberInfo member={member as unknown as Member} skipModal />
        </MemberRow>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" disabled={!memberId} onClick={viewMember}>
          View my profile
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
