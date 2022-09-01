import BN from 'bn.js'
import React from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { SuccessSymbol } from '@/common/components/icons/symbols'
import { Info } from '@/common/components/Info'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium, TokenValue } from '@/common/components/typography'

interface SuccessModalProps {
  onClose: () => void
  amount: BN
}

export const SuccessModal = ({ onClose, amount }: SuccessModalProps) => {
  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessSymbol />} />
      <ModalBody>
        <Info>
          <TextMedium light>
            You have just successfully increased you stake by <TokenValue value={amount} />.
          </TextMedium>
        </Info>
      </ModalBody>
      <ModalFooter>
        <ButtonGhost onClick={onClose} size="medium">
          Go to My Role
        </ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
