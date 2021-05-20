import { SubmittableExtrinsic } from '@polkadot/api/types'
import React, { FC } from 'react'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useAccounts } from '@/accounts/hooks/useAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { ModalBody, ModalFooter, Row, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TransactionModal } from '@/common/components/TransactionModal'
import { TextMedium } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { onTransactionDone } from '@/common/types'
import { WorkerWithDetails } from '@/working-groups/types'

interface Props {
  onClose: () => void
  worker: WorkerWithDetails
  onDone: onTransactionDone
  transaction: SubmittableExtrinsic<'rxjs'>
  title: string
  buttonLabel: string
}

export const ChangeAccountSignModal: FC<Props> = ({ onClose, worker, onDone, transaction, title, buttonLabel }) => {
  const { allAccounts } = useAccounts()
  const signer = accountOrNamed(allAccounts, worker.membership.controllerAccount, 'Controller account')
  const { paymentInfo, send, status } = useSignAndSendTransaction({
    transaction,
    signer: signer?.address ?? '',
    onDone,
  })

  return (
    <TransactionModal status={status} onClose={onClose}>
      <ModalBody>
        <Row>
          <TextMedium>{title}</TextMedium>
        </Row>
        <InputComponent label="From" inputSize="l" disabled={true}>
          <SelectedAccount account={signer} />
        </InputComponent>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo title="Transaction fee:" value={paymentInfo?.partialFee.toBn()} />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={send} disabled={!signer}>
          {buttonLabel}
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
