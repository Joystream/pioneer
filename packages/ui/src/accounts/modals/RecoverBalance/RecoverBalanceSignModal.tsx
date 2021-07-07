import React, { useMemo } from 'react'
import { ActorRef } from 'xstate'

import { useMyTotalBalances } from '@/accounts/hooks/useMyTotalBalances'
import { ButtonPrimary } from '@/common/components/buttons'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TransactionModal } from '@/common/components/TransactionModal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

interface Props {
  onClose: () => void
  service: ActorRef<any>
}

export const RecoverBalanceSignModal = ({ onClose, service }: Props) => {
  const balances = useMyTotalBalances()
  const { api } = useApi()
  const amount = balances.recoverable
  const { active } = useMyMemberships()

  const transaction = useMemo(() => {
    if (!amount || !api || !active) {
      return
    }

    return api.tx.council.releaseCandidacyStake(active.id)
  }, [api, active?.id, JSON.stringify(balances)])

  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({
    transaction,
    signer: active?.controllerAccount || '',
    service,
  })

  return (
    <TransactionModal service={service} onClose={onClose} title="Recover balances">
      <ModalBody>
        <TextMedium>
          You intend to recover <TokenValue value={amount} /> stake locks from accounts.
        </TextMedium>
      </ModalBody>
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
