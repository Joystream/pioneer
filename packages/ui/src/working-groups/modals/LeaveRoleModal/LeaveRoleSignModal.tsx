import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React from 'react'

import { SelectedAccount } from '../../../accounts/components/SelectAccount'
import { useAccounts } from '../../../accounts/hooks/useAccounts'
import { ButtonPrimary } from '../../../common/components/buttons'
import { InputComponent } from '../../../common/components/forms'
import { ModalBody, ModalFooter, ModalHeader, Row, TransactionInfoContainer } from '../../../common/components/Modal'
import { TransactionInfo } from '../../../common/components/TransactionInfo'
import { TransactionModal } from '../../../common/components/TransactionModal'
import { TextMedium } from '../../../common/components/typography'
import { useSignAndSendTransaction } from '../../../common/hooks/useSignAndSendTransaction'
import { onTransactionDone } from '../../../common/types'
import { WorkerWithDetails } from '../../types'

interface Props {
  onClose: () => void
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
  worker: WorkerWithDetails
  onDone: onTransactionDone
}

export const LeaveRoleSignModal = ({ onClose, onDone, transaction, worker }: Props) => {
  const { allAccounts } = useAccounts()
  const signer = allAccounts.find((account) => account.address == worker.membership.controllerAccount)
  const { paymentInfo, send, status } = useSignAndSendTransaction({
    transaction,
    signer: signer?.address ?? '',
    onDone,
  })
  return (
    <TransactionModal status={status} onClose={onClose}>
      <ModalHeader onClick={onClose} title="Leaving a position?" />
      <ModalBody>
        <Row>
          <TextMedium>The transaction can only be signed with the membership's controller account.</TextMedium>
        </Row>
        <InputComponent label="From" inputSize="l" disabled={true}>
          {signer ? <SelectedAccount account={signer} /> : <TextMedium>Controller account not found.</TextMedium>}
        </InputComponent>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo title="Transaction fee:" value={paymentInfo?.partialFee.toBn()} />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={send} disabled={!signer}>
          Sign and leave role
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
