import BN from 'bn.js'
import React from 'react'
import { FailureIcon } from '../../components/icons/FailureIcon'
import { CloseSmallModalButton, Modal, ModalTitle, ResultModalBody, ResultText } from '../../components/Modal'
import { TokenValue } from '../../components/typography'
import { Account } from '../../common/types'

interface Props {
  onClose: () => void
  from: Account
  amount: BN
  to: Account
}

export const TransactionFailureModal = ({ from, to, amount, onClose }: Props) => (
  <Modal modalSize="xs" modalHeight="s">
    <ResultModalBody>
      <CloseSmallModalButton onClick={onClose} />
      <FailureIcon />
      <ModalTitle>
        <span className="red-title">Oh no!</span> Failure
      </ModalTitle>
      <ResultText size={2}>
        You haven’t transferred <TokenValue value={amount} /> stake from “{from.name}” account to “{to.name}”
        destination, because of a lorem ipsum dolor sit amet enim probem.
      </ResultText>
    </ResultModalBody>
  </Modal>
)
