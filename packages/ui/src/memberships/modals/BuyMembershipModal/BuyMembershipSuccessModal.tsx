import React from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { SuccessIcon } from '@/common/components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { MemberRow } from '@/memberships/modals/components'

import { MemberInfo } from '../../components'
import { Member } from '../../types'

import { MemberFormFields } from './BuyMembershipFormModal'

interface Props {
  onClose: () => void
  member: MemberFormFields
  memberId?: string
}

export const BuyMembershipSuccessModal = ({ onClose, member, memberId }: Props) => {
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
        <ButtonGhost size="medium" disabled={!memberId} onClick={onClose}>
          Done
        </ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
