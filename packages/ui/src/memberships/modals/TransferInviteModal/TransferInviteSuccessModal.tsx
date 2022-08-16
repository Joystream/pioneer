import BN from 'bn.js'
import React, { useCallback } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { SuccessIcon } from '@/common/components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { MemberModalCall } from '@/memberships/components/MemberProfile'
import { MemberRow } from '@/memberships/modals/components'

import { MemberInfo } from '../../components'
import { Member } from '../../types'

interface Props {
  onClose: () => void
  recipient: Member
  amount: BN
  memberId: string
}

export function TransferInviteSuccessModal({ onClose, recipient, amount, memberId }: Props) {
  const plural = amount.gt(new BN(1))
  const name = recipient.name
  const { showModal } = useModal()
  const viewMember = useCallback(() => {
    onClose()

    if (memberId) {
      showModal<MemberModalCall>({ modal: 'Member', data: { id: memberId } })
    }
  }, [!showModal, memberId])

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />
      <ModalBody>
        <TextMedium margin="s">
          You have just successfully transferred {amount.toString()} invitation{plural && 's'} to {name}.
        </TextMedium>
        <MemberRow>
          <MemberInfo member={recipient} skipModal />
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
