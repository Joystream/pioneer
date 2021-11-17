import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React from 'react'
import { ActorRef } from 'xstate'

import { ButtonPrimary } from '@/common/components/buttons'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { WorkerWithDetails } from '@/working-groups/types'

interface Props {
  onClose: () => void
  service: ActorRef<any>
  amount: BN
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  worker: WorkerWithDetails
  workerBalance?: BN
}

export const MoveExcessTokensSignModal = ({ onClose, service, amount, transaction, worker, workerBalance }: Props) => {
  const { roleAccount, id } = worker
  const { paymentInfo: { partialFee } = {}, sign, isReady } = useSignAndSendTransaction({
    transaction,
    signer: roleAccount,
    service,
  })

  const signDisabled = !isReady || (partialFee && !workerBalance?.gte(partialFee.iadd(amount)))

  return (
    <TransactionModal onClose={onClose} service={service}>
      <ModalBody>
        <TextMedium>You intend to move excess tokens of worker with ID: {id}</TextMedium>
        <TextMedium>
          Amount: <TokenValue value={amount} />
        </TextMedium>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo title="Stake:" value={amount} />
          <TransactionInfo title="Transaction fee:" value={partialFee?.toBn()} />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" disabled={signDisabled} onClick={sign}>
          Sign transaction and Move Tokens
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
