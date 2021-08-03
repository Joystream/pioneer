import { SubmittableExtrinsic } from '@polkadot/api/types'
import React, { FC } from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { ModalBody, ModalFooter, Row, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { WorkerWithDetails } from '@/working-groups/types'

interface Props {
  onClose: () => void
  worker: WorkerWithDetails
  service: ActorRef<any>
  transaction: SubmittableExtrinsic<'rxjs'>
  title: string
  buttonLabel: string
}

export const ChangeAccountSignModal: FC<Props> = ({ onClose, worker, service, transaction, title, buttonLabel }) => {
  const { allAccounts } = useMyAccounts()
  const signer = accountOrNamed(allAccounts, worker.membership.controllerAccount, 'Controller account')
  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({
    transaction,
    signer: signer?.address ?? '',
    service,
  })

  return (
    <TransactionModal service={service} onClose={onClose}>
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
        <ButtonPrimary size="medium" onClick={sign} disabled={!signer || !isReady}>
          {buttonLabel}
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
