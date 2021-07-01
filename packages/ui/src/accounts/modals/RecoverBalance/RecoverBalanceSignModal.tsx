import BN from 'bn.js'
import React from 'react'
import { ActorRef } from 'xstate'

import { ButtonPrimary } from '@/common/components/buttons'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TransactionModal } from '@/common/components/TransactionModal'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'

interface Props {
  onClose: () => void
  service: ActorRef<any>
}

export const RecoverBalanceSignModal = ({ onClose, service }: Props) => {
  const amount = new BN(1000)
  const transaction = undefined
  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({ transaction, signer: 'signer', service })

  return (
    <TransactionModal service={service} onClose={onClose} title="Recover balances">
      <ModalBody>You intend to recover 5,080.000 JOY stake locks from accounts.</ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo title="Amount:" value={amount} />
          <TransactionInfo
            title="Transaction fee:"
            value={paymentInfo?.partialFee?.toBn()}
            tooltipText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={sign} disabled={!isReady}>
          Sign transaction and Transfer
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
