import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { ModalBody, ModalFooter, Row, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TransactionModal } from '@/common/components/TransactionModal'
import { TextMedium } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'

import { Worker } from '../../types'

interface Props {
  onClose: () => void
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
  worker: Worker
  service: ActorRef<any>
}

export const LeaveRoleSignModal = ({ onClose, transaction, worker, service }: Props) => {
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
          <TextMedium>The transaction can only be signed with the membership's controller account.</TextMedium>
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
          Sign and leave role
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
