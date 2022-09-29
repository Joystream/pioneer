import { SubmittableExtrinsic } from '@polkadot/api/types'
import React, { FC } from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { InputComponent } from '@/common/components/forms'
import { ModalBody, ModalTransactionFooter, Row } from '@/common/components/Modal'
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
        <InputComponent label="From" inputSize="l" disabled borderless>
          <SelectedAccount account={signer} />
        </InputComponent>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={paymentInfo?.partialFee.toBn()}
        next={{ disabled: !signer || !isReady, label: buttonLabel, onClick: sign }}
      />
    </TransactionModal>
  )
}
