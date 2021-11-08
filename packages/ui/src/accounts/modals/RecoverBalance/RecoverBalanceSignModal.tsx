import { SubmittableExtrinsic } from '@polkadot/api/types'
import React from 'react'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { RecoverableLock } from '@/accounts/modals/RecoverBalance/index'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ButtonPrimary } from '@/common/components/buttons'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { Address } from '@/common/types'

interface Props {
  onClose: () => void
  service: ActorRef<any>
  transaction: SubmittableExtrinsic<'rxjs'>
  address: Address
  lock: RecoverableLock
}

export const RecoverBalanceSignModal = ({ onClose, service, transaction, address, lock }: Props) => {
  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({
    transaction,
    signer: address || '',
    service,
  })
  const { allAccounts } = useMyAccounts()
  const recoverAccount = accountOrNamed(allAccounts, address, 'Recover account')

  return (
    <TransactionModal service={service} onClose={onClose} title="Recover balances">
      <ModalBody>
        <TextMedium>
          You intend to recover <TokenValue value={lock.amount} /> stake lock from account.
        </TextMedium>
        <SelectedAccount account={recoverAccount} />
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
