import BN from 'bn.js'
import React from 'react'

import { Account } from '../../common/types'
import { FailureIcon } from '../../components/icons/FailureIcon'
import { Modal, ModalHeader, ModalTitle, ResultModalBody, ResultText } from '../../components/Modal'
import { TokenValue } from '../../components/typography'

interface Props {
  onClose: () => void
  from: Account
  amount: BN
  to: Account
}

export const TransactionFailureModal = ({ from, to, amount, onClose }: Props) => (
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
