import { SubmittableExtrinsic } from '@polkadot/api/types'
import React from 'react'
import { ActorRef } from 'xstate'

import { AccountLockInfo, lockInfoLayout } from '@/accounts/components/AccountLockInfo'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { RecoverableLock } from '@/accounts/modals/RecoverBalance/index'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { EmptyListHeader, ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
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
  signer: Address
  lock: RecoverableLock
}

export const RecoverBalanceSignModal = ({ onClose, service, transaction, address, signer, lock }: Props) => {
  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({
    transaction,
    signer: signer,
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
        <RowGapBlock gap={8}>
          <ListHeaders $colLayout={lockInfoLayout}>
            <EmptyListHeader />
            <ListHeader>Unlocking</ListHeader>
            <ListHeader>Recoverable stake</ListHeader>
          </ListHeaders>
          <InputComponent inputSize="l" disabled>
            <AccountLockInfo account={recoverAccount} amount={lock.amount} lockType={'Voting'} />
          </InputComponent>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
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
