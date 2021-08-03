import BN from 'bn.js'
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
  recipient: Member
  amount: BN
}

export function TransferInviteSuccessModal({ onClose, recipient, amount }: Props) {
  const plural = amount.gt(new BN(1))
  const name = recipient.name

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />
      <ModalBody>
        <TextMedium margin="s">
          You have just successfully transferred {amount.toString()} invitation{plural && 's'} to {name}.
        </TextMedium>
        <MemberRow>
          <MemberInfo member={recipient} />
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
