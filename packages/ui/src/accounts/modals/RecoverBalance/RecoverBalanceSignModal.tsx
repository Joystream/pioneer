import React, { useMemo } from 'react'
import { ActorRef } from 'xstate'

import { RecoverableLock } from '@/accounts/modals/RecoverBalance/index'
import { ButtonPrimary } from '@/common/components/buttons'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { Address } from '@/common/types'
import { Member } from '@/memberships/types'

interface Props {
  onClose: () => void
  service: ActorRef<any>
  memberId: Member['id']
  address: Address
  lock: RecoverableLock
}

export const RecoverBalanceSignModal = ({ onClose, service, memberId, address, lock }: Props) => {
  const { api, connectionState } = useApi()

  const transaction = useMemo(() => {
    if (!api) {
      return
    }

    return lock.type === 'Council Candidate'
      ? api.tx.council.releaseCandidacyStake(memberId)
      : api.tx.referendum.releaseVoteStake()
  }, [connectionState, memberId, lock.type])

  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({
    transaction,
    signer: address || '',
    service,
  })

  return (
    <TransactionModal service={service} onClose={onClose} title="Recover balances">
      <ModalBody>
        <TextMedium>
          You intend to recover <TokenValue value={lock.amount} /> stake locks from accounts.
        </TextMedium>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo title="Amount:" value={lock.amount} />
          <TransactionInfo
            title="Transaction fee:"
            value={paymentInfo?.partialFee?.toBn()}
            tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={sign} disabled={!isReady}>
          Sign transaction and Transfer
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
