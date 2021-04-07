import BN from 'bn.js'
import React from 'react'

import { FailureIcon } from '../../../common/components/icons/FailureIcon'
import { Modal, ModalHeader, ModalTitle, ResultModalBody, ResultText } from '../../../common/components/Modal'
import { TokenValue } from '../../../common/components/typography'
import { Account } from '../../../common/types'

interface Props {
  onClose: () => void
  from: Account
  amount: BN
  to: Account
}

export const TransferFailureModal = ({ from, to, amount, onClose }: Props) => (
  <Modal modalSize="xs" modalHeight="s" onClose={onClose}>
    <ModalHeader title="" onClick={onClose} modalHeaderSize="s" />
    <ResultModalBody>
      <FailureIcon />
      <ModalTitle as="h4">
        <span className="red-title">Oh no!</span> Failure
      </ModalTitle>
      <ResultText>
        You haven’t transferred <TokenValue value={amount} /> stake from “{from.name}” account to “{to.name}”
        destination, because of a lorem ipsum dolor sit amet enim probem.
      </ResultText>
    </ResultModalBody>
  </Modal>
)
