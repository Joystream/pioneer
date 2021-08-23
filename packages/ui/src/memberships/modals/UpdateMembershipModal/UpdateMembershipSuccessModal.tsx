import React from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { SuccessIcon } from '@/common/components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { MemberRow } from '@/memberships/modals/components'

import { MemberInfo } from '../../components'
import { Member } from '../../types'

interface Props {
  onClose: () => void
  member: Member
}

export function UpdateMembershipSuccessModal({ onClose, member }: Props) {
  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />
      <ModalBody>
        <TextMedium>You have just successfully updated your membership</TextMedium>
        <MemberRow>
          <MemberInfo member={(member as unknown) as Member} skipModal />
        </MemberRow>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" disabled>
          View my profile
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
