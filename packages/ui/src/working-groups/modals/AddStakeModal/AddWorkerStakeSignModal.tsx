import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React from 'react'
import { ActorRef } from 'xstate'

import { useBalance } from '@/accounts/hooks/useBalance'
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
}

export const AddWorkerStakeSignModal = ({ onClose, service, amount, transaction, worker }: Props) => {
  const { roleAccount, id } = worker
  const { paymentInfo: { partialFee } = {}, sign, isReady } = useSignAndSendTransaction({
    transaction,
    signer: roleAccount,
    service,
  })
  const balance = useBalance(roleAccount)

  const signDisabled = !isReady || (partialFee && !balance?.transferable.gte(partialFee))

  return (
    <TransactionModal onClose={onClose} service={service}>
      <ModalBody>
        <TextMedium>You intend to increase the stake of worker with ID: {id}</TextMedium>
        <TextMedium>
          Amount of increase: <TokenValue value={amount} />
        </TextMedium>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo title="Stake:" value={amount} />
          <TransactionInfo title="Transaction fee:" value={partialFee?.toBn()} />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" disabled={signDisabled} onClick={sign}>
          Sign transaction and Stake
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
