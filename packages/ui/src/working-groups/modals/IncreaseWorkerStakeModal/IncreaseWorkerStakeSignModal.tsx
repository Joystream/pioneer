import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React from 'react'
import { ActorRef } from 'xstate'

import { ModalBody, ModalTransactionFooter } from '@/common/components/Modal'
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

export const IncreaseWorkerStakeSignModal = ({
  onClose,
  service,
  amount,
  transaction,
  worker,
  workerBalance,
}: Props) => {
  const { roleAccount, id } = worker
  const {
    paymentInfo: { partialFee } = {},
    sign,
    isReady,
  } = useSignAndSendTransaction({
    transaction,
    signer: roleAccount,
    service,
  })

  const signDisabled = !isReady || (partialFee && !workerBalance?.gte(partialFee.iadd(amount)))

  return (
    <TransactionModal onClose={onClose} service={service}>
      <ModalBody>
        <TextMedium>You intend to increase the stake of worker with ID: {id}</TextMedium>
        <TextMedium>
          Amount of increase: <TokenValue value={amount} />
        </TextMedium>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={partialFee?.toBn()}
        next={{ disabled: signDisabled, label: 'Sign transaction and Stake', onClick: sign }}
      >
        <TransactionInfo title="Stake:" value={amount} />
      </ModalTransactionFooter>
    </TransactionModal>
  )
}
